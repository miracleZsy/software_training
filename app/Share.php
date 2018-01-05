<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Share extends Model
{
    protected $table = 'share';
    protected $fillable = ['uuid_send', 'uuid_received', 'customer_id'];
    public $timestamps = true;

    public static function insertNewShare($uuid_send, $uuid_received, $customer_id)
    {
        $isMyCustomer = Customer::where('id', $customer_id)->where('uuid', $uuid_send)->count();
        if (!$isMyCustomer) return false;
        $userSend = User::find($uuid_send)->first();
        $userReceive = User::find($uuid_received)->first();
        if (!$userReceive || !$userSend || $userSend->company_id !== $userReceive->company_id) return false;
        if (self::where('uuid_send', $uuid_send)->where('uuid_received', $uuid_received)->where('customer_id',$customer_id)->count()>0)
            return false;
            $share = self::create([
                'uuid_send' => $uuid_send,
                'uuid_received' => $uuid_received,
                'customer_id' => $customer_id
            ]);
        return $share->id;
    }

    public static function filter($time)
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
        return self::whereBetween('share.created_at', [$start, $end])->orderBy('share.created_at', 'desc');
    }
}
