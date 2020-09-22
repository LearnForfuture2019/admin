import React, {Component} from 'react'
import {Card, Upload, Spin} from 'antd'
import {connect} from 'react-redux'
import axios from 'axios'
import {changeAvatar} from '../../actions/user'
const mapState =state => {
  return {
    avatarUrl: state.user.avatar
  }
}
@connect(mapState,{changeAvatar})
class Profile extends Component {
  state = {
    isLoading: false,
  }
  handleUploadAvatar = ({file}) => {
    this.setState({
      isLoading: true,
    })
    const data = new FormData()
    //添加Token
    data.append('Token', '8e289ea49bf85cbe6e7e877aef26786a69c48' +
      'c73:TzRtTiHJQF51TuzAdA5Oj3qzq30=:eyJkZWFkbGluZSI6MTU5OTU1NDYyMCwiYWN0aW9uIjo' +
      'iZ2V0IiwidWlkIjoiNzI2NTA5IiwiYWlkIjoiMTcxNTc5MSIsImZyb20iOiJmaWxlIn0=')
    //添加file字段
    data.append('file',file)
    //发送axios请求
    axios.post('http://up.imgapi.com/',data)
      .then(resp =>{
        //更新avatarUrl
        this.props.changeAvatar(resp.data.linkurl)
        this.setState({
          isLoading: false,
        })
      })
      .catch(err =>{
        console.log(err)
      })
  }

  render() {
    const {isLoading} = this.state
    return (
      <Card
        title='个人设置'
        bordered={false}
        style={{minHeight: '100%'}}
      >
        <Upload
          showUploadList={false}
          customRequest={this.handleUploadAvatar}

        >
          <Spin spinning={isLoading}>
            {
              this.props.avatarUrl ? <img src={this.props.avatarUrl} alt="头像"/> :
                <span
                  style={{
                    border: '1px dashed #dedede',
                    height: 80,
                    width: 80,
                    display: 'block'
                  }}>
                  点击上传
                </span>
            }
          </Spin>
        </Upload>
      </Card>
    )
  }
}
export default Profile