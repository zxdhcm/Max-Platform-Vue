import {UserLayout, BasicLayout, RouteView, PageView} from '@/components/layouts'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {title: '首页'},
    redirect: '/dashboard/analysis',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/analysis',
        component: RouteView,
        meta: {title: '仪表盘', icon: 'dashboard', permission: ['Pages.Dashboards']},
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: {title: '分析页', permission: ['Pages.Dashboards']}
          },
          {
            path: '/dashboard/monitor',
            name: 'Monitor',
            hidden: true,
            component: () => import('@/views/dashboard/Monitor'),
            meta: {title: '监控页', permission: ['Pages.Developments']}
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: {title: '工作台', permission: ['Pages.Developments']}
          }
        ]
      },

      // Authority
      {
        path: '/authority',
        name: 'authority',
        component: PageView,
        redirect: '/authority/user-list',
        meta: {title: '权限管理', icon: 'setting', permission: ['Pages.Users']},
        children: [
          {
            path: '/authority/user-list',
            name: 'UserList',
            component: () => import('@/views/authority/users/UserList'),
            meta: {title: '用户管理', permission: ['Pages.Users']}
          },
          {
            path: '/authority/role-list',
            name: 'RoleList',
            component: () => import('@/views/authority/roles/RoleList'),
            meta: {title: '角色管理', permission: ['Pages.Roles']}
          }
        ]
      },

      // forms
      {
        path: '/form',
        redirect: '/form/basic-form',
        component: PageView,
        meta: {title: '表单页', icon: 'form', permission: ['Pages.Developments']},
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            component: () => import('@/views/form/BasicForm'),
            meta: {title: '基础表单', permission: ['Pages.Developments']}
          },
          {
            path: '/form/step-form',
            name: 'StepForm',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: {title: '分步表单', permission: ['Pages.Developments']}
          },
          {
            path: '/form/advanced-form',
            name: 'AdvanceForm',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: {title: '高级表单', permission: ['Pages.Developments']}
          }
        ]
      },

      // list
      {
        path: '/list',
        name: 'list',
        component: PageView,
        redirect: '/list/query-list',
        meta: {title: '列表页', icon: 'table', permission: ['Pages.Developments']},
        children: [
          {
            path: '/list/query-list',
            name: 'QueryList',
            component: () => import('@/views/list/TableList'),
            meta: {title: '查询表格', permission: ['Pages.Developments']}
          },
          {
            path: '/list/edit-table',
            name: 'EditList',
            component: () => import('@/views/list/TableInnerEditList'),
            meta: {title: '内联编辑表格', permission: ['Pages.Developments']}
          },
          {
            path: '/list/users-list',
            name: 'UserList',
            component: () => import('@/views/list/UserList'),
            meta: {title: '用户列表', permission: ['Pages.Developments']}
          },
          {
            path: '/list/role-list',
            name: 'RoleList',
            component: () => import('@/views/list/RoleList'),
            meta: {title: '角色列表', permission: ['Pages.Developments']}
          },
          {
            path: '/list/permission-list',
            name: 'PermissionList',
            component: () => import('@/views/list/PermissionList'),
            meta: {title: '权限列表', permission: ['Pages.Developments']}
          },
          {
            path: '/list/basic-list',
            name: 'BasicList',
            component: () => import('@/views/list/StandardList'),
            meta: {title: '标准列表', permission: ['Pages.Developments']}
          },
          {
            path: '/list/card',
            name: 'CardList',
            component: () => import('@/views/list/CardList'),
            meta: {title: '卡片列表', permission: ['Pages.Developments']}
          },
          {
            path: '/list/search',
            name: 'SearchList',
            component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/list/search/article',
            meta: {title: '搜索列表', permission: ['Pages.Developments']},
            children: [
              {
                path: '/list/search/article',
                name: 'SearchArticles',
                component: () => import('../views/list/TableList'),
                meta: {title: '搜索列表（文章）', permission: ['Pages.Developments']}
              },
              {
                path: '/list/search/project',
                name: 'SearchProjects',
                component: () => import('../views/list/TableList'),
                meta: {title: '搜索列表（项目）', permission: ['Pages.Developments']}
              },
              {
                path: '/list/search/application',
                name: 'SearchApplications',
                component: () => import('../views/list/TableList'),
                meta: {title: '搜索列表（应用）', permission: ['Pages.Developments']}
              },
            ]
          },
        ]
      },

      // profile
      {
        path: '/profile',
        name: 'profile',
        component: RouteView,
        redirect: '/profile/basic',
        meta: {title: '详情页', icon: 'profile', permission: ['Pages.Developments']},
        children: [
          {
            path: '/profile/basic',
            name: 'ProfileBasic',
            component: () => import('@/views/profile/basic/Index'),
            meta: {title: '基础详情页', permission: ['Pages.Developments']}
          },
          {
            path: '/profile/advanced',
            name: 'ProfileAdvanced',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: {title: '高级详情页', permission: ['Pages.Developments']}
          }
        ]
      },

      // result
      {
        path: '/result',
        name: 'result',
        component: PageView,
        redirect: '/result/success',
        meta: {title: '结果页', icon: 'check-circle-o', permission: ['Pages.Developments']},
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: {title: '成功', hiddenHeaderContent: true, permission:['Pages.Developments']}
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: {title: '失败', hiddenHeaderContent: true, permission: ['Pages.Developments']}
          }
        ]
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: {title: '异常页', icon: 'warning', permission: ['Pages.Developments']},
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: {title: '403', permission: ['Pages.Developments']}
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: {title: '404', permission: ['Pages.Developments']}
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: {title: '500', permission: ['Pages.Developments']}
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        name: 'account',
        meta: {title: '个人页', icon: 'user', keepAlive: true, permission: ['Pages.Accounts']},
        children: [
          /* {
             path: '/account/center',
             name: 'center',
             component: () => import('@/views/account/center/Index'),
             meta: { title: '个人中心', keepAlive: true, permission: [ 'Pages.Users' ]  }
           },*/
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: {title: '个人设置', hideHeader: true, keepAlive: true, permission: ['Pages.Accounts']},
            redirect: '/account/settings/base',
            alwaysShow: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: {title: '基本设置', hidden: true, keepAlive: true, permission: ['Pages.Accounts']}
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: {title: '安全设置', hidden: true, keepAlive: true, permission: ['Pages.Accounts']}
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: {title: '个性化设置', hidden: true, keepAlive: true, permission: ['Pages.Accounts']}
              },
              /* {
                 path: '/account/settings/binding',
                 name: 'BindingSettings',
                 component: () => import('@/views/account/settings/Binding'),
                 meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: [ 'Pages.Accounts' ]  }
               },
               {
                 path: '/account/settings/notification',
                 name: 'NotificationSettings',
                 component: () => import('@/views/account/settings/Notification'),
                 meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: [ 'Pages.Accounts' ]  }
               },*/
            ]
          },
          {
            path: '/account/bookmark',
            name: 'bookmark',
            component: () => import('@/views/account/bookmark/Index'),
            meta: {title: '个人书签', keepAlive: true, permission: ['Pages.Accounts']}
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/users',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "users" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "users" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "users" */ '@/views/user/RegisterResult')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },

]
