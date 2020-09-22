import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import {Frame} from './components/index'
import {adminRouter} from './routes/index'
import {connect} from 'react-redux'

const mapState = state => ({
  isLogin: state.user.isLogin,
  role:state.user.role
})

@connect(mapState)
class App extends Component {
  render() {
    return (
      this.props.isLogin ?
        <Frame>
          <Switch>
            {
              adminRouter.map(route => {
                return (
                  <Route key={route.pathname}
                         path={route.pathname}
                         exact={route.exact}
                         render={(routerProps) => {
                           const hasPermission = route.roles.includes(this.props.role)
                           return hasPermission?<route.component {...routerProps}/>:<Redirect to='/admin/noauth'/>
                         }}
                  />
                )
              })
            }
            {/*<Redirect to='/admin/dashboard' from='/admin' exact={true}/>*/}
            {/*这两种写法都是一致的*/}
            <Redirect to={adminRouter[0].pathname} from='/admin' exact={true}/>
            <Redirect to='/404'/>
          </Switch>
        </Frame>
        :
        <Redirect to='/login'/>

    )
  }
}

export default App