<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomerPhaseLog extends Model
{
    protected $table = 'customer_phase_log';
    protected $fillable = ['uuid','customer_id','phase'];
    public static function getPhaseLog($customerId,$uuid){
        return self::where('customer_id',$customerId)
            ->where('uuid',$uuid)->select('phase','created_at')
            ->get()->toArray();
    }
}
