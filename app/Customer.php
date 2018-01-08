<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use \Exception;
/**
 * Class CustomerController
 * @package App\Http\Controllers
 * @auther zhouqianyu
 */
class Customer extends Model
{
    use SoftDeletes;
    protected $table = 'customer';
    protected $fillable = ['name', 'tel', 'work', 'remark', 'pic_url', 'email', 'address', 'origin', 'QQ', 'birthday', 'sex', 'type', 'uuid', 'phase'];

    public function user()
    {
        return $this->belongsTo('App\User', 'uuid', 'uuid');
    }
    public function salePlans(){
        return $this->belongsToMany('App\SalePlan','user_sale_plan','customer_id','sale_plan_id');
    }


    public static function createNewCustomer($name, $tel, $work, $remark, $email, $address, $origin, $QQ, $birthday, $sex, $type, $uuid)
    {
        if ($sex === '男') $sex = 1;
        else $sex = 2;
        switch ($type) {
            case '一般客户':
                $type = 1;
                break;
            case '意向客户':
                $type = 2;
                break;
            case '已成交客户':
                $type = 3;
                break;
            default:
                $type = 1;
        }
        DB::beginTransaction();
        try {
            $customer = self::create([
                'name' => $name,
                'tel' => $tel,
                'work' => $work,
                'remark' => $remark,
                'email' => $email,
                'address' => $address,
                'origin' => $origin,
                'QQ' => $QQ,
                'birthday' => $birthday,
                'sex' => $sex,
                'type' => $type,
                'uuid' => $uuid,
                'phase' => 1
            ]);
            CustomerPhaseLog::create([
                'uuid' => $uuid,
                'customer_id' => $customer->id,
                'phase' => 1
            ]);
            DB::commit();
            return $customer;
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }
    }

    public static function updateCustomer($id, $name, $tel, $work, $type, $remark, $email, $address, $origin, $QQ, $birthday, $sex, $uuid)
    {
        if ($sex === '男') $sex = 1;
        else $sex = 2;
        switch ($type) {
            case '一般客户':
                $type = 1;
                break;
            case '意向客户':
                $type = 2;
                break;
            case '已成交客户':
                $type = 3;
                break;
            default:
                $type = 1;
        }
        $customer = Customer::find($id);
        if ($customer->uuid !== $uuid) {
            $user = User::find($uuid);
            $userBelong = User::find($customer->uuid);
            if ($user->company_id !== $userBelong->company_id || $user->authority > 2) return false;
        }
        $customer->name = $name;
        $customer->tel = $tel;
        $customer->work = $work;
        $customer->remark = $remark;
        $customer->email = $email;
        $customer->address = $address;
        $customer->origin = $origin;
        $customer->QQ = $QQ;
        $customer->birthday = $birthday;
        $customer->sex = $sex;
        $customer->type = $type;
        $customer->save();
        return true;
    }

    public static function filter($type, $phase, $time, $uuid, $uid)
    {
        $start = 0;
        $end = Carbon::now();
        $user = User::find($uuid);
        switch ($time) {
            case 1:
                $start = Carbon::create()->toDateString();
                break;
            case 2:
                $start = Carbon::create()->subDay()->toDateString();
                break;
            case 3:
                $start = Carbon::create()->subWeek();
                break;
            case 4:
                $start = Carbon::create()->subMonth();
        }
        if ($user->authority > 2) $customer= self::where('uuid', $uuid);
        else if ($user->authority <= 2 && $uid) $customer = self::where('uuid',$uid);
        if ($phase) $customer = $customer->where('phase', $phase);
        if ($type) $customer = $customer->where('type', $type);
        $customer = $customer->whereBetween('created_at', [$start, $end]);
        return $customer->orderBy('created_at', 'desc');
    }

    public static function amountCount($uuid)
    {
        $count = self::select('type', DB::raw('count(*) as count'))->where('uuid', $uuid)->groupBy('type')->get()->toArray();
        $amount = array_sum(array_column($count, 'count'));
        $amount = ['amount' => $amount];
        $count = array_column($count, 'count', 'type');
        return $amount + $count;
    }


    public static function customerManage($uuid,$time)
    {
        $end = Carbon::now()->addDay();
        switch ($time){
            case 2:$start = Carbon::now()->subWeek()->addDay();break;
            case 3:$start = Carbon::now()->subMonth()->addDay();break;
            default:$start = Carbon::now()->subDay();
        }
        $newCountArr = self::where('uuid', $uuid)->whereBetween('created_at', [$start->toDateString(), $end->toDateString()])->withTrashed()
            ->select(DB::raw("count(*) as new_count,date_format(created_at,'%Y-%m-%d') as date"))
            ->groupBy(DB::raw("date_format(created_at,'%Y-%m-%d')"))->get()->toArray();
        $deleteCountArr = self::where('uuid', $uuid)->whereBetween('deleted_at', [$start->toDateString(), $end->toDateString()])->withTrashed()
            ->select(DB::raw("count(*) as delete_count,date_format(deleted_at,'%Y-%m-%d') as date"))
            ->groupBy(DB::raw("date_format(deleted_at,'%Y-%m-%d')"))->get()->toArray();
        $newCountArr = array_column($newCountArr, 'new_count', 'date');
        $deleteCountArr = array_column($deleteCountArr, 'delete_count', 'date');
        $amount = self::withTrashed()->where('uuid',$uuid)->where('created_at', '<', $start->toDateString())->where(function ($query) use ($start, $end) {
            $query->where('deleted_at', '>', $start->toDateString())->orWhere('deleted_at', NULL);
        })->count();
        $countArr = [];
        while ($start->lte($end)) {
            $newCount = key_exists($start->toDateString(), $newCountArr) ? $newCountArr[$start->toDateString()] : 0;
            $deleteCount = key_exists($start->toDateString(), $deleteCountArr) ? $deleteCountArr[$start->toDateString()] : 0;
            $amount = $amount + $newCount - $deleteCount;
            $countArr[] = [
                'time'=>$start->toDateString(),
                'increase' => $newCount,
                'decrease' => $deleteCount,
                'netIncrease' => $newCount - $deleteCount,
                'amount' => $amount
            ];
            $start->addDay();
        }
        return $countArr;
    }

    public static function phaseChange($id, $uuid, $phase)
    {
        DB::beginTransaction();
        try {
            $customer = self::find($id);
            if ($customer->uuid !== $uuid) {
                $user = User::find($uuid);
                $userBelong = User::find($customer->uuid);
                if ($user->company_id !== $userBelong->company_id || $user->authority > 2) throw new Exception('customer not exist');
            }
                $customer->phase = $phase;
                $customer->save();
            CustomerPhaseLog::create([
                'uuid' => $uuid,
                'customer_id' => $id,
                'phase' => $phase
            ]);
            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollback();
            return false;
        }
    }
    public static function selectOne($id,$uuid){
        $customer = self::find($id);
        if ($customer->uuid !== $uuid) {
            $user = User::find($uuid);
            $userBelong = User::find($customer->uuid);
            if ($user->company_id !== $userBelong->company_id || $user->authority > 2) return false;
        }
        $username = $customer->user->name;
        $customer->followName = $username;
        unset($customer->user);
        $customer->sex = ($customer->sex === 1) ? '男' : '女';
        switch ($customer->type) {
            case 1:
                $customer->type = '一般客户';
                break;
            case 2:
                $customer->type = '意向客户';
                break;
            case 3:
                $customer->type = '已成交客户';
        }
        return $customer;
    }
    public static function deleteOne($id,$uuid){
        $customer = Customer::find($id);
        if ($customer->uuid !== $uuid) {
            $user = User::find($uuid);
            $userBelong = User::find($customer->uuid);
            if ($user->company_id !== $userBelong->company_id || $user->authority > 2) return false;
        }
        if ($customer->delete()) return true;
        else return false;

    }
}
