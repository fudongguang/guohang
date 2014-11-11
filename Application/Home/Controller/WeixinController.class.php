<?php
namespace Home\Controller;
use Think\Controller;
define("TOKEN", "hhcj");
class WeixinController extends Controller {

    private $jiangping = [
        ['钥匙扣', 1000],
        ['马克杯', 500],
        ['代金券', 300],
        ['机翼U盘', 100],
        ['飞机模型', 10],
        ['往返机票', 2]
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


        //验证是否有这个用户
        if(!$this->checkUserName($FromUserName)){
            $this->responseResult('','获取用户数据失败');
            return false;
        }

        //验证抽奖次数
        $times = $this->getTimes($FromUserName);
        if($times>=100){
            $this->responseResult('','您今天抽奖次数已满');
            return false;
        }

        //更新用户抽奖次数
        $this->updateTimes($FromUserName);

        //查看今日有多少人抽奖了
        $PlayerTotal = $this->getPlayerTotal();

        //查看获奖记录数
        $JiangTotal = $this->getJiangTotal();
        if(($PlayerTotal/$this->scale)>$JiangTotal){
            $result = $this->getJiangPing();
        }else{
            $result = $this->noJiangPing();
        }

        //保存抽奖数据
        $name = $this->getJiangPingName($result);

        $data['name']=$name;
        $data['number']=intval(implode('',$result));
        $data['FromUserName']=$FromUserName;
        $table = D('jiangping');
        if(!$table->create($data)){
//            errorBack($table->getError());
//            exit();
        }
        $table->add($data);


        if($result==[9,5,3,3,9]){
            $result = [4,2,7,6,6];
        }
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
        $arr = array(rand(0,8),rand(0,8),rand(0,8),rand(0,8),rand(0,8));

        if($arr==[9,5,3,3,9]){
            $arr = [4,2,7,6,6];
        }

        return $arr;
    }

    //查看今日中奖情况
    public function getJiangTotal(){
        $table = D('jiangping');
        return $count = $table->where("time>='".date("Y-m-d")."' and name!='nothing'")->count();
    }

    //查看单个奖品今日中奖情况
    public function getJiangTotalByItem($name){
        $table = D('jiangping');
        return $count = $table->where("time>='".date("Y-m-d")."' and name='".$name."'")->count();
    }


    //查看今日有多少人抽奖了
    public function getPlayerTotal(){
        $table = D('user');
        return $count = $table->where("times>0")->count();
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

        if($count){
            return $this->jiangping[$count-1][0];
        }else{
            return 'nothing';
        }
    }

    public function checkUserName($FromUserName){
        $table = D('user');
        return $table->where("FromUserName="."'".$FromUserName."'")->count();
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


    public function weixinMsg(){
        $this->valid();
        exit;

        $postStr = $GLOBALS["HTTP_RAW_POST_DATA"];
        if (!empty($postStr)) {
            libxml_disable_entity_loader(true);
            $postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
            $fromUsername = $postObj->FromUserName;
            $toUsername = $postObj->ToUserName;
            $content = trim($postObj->Content);
            $msgType =$postObj->MsgType;
            $event = $postStr->Event;

            if($msgType === 'text'){
                if(stristr($content,'dz')){
                    if($this->address($content,$fromUsername)){
                        $this->responseMsg('处理成功，我们将在七个工作日内发货');
                    }
                }
            }

            if($msgType === 'event'){
                if($event === 'subscribe'){
                    if($this->add($fromUsername)){
                        $this->responseMsg('关注设置成功');
                    }
                }
            }

        } else {
            echo "";
            exit;
        }
    }

    public function responseMsg($contentStr){
        //get post data, May be due to the different environments
        $postStr = $GLOBALS["HTTP_RAW_POST_DATA"];

        //extract post data
        if (!empty($postStr)) {
            /* libxml_disable_entity_loader is to prevent XML eXternal Entity Injection,
            the best way is to check the validity of xml by yourself */
            libxml_disable_entity_loader(true);
            $postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
            $fromUsername = $postObj->FromUserName;
            $toUsername = $postObj->ToUserName;
            $keyword = trim($postObj->Content);
            $time = time();
            $textTpl = "<xml>
                <ToUserName><![CDATA[%s]]></ToUserName>
                <FromUserName><![CDATA[%s]]></FromUserName>
                <CreateTime>%s</CreateTime>
                <MsgType><![CDATA[%s]]></MsgType>
                <Content><![CDATA[%s]]></Content>
                <FuncFlag>0</FuncFlag>
            </xml>";
            if (!empty($keyword)) {
                $msgType = "text";
                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
                echo $resultStr;
            } else {
                echo "Input something...";
            }

        } else {
            echo "";
            exit;
        }
    }

    public function valid(){
        $echoStr = $_GET["echostr"];

        if ($this->checkSignature()) {
            echo $echoStr;
            exit;
        }
    }

    private function checkSignature(){
        if (!defined("TOKEN")) {
            throw new Exception('TOKEN is not defined!');
        }

        $signature = $_GET["signature"];
        $timestamp = $_GET["timestamp"];
        $nonce = $_GET["nonce"];

        $token = TOKEN;
        $tmpArr = array($token, $timestamp, $nonce);
        sort($tmpArr, SORT_STRING);
        $tmpStr = implode($tmpArr);
        $tmpStr = sha1($tmpStr);

        if ($tmpStr == $signature) {
            return true;
        } else {
            return false;
        }
    }


    public function testchoujiang(){
        $this->choujiang('dsf');
    }

    public function testaddress(){
        $this->address('sdfsdfsdf','dsf');
    }
}