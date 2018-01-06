<?php
/**
 * Created by PhpStorm.
 * User: yanqiqi
 * Date: 2017/12/26
 * Time: 15:02
 */

namespace App\Http\Controllers;
use App\User;
use App\sys\Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Ramsey\Uuid\Uuid;
use Webmozart\Assert\Assert;


class UserController extends Controller
{
    public function list(Request $request)
    {
        try {
            $page = (int)$_POST['page'] > 0 ? (int)$_POST['page'] : 1;
            $size = Config::get('sys_page_size');
            $uuid = $request->get('user')->uuid;
            $user = User::find($uuid);
            $users = User::where('company_id',$user->company_id);

            $this->json_die([
                'code' => 200,
                'msg' => 'success',
                'data' => [
                    'count' => $users->count(),
                    'user' => $users->forPage($page, $size)->get()->toArray()]
            ]);
        } catch (\InvalidArgumentException $e) {
            $this->json_die(['code' => 407, 'msg' => $e->getMessage()]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $this->json_die(['code' => 500, 'msg' => $e->getMessage()]);

        }
    }
    public function insert(Request $request)
    {
        try {
            Assert::notEmpty($_POST['username'], 'username can not be empty');
            Assert::notEmpty($_POST['password'], 'password can not be empty');
            Assert::notEmpty($_POST['authority'], 'authority can not be empty');
            $username = $_POST['username'];
            $password = $_POST['password'];
            $authority = $_POST['authority'];
            $name = isset($_POST['name']) ? $_POST['name'] : '';
            $user = User::createNewUser($username, $name, $authority, $password, $request->get('user')->uuid);
            if ($user) $this->json_die(['code' => 200, 'msg' => 'success', 'data' => $user->uuid]);
            else $this->json_die(['code'=>403,'msg' => 'no authority']);
        } catch (\InvalidArgumentException $e) {
            $this->json_die(['code' => 407, 'msg' => $e->getMessage()]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $this->json_die(['code' => 500, 'msg' => $e->getMessage()]);
        }
    }
    public function update(Request $request)
    {
        try {
            Assert::notEmpty($_POST['uuid'], 'uuid can not be empty');
            Assert::notEmpty($_POST['username'], 'username can not be empty');
            Assert::notEmpty($_POST['password'], 'password can not be empty');
            Assert::notEmpty($_POST['authority'], 'authority can not be empty');
            $uuid = $_POST['uuid'];
            $username = $_POST['username'];
            $password = $_POST['password'];
            $authority = $_POST['authority'];
            $name = isset($_POST['name']) ? $_POST['name'] : '';
            if (User::updateUser($uuid, $username, $name, $password,$authority,$request->get('user')->uuid))
                $this->json_die(['code' => 200, 'msg' => 'success']);
            else $this->json_die(['code' => 403, 'msg' => 'unauthorized']);
        } catch (\InvalidArgumentException $e) {
            $this->json_die(['code' => 407, 'msg' => $e->getMessage()]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $this->json_die(['code' => 500, 'msg' => 'unknown error']);
        }
    }

    public function delete(Request $request)
    {
        try {
            Assert::notEmpty($_POST['uuid'], 'uuid can not be empty');
            $uuid = $_POST['uuid'];
            $user = User::find($uuid);
            $user_me = User::find($request->get('user')->uuid);
            if ($user && $user->company_id === $user_me->company_id && $user_me->authority == 1) {
                $user->delete();
                $this->json_die(['code' => 200, 'msg' => 'success']);
            } else $this->json_die(['code' => 403, 'msg' => 'user not exist or it is not self']);
        } catch (\InvalidArgumentException $e) {
            $this->json_die(['code' => 407, 'msg' => $e->getMessage()]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $this->json_die(['code' => 500, 'msg' => 'unknown error']);
        }
    }

    public function select(Request $request)
    {
        try {
            Assert::notEmpty($_POST['uuid'], 'uuid can not be empty');
            $uuid = $_POST['uuid'];
            $user = User::find($uuid);
            $user_me = User::find($request->get('user')->uuid);
            if ($user && $user->company_id === $user_me->company_id && $user_me->authority == 1) $this->json_die(['code' => 200, 'msg' => 'success', 'data' => $user]);
            else $this->json_die(['code' => 403, 'msg' => 'user not found']);
        } catch (\InvalidArgumentException $e) {
            $this->json_die(['code' => 407, 'msg' => $e->getMessage()]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $this->json_die(['code' => 500, 'msg' => 'unknown error']);
        }
    }
    public function hint(Request $request){
        $hint = $_POST['hint'];
        $customers = User::where('company_id', $request->get('user')->company_id)
            ->where('name', 'like', $hint . '%')->select('uuid', 'name')->get()->toArray();
        $this->json_die([
            'code' => 200,
            'msg' => 'success',
            'data' => $customers
        ]);
    }
}