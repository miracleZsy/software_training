<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Share extends Model
{
    protected $table = 'share';
    protected $fillable = ['uuid_send','uuid_received','customer_id'];
    public $timestamps = true;

    public function insertNewShare($uuid_send,$uuid_received,$customer_id){
        $userSend = User::find($uuid_send)->first();
        $userReceive = User::find($uuid_received)->first();
        $isMyCustomer =
        if ($userSend->company_id == $userReceive->company_id){

        }
    }
}
