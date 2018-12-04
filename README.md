<p align="center">
    <a href="http://193.112.111.13">
        <img width="200" src="http://193.112.111.13/logo.png">
    </a>
</p>

# Max Platform Vue

## 效果演示
[查看效果请戳这里](http://193.112.111.13/)

## 简介
&emsp;&emsp;Max Platform Vue是基于[ant-design-pro-vue](https://github.com/sendya/ant-design-pro-vue/) 实现的一套后台集成解决方案，是后台项目管理系统[Max Platform](https://github.com/zxdhcm/Max-Platform)的前端页面

## 说明 
>  开发环境 WebStorm 2018.3  nodejs 10.14.0

>  部署环境 腾讯云 CentOS + Docker

>  自动化构建部署 Jenkins + Github

>相关项目地址  [Jenkins](http://193.112.111.13:8080/)

## 功能

- 登录/登出/注册
- 权限管理
    - 用户管理
    - 角色管理
- 个人中心
    - 个人设置
    - 个人书签
- 个性化设置

## 文件结构
```shell
.
├── public  打包所需静态资源
├── default.conf  nginx反向代理服务配置文件
├── Dockerfile  定制Docker镜像
├── nginx.conf  nginx反向代理服务配置文件
├── vue.config.js  Vue项目相关配置文件
└── src
    ├── api  AJAX请求
    └── assets  项目静态资源
        ├── icons  自定义图标资源
    ├── components  业务组件
    ├── config  项目路由配置
    ├── utils  封装工具函数
    ├── store  Vuex配置
    ├── view  页面文件
    ├── defaultSettings.js  后台相关默认配置文件
    ├── permission.js  路由权限控制文件
```

## 环境和依赖

- node
- yarn
- webpack
- eslint
- @vue/cli 3.0.1
- [ant-design-vue](https://github.com/vueComponent/ant-design-vue) - Ant Design Of Vue 实现

