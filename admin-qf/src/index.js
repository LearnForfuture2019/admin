import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from 'antd'
import {Provider} from 'react-redux'

import store from "./store";
import {mainRouter} from "./routes";
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route path='/admin' render={(routerProps) => {
            //权限认证：需要登录才能访问/admin
            return <App {...routerProps}/>
          }}/>
          {
            mainRouter.map(route => {
              return <Route path={route.pathname}
                            key={route.pathname}
                            component={route.component}/>
            })
          }
          {/*
    进行访问控制：
      当用户进入/时，直接进入admin页面；
      当用户进入其它路径时，进入404页面
    */}
          <Redirect to='/admin' from='/' exact/>
          <Redirect to='/404'/>
        </Switch>
      </Router>
    </ConfigProvider>
  </Provider>
  ,
  document.getElementById('root')
);


