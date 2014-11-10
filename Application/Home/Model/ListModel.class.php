<?php
/**
 * Created by PhpStorm.
 * User: fudongguang
 * Date: 14-6-11
 * Time: 下午2:02
 */

namespace Home\Model;
use Think\Model;
class ListModel extends Model {
    public $arr;

    public function _after_select($arr){

        foreach($arr as $k=>$v){
            if($v['params']){
                $arr[$k]['paramsFormat'] =  preg_replace('/\*\s*=/','<span class="red">*</span> =',  $v['params']);
            }

        }


        $this->arr=$arr;
    }


    protected  $_validate = array(
        array('name','require','请输入名称！'),
        array('result','require','请输入返回内容')
    );



}