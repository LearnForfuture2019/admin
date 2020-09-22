import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Button,
  Card,
  List,
  Avatar,
  Badge,
  Spin
} from "antd";

import {markNotificationsById, markAllNotifications} from '../../actions/notifications'

const mapStateToProps = state => {
  return state.notifications


}

@connect(mapStateToProps, {markNotificationsById, markAllNotifications})
class Notifications extends Component {
  render() {
    const {list,isLoading} = this.props
    return (
      <Spin spinning={isLoading}>
        <Card title="通知中心"
              bordered={false}
              extra={
                <Button
                  disabled={list.every(item => item.hasRead)}
                  onClick={this.props.markAllNotifications}
                >
                  全部标记为已读
                </Button>
              }
              style={{minHeight: '100%'}}
        >
          <List
            itemLayout="horizontal"
            dataSource={list}
            renderItem={item => (
              <List.Item
                extra={
                  item.hasRead
                    ?
                    null
                    :
                    <Button onClick={this.props.markNotificationsById.bind(this, item.id)}>
                      标记为已读
                    </Button>}
              >
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                  title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Card>
      </Spin>
    )
  }
}

export default Notifications