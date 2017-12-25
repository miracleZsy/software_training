<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class SalePlan extends Model
{
    protected $table = 'sale_plan';
    protected $fillable = ['title', 'content', 'uuid'];
    public $timestamps = true;

    public function customers()
    {
        return $this->belongsToMany('App\Customer', 'user_sale_plan', 'sale_plan_id', 'customer_id');
    }

    public static function getSalePlans($uuid)
    {
        return self::where('uuid', $uuid)->with(['customers' => function ($query) {
            $query->select('name');
        }])->select('id', 'title', 'created_at');

    }

    public static function saleList($uuid)
    {
        $salePlans = self::getSalePlans($uuid)->get()->toArray();
        foreach ($salePlans as $k => $v) {
            $salePlans[$k]['customers'] = array_column($v['customers'], 'name');
        }
        return $salePlans;
    }

    public static function selectDetail($uuid, $id)
    {
        $salePlan = self::getSalePlans($uuid)->select('id', 'title', 'created_at', 'content')->where('id', $id)->first()->toArray();
        $salePlan['customers'] = array_column($salePlan['customers'], 'name');
        return $salePlan;
    }

    public static function insertNew($title, $content, $customerIds, $uuid)
    {
        DB::beginTransaction();
        try {
            $salePlan = self::create([
                'title' => $title,
                'content' => $content,
                'uuid' => $uuid
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
    public static function updatePlan($id,$title,$content,$customerIds,$uuid){
        $salePlan = self::find($id);
        if (!$salePlan||$salePlan->uuid !== $uuid) return false;
        $customerIds = json_decode($customerIds, true);
        DB::beginTransaction();
        try{
            $salePlan->title = $title;
            $salePlan->content = $content;
            $salePlan->save();
            $salePlan->customers()->sync($customerIds);
            DB::commit();
            return true;
        }catch (\Exception $e){
            DB::rollBack();
            return false;
        }
    }
    public static function deleteOne($id,$uuid){
        $salePlan = self::find($id);
        if (!$salePlan||$salePlan->uuid !== $uuid) return false;
        try{
            $salePlan->detach();
            $salePlan->delete();
            DB::commit();
            return true;
        }catch (\Exception $e){
            DB::rollBack();
            return false;
        }
    }
}
