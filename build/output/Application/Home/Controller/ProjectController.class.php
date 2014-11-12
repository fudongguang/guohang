<?php
namespace Home\Controller;
use Think\Controller;
class ProjectController extends Controller {

    public function index(){

        $table = D('Project');
        $data = $table->select();

        $this->assign('data',$data);

        $this->display();
    }

    public function add(){
        $this->display();
    }


    public function save(){
        $table = D('Project');
        $_POST['author'] = I('session.name');

        if(!$table->create()){
            errorBack($table->getError());
            exit();
        }

        if($table->add()){
            redirect('../Index/index');
        }
    }

    public function del(){
        $id = I('get.id');
        $table = D('Project');

        $condition['id'] = $id;
        $row = $table->where($condition)->find();

        if(!$row){
            errorBack('删除失败，没有这条数据');
            exit();
        }

        $table->where("id='".$id."'")->delete();
        redirect('index');
    }

}