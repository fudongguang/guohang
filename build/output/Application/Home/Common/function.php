<?php
/**
 * Created by PhpStorm.
 * User: fudongguang
 * Date: 14-6-11
 * Time: 下午5:59
 */

function formatMsg($msg){
    $result = array(
        state=>1,
        msg=>$msg
    );
    return json_encode($result);
}

function errorBack($msg){
    $str='<meta charset="utf-8"/>';
    $str.='<script>alert("'.$msg.'");window.history.back();</script>';

    echo $str;
}