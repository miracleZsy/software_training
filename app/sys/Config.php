<?php

namespace App\sys;

use Illuminate\Database\Eloquent\Model;

class Config extends Model
{
    protected $table = 'env_config';
    public $timestamps = false;
    public static function get($key){
        $value = self::where('name',$key)->pluck('value')->toArray()[0];
        return $value;
    }
}
