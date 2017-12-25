<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use \Exception;

class Customer extends Model
{
    use SoftDeletes;
    protected $table = 'customer';
    protected $fillable = ['name', 'tel', 'work', 'remark', 'pic_url', 'email', 'address', 'origin', 'QQ', 'birthday', 'sex', 'type', 'uuid', 'phase'];
    public function user(){
        return $this->belongsTo('App\User','uuid','uuid');
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

    public static function phaseChange($id, $uuid, $phase)
    {
        DB::beginTransaction();
        try {
            $customer = self::find($id);
            if ($customer && $customer->uuid === $uuid) {
                $customer->phase = $phase;
                $customer->save();
            } else throw new Exception('customer not exist');
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
}
