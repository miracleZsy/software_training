<?php

namespace App\Http\Controllers;

use App\Customer;
use App\sys\Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Webmozart\Assert\Assert;

class CustomerController extends Controller
{
    public function list(Request $request)
    {
        $page = (int)$_POST['page'] > 0 ? (int)$_POST['page'] : 1;
        $size = Config::get('sys_page_size');
        $customers = Customer::where('uuid', $request->get('user')->uuid)->select('id', 'name', 'created_at', 'tel', 'pic_url')->orderBy('created_at', 'desc');
        $this->json_die([
            'code' => 200,
            'msg' => 'success',
            'data' => [
                'count' => $customers->count(),
                'customer' => $customers->forPage($page, $size)->get()->toArray()]
        ]);

    }

    public function insert(Request $request)
    {
        try {
            Assert::notEmpty($_POST['name'], 'name can not be empty');
            Assert::notEmpty($_POST['tel'], 'phone can not be empty');
            $name = $_POST['name'];
            $tel = isset($_POST['tel']) ? $_POST['tel'] : '';
            $work = isset($_POST['work']) ? $_POST['work'] : '';
            $remark = isset($_POST['remark']) ? $_POST['remark'] : '';
            $email = isset($_POST['email']) ? $_POST['email'] : '';
            $address = isset($_POST['address']) ? $_POST['address'] : '';
            $origin = isset($_POST['origin']) ? $_POST['origin'] : '';
            $QQ = isset($_POST['QQ']) ? $_POST['QQ'] : '';
            $birthday = isset($_POST['birthday']) ? $_POST['birthday'] : '';
            $sex = isset($_POST['sex']) ? $_POST['sex'] : '';
            $type = isset($_POST['type']) ? $_POST['type'] : '';
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
            Assert::numeric($_POST['id'], 'id can should be int');
            $id = $_POST['id'];
            $tel = isset($_POST['tel']) ? $_POST['tel'] : '';
            $name = isset($_POST['name']) ? $_POST['name'] : '';
            $work = isset($_POST['work']) ? $_POST['work'] : '';
            $remark = isset($_POST['remark']) ? $_POST['remark'] : '';
            $email = isset($_POST['email']) ? $_POST['email'] : '';
            $address = isset($_POST['address']) ? $_POST['address'] : '';
            $origin = isset($_POST['origin']) ? $_POST['origin'] : '';
            $QQ = isset($_POST['QQ']) ? $_POST['QQ'] : '';
            $birthday = isset($_POST['birthday']) ? $_POST['birthday'] : '';
            $sex = isset($_POST['sex']) ? $_POST['sex'] : '';
            if (Customer::updateCustomer($id, $name, $tel, $work, $remark, $email, $address, $origin, $QQ, $birthday, $sex, $request->get('user')->uuid))
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
            Assert::numeric($_POST['id'], 'id can should be int');
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
            Assert::numeric($_POST['id'], 'id must be int');
            $id = $_POST['id'];
            $customer = Customer::find($id);
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

    public function phaseFilter(Request $request)
    {
        try {
            Assert::numeric($_POST['phase'], 'phase must be int');
            $page = (int)$_POST['page'] > 0 ? (int)$_POST['page'] : 1;
            $phase = $_POST['phase'];
            $customer = Customer::phaseFilter($request->get('user')->uuid, $phase, $page);
            $this->json_die(['code' => 200, 'msg' => 'success', 'data' => $customer]);
        } catch (\InvalidArgumentException $e) {
            $this->json_die(['code' => 407, 'msg' => $e->getMessage()]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $this->json_die(['code' => 500, 'msg' => 'unknown error']);
        }
    }

    public function typeFilter(Request $request)
    {
        try {
            Assert::numeric($_POST['type'], 'type must be int');
            $page = (int)$_POST['page'] > 0 ? (int)$_POST['page'] : 1;
            $type = $_POST['type'];
            $customer = Customer::typeFilter($request->get('user')->uuid, $type, $page);
            $this->json_die(['code' => 200, 'msg' => 'success', 'data' => $customer]);
        } catch (\InvalidArgumentException $e) {
            $this->json_die(['code' => 407, 'msg' => $e->getMessage()]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $this->json_die(['code' => 500, 'msg' => 'unknown error']);
        }
    }

    public function timeFilter(Request $request)
    {
        try {
            Assert::numeric($_POST['time'], 'time must be int');
            $time = $_POST['time'];
            $page = (int)$_POST['page'] > 0 ? (int)$_POST['page'] : 1;
            $customer = Customer::timeFilter($request->get('user')->uuid, $time, $page);
            $this->json_die(['code' => 200, 'msg' => 'success', 'data' => $customer]);
        } catch (\InvalidArgumentException $e) {
            $this->json_die(['code' => 407, 'msg' => $e->getMessage()]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $this->json_die(['code' => 500, 'msg' => 'unknown error']);
        }
    }
}
