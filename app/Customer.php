<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Customer extends Model
{
    use SoftDeletes;
    protected $table = 'customer';
    protected $fillable = ['name', 'tel', 'work', 'remark', 'pic_url', 'email', 'address', 'origin', 'QQ', 'birthday', 'sex', 'type', 'uuid', 'phase'];

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
        }
        return $customer = self::create([
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
        }
        $customer = Customer::find($id);
        if ($customer->uuid === $uuid) {
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
        } else return false;
    }

    public static function filter($type, $phase, $time, $uuid)
    {
        $start = 0;
        $end = Carbon::now();
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
        $customer = self::where('uuid', $uuid);
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

    public static function customerManage($uuid,$start,$end)
    {
        $start = Carbon::createFromFormat('Y-m-d',$start);
        $end = Carbon::createFromFormat('Y-m-d',$end);
        $newCountArr =  self::where('uuid',$uuid)->whereBetween('created_at',[$start->copy()->toDateString(),$end->copy()->toDateString()])->withTrashed()
            ->select(DB::raw("count(*) as new_count,date_format(created_at,'%Y-%m-%d') as date"))
            ->groupBy(DB::raw("date_format(created_at,'%Y-%m-%d')"))->get()->toArray();
        $deleteCountArr = self::where('uuid',$uuid)->whereBetween('deleted_at',[$start->copy()->toDateString(),$end->copy()->toDateString()])->withTrashed()
            ->select(DB::raw("count(*) as delete_count,date_format(deleted_at,'%Y-%m-%d') as date"))
            ->groupBy(DB::raw("date_format(deleted_at,'%Y-%m-%d')"))->get()->toArray();
        $newCountArr = array_column($newCountArr,'new_count','date');
        $deleteCountArr = array_column($deleteCountArr,'delete_count','date');
        $amount = self::withTrashed()->where('created_at','<',$start->copy()->toDateString())->where(function ($query) use ($start,$end){
            $query->where('deleted_at','>',$start->copy()->toDateString())->orWhere('deleted_at',NULL);
        })->count();
        $countArr = [];
        while ($start->lte($end)){
            $newCount = key_exists($start->toDateString(),$newCountArr)?$newCountArr[$start->toDateString()]:0;
            $deleteCount = key_exists($start->toDateString(),$deleteCountArr)?$deleteCountArr[$start->toDateString()]:0;
            $amount = $amount+$newCount-$deleteCount;
            $countArr[$start->toDateString()] =[
                'increase'=>$newCount,
                'decrease'=>$deleteCount,
                'netIncrease'=>$newCount-$deleteCount,
                'amount'=> $amount
            ];
            $start->addDay();
        }
        return $countArr;
    }
}
