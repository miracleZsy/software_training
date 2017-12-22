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
            'sex' => (int)$sex,
            'type' => (int)$type,
            'uuid' => $uuid,
            'phase' => 1
        ]);
    }

    public static function updateCustomer($id, $name, $tel, $work, $remark, $email, $address, $origin, $QQ, $birthday, $sex, $uuid)
    {
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
            $customer->save();
            return true;
        } else return false;
    }

    public static function phaseFilter($uuid, $phase, $page)
    {
        $customer = Customer::where('uuid', $uuid);
        if ($phase) $customer = $customer->where('phase', $phase);
        $customer = $customer->select('id', 'name', 'created_at', 'tel', 'pic_url')->orderBy('created_at', 'desc');
        return [
            'count' => $customer->count(),
            'customer' => $customer->forPage($page, Config::get('sys_page_size'))->get()->toArray()
        ];

    }

    public static function typeFilter($uuid, $type, $page)
    {
        $customer = Customer::where('uuid', $uuid);
        if ($type) $customer = $customer->where('type', $type);
        $customer = $customer->select('id', 'name', 'created_at', 'tel', 'pic_url')->orderBy('created_at', 'desc');
        return [
            'count' => $customer->count(),
            'customer' => $customer->forPage($page, Config::get('sys_page_size'))->get()->toArray()
        ];
    }

    public static function timeFilter($uuid, $time, $page)
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
        $customer = self::where('uuid', $uuid)->whereBetween('created_at', [$start, $end])
            ->select('id', 'name', 'created_at', 'tel', 'pic_url')->orderBy('created_at', 'desc');
        return [
            'count' => $customer->count(),
            'customer' => $customer->forPage($page, Config::get('sys_page_size'))->get()->toArray()
        ];
    }
}
