<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Share extends Model
{
    protected $table = 'share';
    protected $fillable = ['uuid_send','uuid_received','customer_id'];
    public $timestamps = true;

    public static function insertNewShare($uuid_send,$uuid_received,$customer_id){
        $isMyCustomer = Customer::where('id',$customer_id)->where('uuid',$uuid_send)->count();
        if (!$isMyCustomer) return false;
        $userSend = User::find($uuid_send)->first();
        $userReceive = User::find($uuid_received)->first();
        if (!$userReceive||!$userSend||$userSend->company_id!==$userReceive->company_id) return false;
        $share = Share::create([
           'uuid_send'=>$uuid_send,
           'uuid_received'=>$uuid_received,
           'customer_id'=>$customer_id
        ]);
        return $share->id;
    }
}
