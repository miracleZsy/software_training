<?php

namespace App\Http\Controllers;

use App\SalePlan;
use App\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Webmozart\Assert\Assert;

class SaleController extends Controller
{
    public function list(Request $request)
    {
        Assert::oneOf((int)$_POST['time'],[0,1,2,3],'time must be 1 2 or 3');
        $time = $_POST['time'];
        $salePlans = SalePlan::saleList($request->get('user')->uuid,$time);
        $this->json_die([
            'code' => 200,
            'msg' => 'success',
            'data' => $salePlans
        ]);
    }

    public function select(Request $request)
    {
        try {
            Assert::notEmpty($_POST['id'], 'id can not be empty');
            Assert::integer((int)$_POST['id'], 'id must bu int');
            $id = $_POST['id'];
            $salePlan = SalePlan::selectDetail($request->get('user')->uuid, $id);
            $this->json_die([
                'code' => 200,
                'msg' => 'success',
                'data' => $salePlan
            ]);
        } catch (\InvalidArgumentException $e) {
            $this->json_die(['code' => 407, 'msg' => $e->getMessage()]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $this->json_die(['code' => 500, 'msg' => 'unknown error']);
        }

    }

    public function insert(Request $request){
        try{
            $customerIds = self::isJson($_POST['customerIds'])?$_POST['customerIds']:$this->json_die(['code'=>407,'msg'=>'must be json']);
            Assert::notEmpty($_POST['title'],'title can not bu empty');
            $title = $_POST['title'];
            $content = $_POST['content'];
            $actTime = $_POST['actTime'];
            $salePlan = SalePlan::insertNew($title,$content,$customerIds,$request->get('user')->uuid,$actTime);
            if ($salePlan) $this->json_die(['code'=>200,'msg'=>'success','data'=>$salePlan->id]);
            else $this->json_die(['code' => 500, 'msg' => 'unknown error']);
        }catch (\InvalidArgumentException $e) {
            $this->json_die(['code' => 407, 'msg' => $e->getMessage()]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $this->json_die(['code' => 500, 'msg' => 'unknown error']);
        }
    }
    public function update(Request $request){
        try{
            Assert::notEmpty($_POST['title'],'title can not be empty');
            Assert::notEmpty($_POST['id'],'id can not be empty');
            Assert::integer((int)$_POST['id'],'id must be int');
            $customerIds = self::isJson($_POST['customerIds'])?$_POST['customerIds']:$this->json_die(['code'=>407,'msg'=>'must be json']);
            $id = $_POST['id'];
            $title = $_POST['title'];
            $content = $_POST['content'];
            $actTime = $_POST['actTime'];
            $res = SalePlan::updatePlan($id,$title,$content,$customerIds,$request->get('user')->uuid,$actTime);
            if ($res) $this->json_die(['code'=>200,'msg'=>'success']);
            else $this->json_die(['code' => 403, 'msg' => 'not exist']);
        }catch (\InvalidArgumentException $e) {
            $this->json_die(['code' => 407, 'msg' => $e->getMessage()]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $this->json_die(['code' => 500, 'msg' => 'unknown error']);
        }
    }
    public function delete(Request $request){
        try{
            Assert::notEmpty($_POST['id'],'id can not be empty');
            Assert::integer((int)$_POST['id'],'id must be int');
            $id = $_POST['id'];
            $res = SalePlan::deleteOne($id,$request->get('user')->uuid);
            if ($res) $this->json_die(['code'=>200,'msg'=>'success']);
            else $this->json_die(['code' => 403, 'msg' => 'not exist']);
        }catch (\InvalidArgumentException $e) {
            $this->json_die(['code' => 407, 'msg' => $e->getMessage()]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $this->json_die(['code' => 500, 'msg' => 'unknown error']);
        }
    }

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
