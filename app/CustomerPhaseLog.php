<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomerPhaseLog extends Model
{
    protected $table = 'customer_phase_log';
    protected $fillable = ['uuid','customer_id','phase'];
    public static function getPhaseLog($customerId,$uuid){
        return self::where('customer_id',$customerId)
            ->where('customer_phase_log.uuid',$uuid)->join('user','customer_phase_log.uuid','=','user.uuid')->select('customer_phase_log.phase','customer_phase_log.created_at','user.name as tagName')
            ->get()->toArray();
    }
}
