import React, {Component} from 'react'
import {Form, Input, Button, Card} from 'antd'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import {startLogin} from '../../actions/user'
import './index.css'

const mapState = state => ({
  isLogin: state.user.isLogin,
  isLoading: state.user.isLoading
})

@connect(mapState, {startLogin})
class Login extends Component {
  onFinish = (value) => {
    this.props.startLogin(value)
  }

  render() {

    return (
      !this.props.isLogin ?
        <Card
          title="test-admin 用户登录"
          bordered={false}
          className='my-login-card'
        >
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              label='用户'
              name="username"
              rules={[
                {
                  required: true,
                  message: '用户名是必填的！',
                },
              ]}
            >
              <Input prefix={<UserOutlined/>} placeholder='请输入用户名'/>
            </Form.Item>

            <Form.Item
              label='密码'
              name="password"
              rules={[
                {
                  required: true,
                  message: '密码是必填的！',
                },
              ]}
            >
              <Input.Password prefix={<LockOutlined/>} placeholder='请输入密码'/>
            </Form.Item>


            <Form.Item>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
        :
        <Redirect to='/admin'/>

    )
  }
}

export default Login