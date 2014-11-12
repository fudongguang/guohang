<?php
/**
 * Created by PhpStorm.
 * User: fudongguang
 * Date: 14-6-11
 * Time: 下午2:02
 */

namespace Home\Model;
use Think\Model;
class GzModel extends Model {
    protected function _after_select($arr){
//        print_r($arr);
    }

    protected  $_validate = array(
        array('name','require','请输入验证码！'),
        array('name','','该项目名称已经存在',0,'unique'),
        array('desc','require','请输入描述！'),
        array('desc','1,250','描述长度出现错误，请输入1-250个字符',0,'length')
    );

}