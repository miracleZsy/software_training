<?php

namespace App\Http\Controllers;

use App\Share;
use Illuminate\Http\Request;
use Webmozart\Assert\Assert;

class ShareController extends Controller
{
    public function shareList(Request $request)
    {
        $uuid = $request->get('uuid');
        $shares = Share::where('uuid_send', $uuid)->join('customer', 'share.customer_id', '=', 'customer.id')->get()->toArray();
        $this->json_die([
            'code' => 200,
            'msg' => 'success',
            'data' => $shares
        ]);
    }

    public function sharedList(Request $request)
    {
        $uuid = $request->get('uuid');
        $shares = Share::where('uuid_received', $uuid)->join('customer', 'share.customer_id', '=', 'customer.id')->get()->toArray();
        $this->json_die([
            'code' => 200,
            'msg' => 'success',
            'data' => $shares
        ]);
    }

    public function insert(Request $request)
    {
        Assert::notEmpty($_POST['uuid_received'], 'which user to send can not be empty');
        Assert::notEmpty($_POST['customer_id'], 'which customer to send can not be empty');
        Assert::numeric($_POST['customer_id'], 'customer id should be int type');
        $uuidReceived = $_POST['uuid_received'];
        $customerId = $_POST['customer_id'];
        $id = Share::insertNewShare($request->get('uuid'), $uuidReceived, $customerId);
        if ($id) $this->json_die([
            'code' => 200,
            'msg' => 'success',
            'data' => $id
        ]);
        else $this->json_die(['code' => 403, 'msg' => 'unauthorized']);
    }

    public function delete(Request $request)
    {
        Assert::notEmpty($_POST['id'], 'which id can not be empty');
        Assert::numeric($_POST['id'], 'id should be int type');
        $id = $_POST['id'];
        $uuid = $request->get('uuid');
        $share = Share::where('id', $id)->where('uuid_received', $uuid)->orWhere('uuid_send', $uuid);
        if ($share->delete()) $this->json_die(['code'=>200, 'msg'=>'success']);
    }
}
