<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use SoftDeletes;
    protected $table = 'customer';
    protected $fillable = ['name', 'tel', 'work', 'remark', 'pic_url', 'email', 'address', 'origin', 'QQ', 'birthday', 'sex', 'type', 'uuid'];

    public static function createNewCustomer($name, $tel, $work, $remark,$email, $address, $origin, $QQ, $birthday, $sex, $type, $uuid)
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
            'phase'=>1
        ]);
    }
    public static function updateCustomer($id,$name, $tel, $work, $remark,$email, $address, $origin, $QQ, $birthday, $sex,$uuid){
        $customer = Customer::find($id);
        if ($customer->uuid === $uuid){
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
        }else return false;
    }
}
