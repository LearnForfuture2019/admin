import React, {Component, createRef} from 'react'
import {
  Button,
  Card,
  Form,
  Input,
  DatePicker,
  Spin,
  message
} from "antd";
import E from 'wangeditor'
import moment from "moment";

import {getArticleById, saveArticle} from '../../requests/index'
import './eidt.css'

const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 16},
}
const timeConfig = {
  rules: [{type: 'object', required: true, message: 'Please select time!'}],
};
const tailItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 8, offset: 4},
}

export default class ArticleEdit extends Component {
  constructor(props) {
    super(props);
    this.editorRef = createRef()
    //这是用来获取富文本编辑器中的数据，并提交到表单上
    this.formRef = createRef()
    this.state ={
      isLoading:false
    }
  }

  initEditor = () => {
    this.editor = new E(this.editorRef.current)
    this.editor.customConfig.onchange = (html) => {
      // html 即变化之后的内容
      this.formRef.current.setFieldsValue({
        content: html
      })

    }
    this.editor.create()
  }

  componentDidMount() {
    this.initEditor()
    this.setState({
      isLoading:true
    })
    //调用获取单篇文章接口
    getArticleById(this.props.match.params.id)
      .then((resp) => {
        resp.createAt = moment(resp.createAt)
        this.formRef.current.setFieldsValue(resp)
        this.editor.txt.html(resp.content)
      })
      .finally(()=>{
        this.setState({
          isLoading:false
        })
      })

  }


  //提交表单数据
  onFinish = value => {
    //将时间转换为时间戳
    const data = Object.assign({}, value, {
      createAt: value.createAt.valueOf()
    })
    this.setState({
      isLoading:true
    })
    //调用保存文章接口
    saveArticle(this.props.match.params.id, data)
      .then(resp => {
        message.success(resp.msg)
      //  修改成功，跳转到文章管理页面
        this.props.history.goBack()
      })
      .finally(()=>{
        this.setState({
          isLoading:false
        })
      })
  }

  render() {
    return (
      <Card title="文章编辑"
            bordered={false}
            extra={<Button onClick={this.props.history.goBack}>返回</Button>}
            style={{minHeight: '100%'}}
      >
        <Spin spinning={this.state.isLoading}>
          <Form
            name="dynamic_rule"
            onFinish={this.onFinish}
            ref={this.formRef}
          >
            <Form.Item
              name="title"
              label="标题"
              {...formItemLayout}
              rules={[
                {
                  required: true,
                  message: '标题是必填的',
                },
              ]}
            >
              <Input placeholder="请输入标题"/>
            </Form.Item>
            <Form.Item
              name="author"
              label="作者"
              {...formItemLayout}
              rules={[
                {
                  required: true,
                  message: '作者是必填的',
                },
              ]}
            >
              <Input placeholder="请输入作者"/>
            </Form.Item>
            <Form.Item
              name="amount"
              label="阅读量"
              {...formItemLayout}
              rules={[
                {
                  required: true,
                  message: '阅读量是必填的',
                },
              ]}
            >
              <Input placeholder="0"/>
            </Form.Item>
            <Form.Item name="createAt"
                       label="发布时间" {...timeConfig}
                       {...formItemLayout}
                       rules={[
                         {
                           required: true,
                           message: '发布时间是必填的',
                         },
                       ]}
            >
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
            </Form.Item>
            <Form.Item
              name="content"
              label="内容"
              {...formItemLayout}
              rules={[
                {
                  required: true,
                  message: '内容是必填的',
                },
              ]}
            >
              <div ref={this.editorRef} className='qf-admin'/>
            </Form.Item>
            <Form.Item {...tailItemLayout}>
              <Button type="primary" htmlType="submit">
                保存修改
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    )
  }
}