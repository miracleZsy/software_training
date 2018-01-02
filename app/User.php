<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;

class User extends Model
{
    use Notifiable;
    use SoftDeletes;
    protected $table = 'user';
    protected $keyType = 'char';
    protected $primaryKey = 'uuid';
    protected $fillable = ['uuid', 'username', 'name','authority','password','salt','company_id'];
    public static function selectUserByUsername($username){
        return self::where('username',$username)
            ->join('company','user.company_id','=','company.id')->select('user.username','user.uuid','user.password','user.salt')->first();
    }
    public static function createNewUser($username, $name, $authority, $password,$myUuid)
    {
        $user_me = User::find($myUuid);
        $salt = Str::random(8);
        $password = md5(md5($password).$salt);
        if ($user_me->authority == 1) {
                $user = self::create([
                    'uuid' => Uuid::uuid1()->getHex(),
                    'username' => $username,
                    'name' => $name,
                    'authority' => $authority,
                    'password' => $password,
                    'salt' => $salt,
                    'company_id' => $user_me->company_id,
                ]);
                return $user;
            }
        else return false;

    }
    public static function updateUser($uuid, $username, $name, $password, $authority, $myUuid)
    {
        $user = User::find($uuid);
        $user_me = User::find($myUuid);
        $salt = $user->salt;
        $password = md5(md5($password).$salt);
        if ($user->company_id === $user_me->company_id && $user_me->authority == 1) {
            $user->username = $username;
            $user->name = $name;
            $user->password = $password;
            $user->authority = $authority;
            $user->save();
            return true;
        } else return false;
    }
}
