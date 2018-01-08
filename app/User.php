<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;
/**
 * Class CustomerController
 * @package App\Http\Controllers
 * @auther yanqiqi
 */
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
            ->join('company','user.company_id','=','company.id')
            ->select('user.username','user.uuid','user.password','user.salt','user.company_id','user.authority','company.name as company_name')->first();
    }
    public static function createNewUser($username, $name, $authority, $password,$myUuid)
    {
        $user_me = User::find($myUuid);
        $salt = Str::random(8);
        $password = md5(md5($password).$salt);
        if ($user_me->authority == 1) {
            $uuid = Uuid::uuid1()->getHex();
                self::create([
                    'uuid' => $uuid,
                    'username' => $username,
                    'name' => $name,
                    'authority' => $authority,
                    'password' => $password,
                    'salt' => $salt,
                    'company_id' => $user_me->company_id,
                ]);
                return $uuid;
            }
        else return false;

    }
    public static function updateUser($uuid, $username, $name,$authority, $myUuid)
    {
        $user = User::find($uuid);
        $user_me = User::find($myUuid);
        if ($user->company_id === $user_me->company_id && $user_me->authority == 1) {
            $user->username = $username;
            $user->name = $name;
            $user->authority = $authority;
            $user->save();
            return true;
        } else return false;
    }
}
