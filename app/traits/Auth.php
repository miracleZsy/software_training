<?php
/**
 * Created by PhpStorm.
 * User: zhouqianyu
 * Date: 2017/12/19
 * Time: 下午6:30
 */
namespace App\traits;
use App\sys\Config;
use Illuminate\Support\Str;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\ValidationData;
use Lcobucci\JWT\Signer\Hmac\Sha512;
class Auth
{
    public static function create(){
        return new self();
    }
    public function buildToken($clams, $expire = 60)
    {
        $singer = new Sha512();
        $token = new \Lcobucci\JWT\Builder();
        $token->setIssuer(Config::get('web_host_name'))
            ->setId(Str::random(32), true)
            ->setIssuedAt(time())
            ->setExpiration(time() + $expire);
        foreach ($clams as $k => $v) {
            $token->set($k, $v);
        }
        return $token->sign($singer, Config::get('jwt_key'))->getToken();
    }

    public function paresToken($token)
    {
        if (empty($token)) return false;
        try {
            return (new Parser())->parse($token);
        } catch (\Exception $e) {
            return false;
        }
    }
    public function verify(){
        $data = new ValidationData();
        $singer = new Sha512();
        if (!isset($_COOKIE['token'])) return false;
        $token = $this->paresToken($_COOKIE['token']);
        if (!empty($token)&&$token->validate($data)&&$token->verify($singer,Config::get('jwt_key'))){
            return $token;
        }
        else return false;
    }
}