import React, {Component} from 'react'
import {
  Layout,
  Menu,
  Breadcrumb,
  Dropdown,
  Avatar,
  Badge
} from 'antd';
import {withRouter} from 'react-router-dom'

import {DownOutlined} from '@ant-design/icons'
import {adminRouter} from '../../routes/index'
import {connect} from 'react-redux'

import {getNotificationsToShow} from '../../actions/notifications'
import {logout} from '../../actions/user'
import logo from '../../assets/imgs/logo.png'
import './frame.css'

const {Header, Content, Sider} = Layout;
const menus = adminRouter.filter(item => item.isNav)

const mapStateToProps = state => {
  return {
    notificationCount: state.notifications.list.filter(item => !item.hasRead).length,
    displayName: state.user.displayName,
    avatar: state.user.avatar
  }
}

@connect(mapStateToProps, {getNotificationsToShow, logout})
@withRouter
class Frame extends Component {
  componentDidMount() {
    this.props.getNotificationsToShow()
  }

  onMenuClick = ({key}) => {
    this.props.history.push(key)
  }

  onDropdownMenuClick = ({key}) => {
    if (key === '/logout') {
      this.props.logout()
    } else {
      this.props.history.push(key)
    }
  }
  DropMenu = () => (
    <Menu onClick={this.onDropdownMenuClick}>
      <Menu.Item key="/admin/notifications">
        <Badge dot={this.props.notificationCount !== 0}>
          通知中心
        </Badge>
      </Menu.Item>
      <Menu.Item key='/admin/profile'>
        个人设置
      </Menu.Item>
      <Menu.Item key="/logout">
        退出登录
      </Menu.Item>
    </Menu>
  )

  render() {
    const pathnameArr = this.props.location.pathname.split('/')
    pathnameArr.length = 3
    return (
      <Layout style={{minHeight: '100%'}}>
        <Header className="header admin-header">
          <div className="admin-logo">
            <img src={logo} alt="admin"/>

            <Dropdown overlay={this.DropMenu()} trigger={['hover']}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Avatar src={this.props.avatar} />
                <span>欢迎你！{this.props.displayName} </span>
                <Badge count={this.props.notificationCount} offset={[-5, -5]}>
                  <DownOutlined/>
                </Badge>
              </div>
            </Dropdown>

          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              selectedKeys={[pathnameArr.join('/')]}
              style={{height: '100%', borderRight: 0}}
              onClick={this.onMenuClick}
            >
              {
                menus.map(route => {
                  return <Menu.Item
                    key={route.pathname}
                    icon={route.icon}
                  >
                    {route.title}
                  </Menu.Item>
                })
              }
            </Menu>
          </Sider>
          <Layout style={{padding: '16px'}}>
            <Breadcrumb style={{margin: '16px 0'}}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 0,
                margin: 0,
              }}
            >
              {
                this.props.children
              }
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default Frame