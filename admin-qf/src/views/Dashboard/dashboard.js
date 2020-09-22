import React, {Component, createRef} from 'react'
import {
  Card,
  Row,
  Col
} from 'antd'

import {getArticleAmount} from '../../requests/index'
import echarts from 'echarts'
import './index.css'


export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.articleChartRef = createRef()
    }
  //  初始化echarts实例
    initEcharts = ()=>{
        this.myCharts = echarts.init(this.articleChartRef.current)
        //发送ajax请求
        getArticleAmount()
          .then(resp =>{
              const option = {
                  xAxis: {
                      type: 'category',
                      boundaryGap: false,
                      data: resp.amount.map(item =>item.month)
                  },
                  yAxis: {
                      type: 'value'
                  },
                  series: [{
                      data: resp.amount.map(item =>item.value),
                      type: 'line',
                      areaStyle: {}
                  }]
              };
              this.myCharts.setOption(option)
          })
        // 指定图表的配置项和数据

    }
    componentDidMount() {
        //调用init方法
        this.initEcharts()

    }

    render() {
    return (
      <div >
          <Card
            title="概述"
            bordered={false}
          >
              <Row
                gutter={16}

              >
                  <Col
                    className="qf-gutter-row"
                    span={5}
                    offset={1}
                    style={{backgroundColor:'#bfa'}}>
                      <div >col-6</div>
                  </Col>
                  <Col
                    className="qf-gutter-row"
                    span={5}
                    offset={1}
                    style={{backgroundColor:'skyblue'}}>
                      <div >col-6</div>
                  </Col>
                  <Col
                    className="qf-gutter-row"
                    span={5}
                    offset={1}
                    style={{backgroundColor:'greenyellow'}}>
                      <div>col-6</div>
                  </Col>
                  <Col
                    className="qf-gutter-row"
                    span={5}
                    offset={1}
                    style={{backgroundColor:'pink'}}>
                      <div>col-6</div>
                  </Col>
              </Row>
          </Card>
          <Card
            title="最近浏览量"
            bordered={false}

          >
                <div ref={this.articleChartRef}  style={{height: '350px', width: '100%'}}/>
          </Card>
      </div>

    )
  }
}