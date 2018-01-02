<?php

namespace App\Http\Controllers;

use App\Share;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Webmozart\Assert\Assert;

class ShareController extends Controller
{
    public function shareList(Request $request)
    {
        try {
            Assert::oneOf((int)$_POST['time'], [0, 1, 2, 3, 4], 'time must be 0 1 2 3 4');
            $time = $_POST['time'];
            $uuid = $request->get('user')->uuid;
            $shares = Share::filter($time)->where('uuid_send', $uuid)
                ->join('customer', 'share.customer_id', '=', 'customer.id')
                ->select('customer.id', 'customer.name', 'share.created_at as share_time', 'customer.tel', 'customer.pic_url')
                ->get()->toArray();;
            $this->json_die([
                'code' => 200,
                'msg' => 'success',
                'data' => $shares
            ]);
        } catch (\InvalidArgumentException $e) {
            $this->json_die(['code' => 407, 'msg' => $e->getMessage()]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $this->json_die(['code' => 500, 'msg' => $e->getMessage()]);
        }
    }

    public function sharedList(Request $request)
    {
        try {
            Assert::oneOf((int)$_POST['time'], [0, 1, 2, 3, 4], 'time must be 0 1 2 3 4');
            $time = $_POST['time'];
            $uuid = $request->get('user')->uuid;
            $shares = Share::filter($time)->where('uuid_received', $uuid)->join('customer', 'share.customer_id', '=', 'customer.id')
                ->select('customer.id', 'customer.name', 'share.created_at as share_time', 'customer.tel', 'customer.pic_url')
                ->get()->toArray();
            $this->json_die([
                'code' => 200,
                'msg' => 'success',
                'data' => $shares
            ]);
        }catch (\InvalidArgumentException $e) {
            $this->json_die(['code' => 407, 'msg' => $e->getMessage()]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $this->json_die(['code' => 500, 'msg' => $e->getMessage()]);
        }
    }

    public function insert(Request $request)
    {
        try {
            Assert::notEmpty($_POST['uuid_received'], 'which user to send can not be empty');
            Assert::notEmpty($_POST['customer_id'], 'which customer to send can not be empty');
            Assert::numeric($_POST['customer_id'], 'customer id should be int type');
            $uuidReceived = $_POST['uuid_received'];
            $customerId = $_POST['customer_id'];
            $id = Share::insertNewShare($request->get('user')->uuid, $uuidReceived, $customerId);
            if ($id) $this->json_die([
                'code' => 200,
                'msg' => 'success',
                'data' => $id
            ]);
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
            Assert::notEmpty($_POST['id'], 'which id can not be empty');
            Assert::numeric($_POST['id'], 'id should be int type');
            $id = $_POST['id'];
            $uuid = $request->get('user')->uuid;
            $share = Share::where('id', $id)->where('uuid_received', $uuid)->orWhere('uuid_send', $uuid);
            if ($share->delete()) $this->json_die(['code' => 200, 'msg' => 'success']);
            else $this->json_die(['code' => 500, 'msg' => 'unknown error']);
        } catch (\InvalidArgumentException $e) {
            $this->json_die(['code' => 407, 'msg' => $e->getMessage()]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $this->json_die(['code' => 500, 'msg' => 'unknown error']);
        }
    }
}
