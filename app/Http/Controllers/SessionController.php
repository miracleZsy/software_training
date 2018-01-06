<?php

namespace App\Http\Controllers;

use App\User;
use Gregwar\Captcha\CaptchaBuilder;
use Illuminate\Support\Facades\Log;
use Webmozart\Assert\Assert;
use App\traits\Auth;

/**
 * Class SessionController
 * @package App\Http\Controllers
 * @author zhouqianyu
 */
class SessionController extends Controller
{
    public function login()
    {
        try {
            Assert::notEmpty($_POST['username'], 'username can not be null');
            Assert::notEmpty($_POST['password'], 'password can not be null');
            Assert::notEmpty($_POST['code'], 'code can not be null');
            $username = $_POST['username'];
            $password = $_POST['password'];
            $code = $_POST['code'];
            session_start();
            $captcha = isset($_SESSION['captcha']) ? $_SESSION['captcha'] : '';
            if (!empty($captcha) && $captcha['expired_at'] < time() || $code !== $captcha['code']) $this->json_die(['code' => 409, 'msg' => 'captcha error or expire']);
            $user = User::selectUserByUsername($username);
            if (!empty($user) && md5(md5($password) . $user->salt) === $user->password) {
                unset($_SESSION['captcha']);
                $token = Auth::create()->buildToken([
                    'username' => $user->username,
                    'uuid' => $user->uuid,
                    'authority'=>$user->authority,
                    'companyId' =>$user->company_id,
                    'companyName'=>$user->company_name
                ]);
                setcookie('token', (String)$token, time() + 3600, '/');
                $this->json_die(['code' => 200, 'msg' => 'success']);
            } else $this->json_die(['code' => 403, 'msg' => 'password or username error']);
        } catch (\InvalidArgumentException $e) {
            $this->json_die(['code' => 407, 'msg' => $e->getMessage()]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $this->json_die(['code' => 500, 'msg' => 'unknown error']);
        }
    }

    public function captcha()
    {
        $captcha = new CaptchaBuilder();
        $captcha->setIgnoreAllEffects(true)->build();
        session_start();
        unset($_SESSION['captcha']);
        $_SESSION['captcha']['code'] = $captcha->getPhrase();
        $_SESSION['captcha']['expired_at'] = time() + 60;
        header('Content-type: image/jpeg');
        $captcha->output();
    }
}
