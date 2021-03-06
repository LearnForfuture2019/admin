import React from "react";
import {
  Dashboard,
  ArticleEdit,
  ArticleList,
  Login,
  NotFound,
  Settings,
  Notifications,
  NoAuth,
  Profile
} from '../views/index'
import {DashboardOutlined, UnorderedListOutlined, SettingOutlined} from '@ant-design/icons';
//一级路由
export const mainRouter = [
  {
    pathname: '/login',
    component: Login
  }, {
    pathname: '/404',
    component: NotFound
  }
]

//二级路由
export const adminRouter = [
  {
    pathname: '/admin/dashboard',
    component: Dashboard,
    title: '仪表盘',
    isNav: true,
    icon: <DashboardOutlined/>,
    roles: ['001', '002', '003']
  },
  {
    pathname: '/admin/article',
    component: ArticleList,
    exact: true,
    title: '文章管理',
    isNav: true,
    icon: <UnorderedListOutlined/>,
    roles: ['001', '002']
  }, {
    pathname: '/admin/article/edit:id',
    component: ArticleEdit,
    roles: ['001', '002']
  }, {
    pathname: '/admin/settings',
    component: Settings,
    title: '设置',
    isNav: true,
    icon: <SettingOutlined/>,
    roles: ['001']
  }, {
    pathname: '/admin/notifications',
    component: Notifications,
    title: '通知中心',
    roles: ['001', '002', '003']
  },{
    pathname: '/admin/noauth',
    component: NoAuth,
    roles: ['001', '002', '003']
  },{
    pathname: '/admin/profile',
    component: Profile,
    roles: ['001', '002', '003']
  },
]