<?php

namespace App;

use App\sys\Config;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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
                $start = Carbon::create()->subDay();
                break;
            case 2:
                $start = Carbon::create()->subDays(2);
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
        return $customer->orderBy('created_at','desc');
    }
}
