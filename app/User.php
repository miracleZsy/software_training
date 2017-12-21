<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class User extends Model
{
    use Notifiable;
    protected $table = 'user';
    protected $fillable = ['uuid', 'username', 'name','authority','password','salt','pic_url','company_id'];
    public static function selectUserByUsername($username){
        return self::where('username',$username)
            ->join('company','user.company_id','=','company.id')->first();
    }
}
