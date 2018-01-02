<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;

class User extends Model
{
    use Notifiable;
    protected $table = 'user';
    protected $keyType = 'char';
    protected $primaryKey = 'uuid';
    protected $fillable = ['uuid', 'username', 'name','authority','password','salt','company_id'];
    public static function selectUserByUsername($username){
        return self::where('username',$username)
            ->join('company','user.company_id','=','company.id')->select('user.username','user.uuid','user.password','user.salt')->first();
    }
    public static function createNewUser($uuid, $username, $name, $authority, $password, $salt, $company_id, $myUuid)
    {
        $user = User::find($uuid);
        $user_me = User::find($myUuid);
        if ($user->company_id === $user_me->company_id && $user_me->authority == 1) {
            DB::beginTransaction();
            try {
                $user = self::create([
                    'uuid' => Uuid::uuid1()->getHex(),
                    'username' => $username,
                    'name' => $name,
                    'authority' => $authority,
                    'password' => $password,
                    'salt' => $salt,
                    'company_id' => $company_id,
                ]);
                DB::commit();
                return $user;
            } catch (\Exception $e) {
                DB::rollBack();
                return false;
            }
        }else{
            return false;
        }
    }
    public static function updateUser($uuid, $username, $name, $password, $authority, $myUuid)
    {
        $user = User::find($uuid);
        $user_me = User::find($myUuid);
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
