import React, {Component} from 'react'
import {
  Card,
  Button,
  Table,
  Tag,
  Modal,
  Typography,
  message,
  Tooltip
} from 'antd'
import moment from 'moment'
import XLSX from 'xlsx'
import {getArticles,deleteArticleById} from '../../requests/index'

const ButtonGroup = Button.Group
const titleDisplayMap = {
  id: 'id',
  title: '标题',
  author: '作者',
  createAt: '创建时间',
  amount: '阅读量'
}
export default class ArticleList extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      columns: [],
      total: 0,
      isLoading: false,
      offset: 0,
      limited: 10,
      //控制删除文章与显示提示框的
      deleteArticleTitle: '',
      isShowArticleModal: false,
      articleId:'',
      isConfirmLoading:false
    }
  }

  createColumns = (columnKeys) => {
    const columns = columnKeys.map(item => {
      if (item === 'amount') {
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (text, record) => {
            const {amount} = record

            return (
              <Tooltip title={amount>200?'超人气作家':'一般作家'}>
                <Tag color={amount > 200 ? 'red' : 'green'}>{record.amount}</Tag>
              </Tooltip>
            )
          }
        }
      } else if (item === 'createAt') {
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (text, record) => {
            const {createAt} = record
            return moment(createAt).format('YYYY年MM月DD日 HH:mm:ss')
          }
        }
      }
      return {
        title: titleDisplayMap[item],
        dataIndex: item,
        key: item,
      }
    })
    columns.push({
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
          <ButtonGroup>
            <Button size='small' type='primary' onClick={this.toEdit.bind(this,record)}>编辑</Button>
            <Button size='small' danger onClick={this.showDeleteArticle.bind(this, record)}>删除</Button>
          </ButtonGroup>
        )
      }
    })
    return columns
  }
//编辑文章
  toEdit = (record) =>{
    this.props.history.push({
      pathname:`/admin/article/edit${record.id}`
    })
  }
  showDeleteArticle = (record) => {
    this.setState({
      isShowArticleModal: true,
      deleteArticleTitle: record.title,
      articleId:record.id
    })
  }

  getData = () => {
    this.setState({
      isLoading: true
    })
    getArticles(this.state.offset, this.state.limited)
      .then(resp => {
        const columnKeys = Object.keys(resp.list[0])
        const columns = this.createColumns(columnKeys)
        if (!this.updater.isMounted(this)) return
        this.setState({
          total: resp.total,
          data: resp.list,
          columns,
        })
      })
      .catch(err => {
        //处理错误
        console.log(err)
      })
      .finally(() => {
        if (!this.updater.isMounted(this)) return
        this.setState({
          isLoading: false
        })
      })
  }
  onPageChange = (page, pageSize) => {
    console.log({page, pageSize})
    this.setState({
      offset: pageSize * (page - 1),
      limited: pageSize
    }, () => this.getData())
  }
  onPageSizeChange = (current, size) => {
    this.setState({
      offset: 0,
      limited: size
    }, () => this.getData())
  }
  //导出Excel
  toExcel = () => {
    //组合数据
    const {data} = this.state
    const dataSource = [Object.keys(data[0])]
    for (let i = 0; i < data.length; i++) {
      const createAt = moment(data[i].createAt).format('YYYY年MM月DD日 HH:mm:ss')
      const arr = Object.assign({}, data[i], {
        createAt
      })
      dataSource.push(Object.values(arr))
    }
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(dataSource);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, `articles-${this.state.offset / this.state.limited + 1}-
    ${moment().format('YYYYMMDDHHmmss')}.xlsx`)
  }


  componentDidMount() {
    this.getData()
  }

  hideModal = ()=>{
    this.setState({
      isShowArticleModal:false,
      deleteArticleTitle:'',
      isConfirmLoading:false

    })
  }

  deleteArticle = ()=> {
    const id = this.state.articleId
    this.setState({
      isConfirmLoading:true
    })
    // 发送ajax请求删除文章
    deleteArticleById(id)
      .then((resp) => {
        message.success(resp.msg)
        //跳转到第一页
        this.setState({
          offset:0
        },()=>{
        //  重新发送ajax请求获取数据
          this.getData()
        })
      })
      .finally(()=>{
        this.setState({
          isConfirmLoading:false,
          isShowArticleModal:false
        })
      })

  }


  render() {
    const {data, columns} = this.state
    return (
      <Card title="文章列表"
            bordered={false}
            extra={<Button onClick={this.toExcel}>导出Excel</Button>}
            style={{minHeight: '100%'}}
      >
        <Table columns={columns}
               dataSource={data}
               rowKey={record => record.id}
               loading={this.state.isLoading}
               pagination={{
                 current: this.state.offset / this.state.limited + 1,
                 total: this.state.total,
                 hideOnSinglePage: true,
                 showQuickJumper: true,
                 onChange: this.onPageChange,
                 onShowSizeChange: this.onPageSizeChange
               }}
        />
        <Modal
          title='此操作不可逆，请谨慎操作！！！'
          visible={this.state.isShowArticleModal}
          onCancel={this.hideModal}
          onOk={this.deleteArticle}
          confirmLoading={this.state.isConfirmLoading}
        >
            <Typography>确认删除
              <span style={{color:'#f00'}}>{this.state.deleteArticleTitle}</span>吗？
            </Typography>

        </Modal>
      </Card>
    )
  }
}