<?php

namespace App;

use App\sys\Config;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
/**
 * Class CustomerController
 * @package App\Http\Controllers
 * @auther zhouqianyu
 */
class SalePlan extends Model
{
    use SoftDeletes;
    protected $table = 'sale_plan';
    protected $fillable = ['title', 'content', 'uuid', 'act_time'];
    public $timestamps = true;

    public function customers()
    {
        return $this->belongsToMany('App\Customer', 'user_sale_plan', 'sale_plan_id', 'customer_id');
    }

    public static function getSalePlans($uuid)
    {
        return self::where('uuid', $uuid)->with(['customers' => function ($query) {
            $query->select('customer.id','name');
        }])->select('sale_plan.id', 'title', 'created_at', 'act_time');

    }

    public static function saleList($uuid,$time,$page)
    {
        $start = 0;
        $end = Carbon::now();
        switch ($time) {
            case 1:
                $start = Carbon::create()->subDay()->toDateString();
                break;
            case 2:
                $start = Carbon::create()->subWeek()->addDay()->toDateString();
                break;
            case 3:
                $start = Carbon::create()->subMonth()->addDay()->toDateString();
                break;
            default:break;
        }
        $size = Config::get('sys_page_size');
        $salePlans = self::getSalePlans($uuid)->whereBetween('created_at',[$start,$end])->orderBy('created_at','desc');
        $count = $salePlans->count();
        foreach ($salePlans as $k => $v) {
            $salePlans[$k]['customers'] = array_column($v['customers'], 'name');
        }
        return [
            'count'=>$count,
            'data' =>$salePlans->forPage($page,$size)->get()->toArray()
            ];

    }

    public static function selectDetail($uuid, $id)
    {
        $salePlan = self::getSalePlans($uuid)->select('id', 'title', 'created_at', 'content', 'act_time')->where('id', $id)->first()->toArray();
        return $salePlan;
    }

    public static function insertNew($title, $content, $customerIds, $uuid, $actTime)
    {
        $actTime = Carbon::createFromFormat('Y-m-d', $actTime)->toDateString();
        DB::beginTransaction();
        try {
            $salePlan = self::create([
                'title' => $title,
                'content' => $content,
                'uuid' => $uuid,
                'act_time' => $actTime
            ]);
            $customerIds = json_decode($customerIds, true);
            $salePlan->customers()->attach($customerIds);
            DB::commit();
            return $salePlan;
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }

    }

    public static function updatePlan($id, $title, $content, $customerIds, $uuid, $actTime)
    {
        $salePlan = self::find($id);
        $actTime = Carbon::createFromFormat('Y-m-d', $actTime)->toDateString();
        if (!$salePlan || $salePlan->uuid !== $uuid) return false;
        $customerIds = json_decode($customerIds, true);
        DB::beginTransaction();
        try {
            $salePlan->title = $title;
            $salePlan->content = $content;
            $salePlan->act_time = $actTime;
            $salePlan->save();
            $salePlan->customers()->sync($customerIds);
            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }
    }

    public static function deleteOne($id, $uuid)
    {
        $salePlan = self::find($id);
        if (!$salePlan || $salePlan->uuid !== $uuid) return false;
        try {
            $salePlan->customers()->detach();
            $salePlan->delete();
            DB::commit();
            return true;
        } catch (\Exception $e) {
            print_r($e->getMessage());
            DB::rollBack();
            return false;
        }
    }
}
