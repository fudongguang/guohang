<?php
namespace Home\Controller;
use Think\Controller;
class WeixinController extends Controller {

    private $jiangping = [
        ['往返机票', 2],
        ['飞机模型', 10],
        ['机翼U盘', 100],
        ['代金券', 300],
        ['马克杯', 500],
        ['钥匙扣', 1000]
    ];

    private $scale = 300;

    //增加用户关注
    public function add($FromUserName){
        $table = D('user');

        $_POST['FromUserName'] = $FromUserName;

        if(!$table->create()){
            errorBack($table->getError());
            exit();
        }

        $id = $table->add();

        return $id;
    }

    //保存用户地址
    public function address($address,$FromUserName){
        $table = D('user');

        $condition['FromUserName'] = $FromUserName;
        $row = $table->where($condition)->find();

        if(!$row){
            return false;
        }

        $_POST['address'] = $address;

        if(!$table->create()){
            errorBack($table->getError());
            exit();
        }

        $result = $table->where("FromUserName='".$FromUserName."'")->save();

        return $result;
    }


    //抽奖接口
    public function choujiang($FromUserName){

        $times = $this->getTimes($FromUserName);
        if($times>=100){
            $this->responseResult('','您今天抽奖次数已满');
            return false;
        }

        //更新用户抽奖次数
        $this->updateTimes($FromUserName);

        //查看多少人获奖
        $PlayerTotal = $this->getPlayerTotal();
        $JiangTotal = $this->getJiangTotal();

        if(($JiangTotal*$this->scale)>$PlayerTotal){
            $result = $this->getJiangPing();
        }else{
            $result = $this->noJiangPing();
        }

        //保存抽奖数据
        $name = $this->getJiangPingName($result);

        $data['name']=$name;
        $data['number']=11;
        $data['FromUserName']=$FromUserName;
        $table = D('jiangping');
        if(!$table->create($data)){
//            errorBack($table->getError());
//            exit();
        }
        $table->add($data);


        $this->responseResult($result);
    }

    //获取奖品接口
    public function getJiangPing(){
        $arr = array(rand(0,9),rand(0,9),rand(0,9),rand(0,9),rand(0,9));

        if(!$this->checkJiangPing($arr)){
            $arr = $this->noJiangPing();
        }

        return $arr;
    }

    //判断奖品是否足够
    public function checkJiangPing($arr){
        $tempStr = implode('',$arr);
        $count = substr_count($tempStr,'9');

        if(!$count){
            return true;
        }

        $item = $this->jiangping[$count];
        $usedCont = $this->getJiangTotalByItem($item[0]);

        if($usedCont>=$item[1]){
            return false;
        }else{
            return true;
        }
    }



    //不能中奖接口
    public function noJiangPing(){
        $arr = array(rand(0,9),rand(0,9),rand(0,9),rand(0,9),rand(0,9));

        if($arr===[9,5,3,3,9]){
            $arr = [4,2,7,6,6];
        }

        return $arr;
    }

    //查看今日中奖情况
    public function getJiangTotal(){
        $table = D('jiangping');
        return $count = $table->where("time>='".date("Y-m-d")."'")->count();
    }

    //查看单个奖品今日中奖情况
    public function getJiangTotalByItem($name){
        $table = D('jiangping');
        return $count = $table->where("time>='".date("Y-m-d")."' and name='".$name."'")->count();
    }


    //查看今日有多少人抽奖了
    public function getPlayerTotal(){
        $table = D('user');
        return $count = $table->where("times>=0")->count();
    }

    public function getUserInfoByFromUserName($FromUserName){
        $table = D('user');
        return $row = $table->where("FromUserName="."'".$FromUserName."'")->find();
    }

    public function getTimes($FromUserName){
        $row = $this->getUserInfoByFromUserName($FromUserName);
        return $row['times'];
    }

    public function updateTimes($FromUserName){
        $table = D('user');
        return $table->where("FromUserName="."'".$FromUserName."'")->setInc('times');
    }

    public function getJiangPingName ($arr){
        $tempStr = implode('',$arr);
        $count = substr_count($tempStr,'9');
        return $this->jiangping[$count][0];
    }


    //回应请求后打印结果
    public function responseResult($data='',$errorMsg=0){
        $result = [];
        $status = 0;

        if($errorMsg){
            $status = 1;
            $result['msg'] = $errorMsg;
        }

        $result['status'] = $status;
        $result['data'] = $data;

        echo json_encode($result);
    }

    public function testchoujiang(){


        $this->choujiang('dsf');
    }

}