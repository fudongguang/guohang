<?php
namespace Home\Controller;
use Think\Controller;
class ComController extends Controller {

    public function index(){
        if($_SESSION['name']){
            redirect('../Index/index',3,'您已经注册了!');
        }
    }

    public function reg(){
        if($_SESSION['name']){
            redirect('../Index/index',3,'您已经注册了!');
        }

        $this->display();
    }

}