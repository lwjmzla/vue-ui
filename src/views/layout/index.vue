<template>
  <div>
    <div class="my-header">
      <el-header class="clearfix header" height="70px">
        <div class="logo">
          <!-- <img :src="getDefaultOrg.organizationLogo || logoImgSrc"/> -->
          <span>xxx羽毛球馆云平台</span>
        </div>
        <div class="userHandel">
          <div class="member">
            <!-- <div class="imgbox" :style="'background-image:url('+imgUrl+');'"><img src="" alt=""></div> -->
            <div class="">欢迎您管理员</div>
          </div>
          <div class="headDropDown">
            <el-dropdown>
              <div class="exit">
                <img src="/img/exit.png" alt="">
                <span>退出</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <router-link to="/system-bench/account/modifyPassword">
                  <el-dropdown-item>修改密码</el-dropdown-item>
                </router-link>
                <el-dropdown-item @click.native="SignOut">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
    </div>
    <div class="layout">
      <el-aside width="200px">
        <div class="my-menu">
          <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
            :background-color="'#2D333D'"
            :text-color="'#fff'"
            :active-text-color="'#fff'"
            :default-active="$route.path"
            :router="true"
          >
            <!-- <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">导航一</span>
              </template>
              <el-menu-item index="1-1">选项1</el-menu-item>
            </el-submenu> -->
            <el-menu-item index="/home" route="/home">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/member" route="/member">
              <i class="el-icon-s-custom"></i>
              <span slot="title">会员管理</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-main>
          <keep-alive :include="aliveArr">
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        aliveArr: [],
        isCollapse: false
      };
    },
    components: {

    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>

<style lang='scss' scoped>
  .my-header{
    height: 70px;box-shadow: 0 1px 4px rgba(0,21,41,0.08);
  }
  .my-menu{
    width: 200px;
  }
  .el-header {
      background: #2D333D;
      display: flex;
      align-items: center;
      .logo{
          flex: 1;
          display: flex;
          height: 100%;
          align-items: center;
          span{
              font-size: 16px;
              color: #fff;
          }
      }
      .logo img{
          // width: 100px;
          height: 32px;
          margin-right: 20px;
      }
      .userHandel{
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          color: #fff;
      }
  }
  .headDropDown {
      cursor: pointer;
      img{
          width: 20px;
          height: 20px;
          margin-right: 8px;
      }
      .exit{
          display: flex;
          align-items: center;
      }
      .exit span{
          color: #fff;
          font-size: 14px;
      }
      .el-dropdown {
          line-height: normal;
          display: flex;
          align-items: center;
      }
  }
  .member{
      margin-right: 20px;
      display: flex;
      align-items: center;
      overflow: hidden;
      >div{
          margin-right: 10px;
      }
      .imgbox{
          // line-height: 58px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
          background-position: center;
          background-size: cover;
      }
  }
  .layout{
      display: flex;
      // margin-top: 70px;
      height: calc(100vh - 70px);
  }

  .el-aside {
      position: relative;
      background-color: #2D333D;
      .el-header {
          // background-color: $darkBlueColor;
      }
      .el-menu {
          border-right: none;
      }
      .el-submenu__title:focus, .el-submenu__title:hover,
      .el-menu-item:focus, .el-menu-item:hover {
          background-color: $lightBlueColor !important;
          color: $whiteColor !important;
          i {
              color: $whiteColor;
          }
      }
      .el-menu-item.is-active {
          background-color: $lightBlueColor !important;
      }
  }

  .el-menu-item:first-child{
      position: relative;
      &::before{
          position: absolute;
          top: 0;
          content: '';
          width: 100%;
          height: 1px;
          background: #494F58;
          left: 0;
      }
  }
  .el-menu-item.is-active{
      background-color: #26B7BC !important;
      color:#fff !important;
      .iconfont{
          color:#fff;
      }
  }

  .el-menu-item,.el-submenu__title{
      display: flex;
      align-items: center;
  }
  .nest-menu .el-menu-item:hover {
      color: #fff !important;
  }
  .el-aside .el-menu-item.is-active{
      background-color: #26B7BC !important;
      color:#fff !important;
      .iconfont{
          color:#fff;
      }
  }
  .w24{
      width: 25px;
      display: inline-block;
  }
  .el-main{
    margin: 20px 20px 0;background: #fff;
  }
</style>
