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
            Assert::notEmpty($_POST['start'],'start can not be empty');
            Assert::notEmpty($_POST['end'],'end can not be empty');
            $start = $_POST['start'];
            $end = $_POST['end'];
            $numStatistic = Customer::customerManage($request->get('user')->uuid,$start,$end);
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
