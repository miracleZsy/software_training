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
        $shares = Share::where('uuid_send',$uuid)->join('customer','share.customer_id','=','customer.id')->get()->toArray();
        $this->json_die([
           'code'=>200,
           'msg'=>'success',
           'data'=>$shares
        ]);
    }

    public function sharedList(Request $request)
    {
        $uuid = $request->get('uuid');
        $shares = Share::where('uuid_received',$uuid)->join('customer','share.customer_id','=','customer.id')->get()->toArray();
        $this->json_die([
            'code'=>200,
            'msg'=>'success',
            'data'=>$shares
        ]);
    }

    public function insert(Request $request)
    {
        Assert::notEmpty($_POST['uuid_send'],'which user to send can not be empty');
        $uuidSend = $_POST['uuid_send'];

    }

    public function delete(Request $request)
    {

    }
}
