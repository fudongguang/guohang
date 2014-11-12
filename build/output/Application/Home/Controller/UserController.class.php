<?php
namespace Home\Controller;
use Think\Controller;
class UserController extends Controller {

    public function index(){
        if($_SESSION['name']){
            redirect('../Index/index',3,'登录成功!');
        }else{
            $this->display('login');
        }
    }

    public function showList(){
        import('ORG.Util.Page');
        $user=D('user');

        $count = $user->count();
        $Page = new  \Think\Page($count, 2);
        $pageShow = $Page->show();

        // 进行分页数据查询
        $orderby['id']='desc';
        $user->field('id,name,status,role,lastLoginTime,createTime')->order($orderby)->limit($Page->firstRow.','.$Page->listRows)->select();

        $list = $user->after_arr;

        $this->assign('page',$pageShow);
        $this->assign('rows',$list);
        $this->display();
    }

    public function login(){
        if(!$_POST['name']){
            redirect(U('Home/User/index'),0,'请输入用户名!');
            exit;
        }

        if(!$_POST['password']){
            errorBack('请输入密码');
            exit;
        }

        $table = M('user');

        $name = $_POST['name'];
        $password = $_POST['password'];
        $row = $table->where('name="'.$name.'"')->find();


        if($row['password']==md5($password)){
            $_SESSION['name'] = $row['name'];

            unset($row['password']);
            $_SESSION['userInfo'] = $row;

            redirect(U('Home/Index/index'),3,'登录成功!');

        }else{
            errorBack('用户名或密码错误');
        }
    }

    public function lock(){
        $status = I('get.status');
        $id = I('get.id');

        $condition['id']=$id;

        $table = M('user');
        $row = $table -> where($condition)->find();

        if(!$row){
            errorBack('错误操作');
        }

        if($row['role']==1){
            errorBack('不能锁定管理员');
        }

        $data['status'] = $status;

        $table->where($condition)->save($data);

        redirect(U('Home/User/showList'),1,'操作成功');
    }

    public function del(){
        $id = I('get.id');

        $condition['id']=$id;

        $table = M('user');
        $row = $table -> where($condition)->find();

        if(!$row){
            errorBack('错误操作');
        }

        if($row['role']==1){
            errorBack('不能删除管理员');
        }

        $table->where($condition)->delete();

        redirect(U('Home/User/showList'),1,'操作成功');
    }

    public function resetPWD(){
        $id = I('get.id');

        $condition['id']=$id;

        $table = M('user');
        $row = $table -> where($condition)->find();

        if(!$row){
            errorBack('错误操作');
        }

        if($row['role']==1){
            errorBack('不能重置管理员密码');
        }

        $data['password'] = md5(123456);
        $table->where($condition)->save($data);

        redirect(U('Home/User/showList'),1,'操作成功');
    }

    public function logout(){
        unset($_SESSION['userInfo']);
        unset($_SESSION['name']);
        redirect(U('Home/Index/index'),3,'退出成功!');
    }


}