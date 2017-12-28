<?php

namespace App\Http\Controllers;

use App\Customer;
use App\CustomerPhaseLog;
use App\sys\Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Webmozart\Assert\Assert;

/**
 * Class CustomerController
 * @package App\Http\Controllers
 * @auther zhouqianyu
 */
class CustomerController extends Controller
{
    public function list(Request $request)
    {
        try {
            Assert::integer((int)$_POST['type'], 'type should be int');
            Assert::integer((int)$_POST['phase'], 'phase should be int');
            Assert::integer((int)$_POST['time'], 'time should be int');
            $type = $_POST['type'];
            $phase = $_POST['phase'];
            $time = $_POST['time'];
            $page = (int)$_POST['page'] > 0 ? (int)$_POST['page'] : 1;
            $size = Config::get('sys_page_size');
            $customers = Customer::filter($type, $phase, $time, $request->get('user')->uuid);
            $this->json_die([
                'code' => 200,
                'msg' => 'success',
                'data' => [
                    'count' => $customers->count(),
                    'customer' => $customers->forPage($page, $size)->get()->toArray()
                ]
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
            Assert::notEmpty($_POST['sex'], 'sex can not be empty');
            Assert::notEmpty($_POST['birthday'], 'birthday can not be empty');
            Assert::notEmpty($_POST['name'], 'name can not be empty');
            Assert::notEmpty($_POST['tel'], 'tel can not be empty');
            Assert::notEmpty($_POST['type'], 'type can not be empty');
            $sex = $_POST['sex'];
            $birthday = $_POST['birthday'];
            $name = $_POST['name'];
            $tel = $_POST['tel'];
            $type = $_POST['type'];
            $work = isset($_POST['work']) ? $_POST['work'] : '';
            $remark = isset($_POST['remark']) ? $_POST['remark'] : '';
            $email = isset($_POST['email']) ? $_POST['email'] : '';
            $address = isset($_POST['address']) ? $_POST['address'] : '';
            $origin = isset($_POST['origin']) ? $_POST['origin'] : '';
            $QQ = isset($_POST['QQ']) ? $_POST['QQ'] : '';
            $uuid = $request->get('user')->uuid;
            $customer = Customer::createNewCustomer($name, $tel, $work, $remark, $email, $address, $origin, $QQ, $birthday, $sex, $type, $uuid);
            $this->json_die(['code' => 200, 'msg' => 'success', 'data' => $customer->id]);
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
            Assert::notEmpty($_POST['id'], 'id can not be empty');
            Assert::integer((int)$_POST['id'], 'id can should be int');
            Assert::notEmpty($_POST['sex'], 'sex can not be empty');
            Assert::notEmpty($_POST['birthday'], 'birthday can not be empty');
            Assert::notEmpty($_POST['name'], 'name can not be empty');
            Assert::notEmpty($_POST['tel'], 'tel can not be empty');
            Assert::notEmpty($_POST['type'], 'type can not be empty');
            $id = $_POST['id'];
            $sex = $_POST['sex'];
            $birthday = $_POST['birthday'];
            $name = $_POST['name'];
            $tel = $_POST['tel'];
            $type = $_POST['type'];
            $work = isset($_POST['work']) ? $_POST['work'] : '';
            $remark = isset($_POST['remark']) ? $_POST['remark'] : '';
            $email = isset($_POST['email']) ? $_POST['email'] : '';
            $address = isset($_POST['address']) ? $_POST['address'] : '';
            $origin = isset($_POST['origin']) ? $_POST['origin'] : '';
            $QQ = isset($_POST['QQ']) ? $_POST['QQ'] : '';
            if (Customer::updateCustomer($id, $name, $tel, $work, $type, $remark, $email, $address, $origin, $QQ, $birthday, $sex, $request->get('user')->uuid))
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
            Assert::notEmpty($_POST['id'], 'id can not be empty');
            Assert::integer((int)$_POST['id'], 'id can should be int');
            $id = $_POST['id'];
            $customer = Customer::find($id);
            if ($customer && $request->get('user')->uuid === $customer->uuid) {
                $customer->delete();
                $this->json_die(['code' => 200, 'msg' => 'success']);
            } else $this->json_die(['code' => 403, 'msg' => 'customer not exist or it is not self']);
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
            Assert::notEmpty($_POST['id'], 'id can not be empty');
            Assert::integer((int)$_POST['id'], 'id must be int');
            $id = $_POST['id'];
            $customer = Customer::find($id);
            $username = $customer->user->name;
            $customer->followName = $username;
            unset($customer->user);
            $customer->sex = ($customer->sex === 1) ? '男' : '女';
            switch ($customer->type) {
                case 1:
                    $customer->type = '一般客户';
                    break;
                case 2:
                    $customer->type = '意向客户';
                    break;
                case 3:
                    $customer->type = '已成交客户';
            }
            if ($customer && $customer->uuid === $request->get('user')->uuid) $this->json_die(['code' => 200, 'msg' => 'success', 'data' => $customer]);
            else $this->json_die(['code' => 403, 'msg' => 'customer not found']);
        } catch (\InvalidArgumentException $e) {
            $this->json_die(['code' => 407, 'msg' => $e->getMessage()]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $this->json_die(['code' => 500, 'msg' => 'unknown error']);
        }
    }

    public function amountCount(Request $request)
    {
        try {
            $count = Customer::amountCount($request->get('user')->uuid);
            $this->json_die(['code' => 200, 'msg' => 'success', 'data' => $count]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $this->json_die(['code' => 500, 'msg' => 'unknown error']);
        }
    }

    public function getPhaseLog(Request $request)
    {
        try {
            Assert::notEmpty($_POST['customerId'], 'id can not be null');
            Assert::integer((int)$_POST['customerId'], 'id must be int');
            $customerId = $_POST['customerId'];
            $uuid = $request->get('user')->uuid;
            $phaseLog = CustomerPhaseLog::getPhaseLog($customerId, $uuid);
            $this->json_die([
                'code' => 200,
                'msg' => 'success',
                'data' => $phaseLog
            ]);
        } catch (\InvalidArgumentException $e) {
            $this->json_die(['code' => 407, 'msg' => $e->getMessage()]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $this->json_die(['code' => 500, 'msg' => 'unknown error']);
        }
    }
    public function changePhase(Request $request){
        try{
            Assert::notEmpty($_POST['id'], 'id can not be null');
            Assert::integer((int)$_POST['id'],'id must be int');
            Assert::integer((int)$_POST['phase'],'phase must be int');
            $id = $_POST['id'];
            $phase = $_POST['phase'];
            $res = Customer::phaseChange($id,$request->get('user')->uuid,$phase);
            if ($res) $this->json_die(['code'=>200, 'msg'=>'success']);
            else $this->json_die(['code'=>403,'msg'=>'customer is not exist']);
        }catch (\InvalidArgumentException $e) {
            $this->json_die(['code' => 407, 'msg' => $e->getMessage()]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $this->json_die(['code' => 500, 'msg' => 'unknown error']);
        }
    }

}
