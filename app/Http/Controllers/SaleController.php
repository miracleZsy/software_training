<?php

namespace App\Http\Controllers;

use App\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Webmozart\Assert\Assert;

class SaleController extends Controller
{
    public function customerManage(Request $request){
        try{
            Assert::oneOf((int)$_POST['time'],[1,2,3],'time must be 1 or 2');
            $time = $_POST['time'];
            $numStatistic = Customer::customerManage($request->get('user')->uuid,$time);
            $this->json_die([
                'code'=>200,
                'msg'=>'success',
                'data'=>$numStatistic
            ]);
        }catch (\InvalidArgumentException $e) {
            $this->json_die(['code' => 407, 'msg' => $e->getMessage()]);
        }catch (\Exception $e) {
            Log::error($e->getMessage());
            $this->json_die(['code' => 500, 'msg' => $e->getMessage()]);
        }
    }
}
