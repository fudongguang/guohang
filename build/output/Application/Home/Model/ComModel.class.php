<?php
/**
 * Created by PhpStorm.
 * User: fudongguang
 * Date: 14-6-11
 * Time: 下午2:02
 */

namespace Home\Model;
use Think\Model;
class KehuModel extends Model {
    public $after_arr;
    protected function _after_select($arr){

        foreach($arr as $k=>$v){
            if($v['status']==1){
                $arr[$k]['statusStr'] =  '锁定';
            }else{
                $arr[$k]['statusStr'] =  '正常';
            }

            if($v['role']==1){
                $arr[$k]['roleStr'] =  '管理员';
            }else{
                $arr[$k]['roleStr'] =  '普通用户';
            }
        }


        $this->after_arr=$arr;

    }

}