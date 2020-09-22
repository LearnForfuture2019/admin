import actionTypes from './action-types'
import {userLogin} from '../requests/index'

const loginSuccess = (userInfo)=>({
  type:actionTypes.LOGIN_SUCCESS,
  payload:userInfo
})
export const changeAvatar =(avatarUrl)=>{
  return {
    type:actionTypes.CHANGE_AVATAR,
    payload:{
      avatarUrl
    }
  }
}
const startLoginToServer = () =>({
  type:actionTypes.START_LOGIN
})

const loginFailed = ()=>{
  window.localStorage.removeItem('authToken')
  window.localStorage.removeItem('userInfo')
  return {
    type:actionTypes.LOGIN_FAILED
  }
}
export const logout = ()=>{
  return dispatch =>{
    dispatch(loginFailed())
  }
}

export const startLogin =(userInfo)=>{
  return dispatch =>{
    dispatch(startLoginToServer())
    userLogin(userInfo)
      .then(resp =>{
        if (resp.data.code === 200){
          const {authToken,...userInfo} = resp.data.data
          window.localStorage.setItem('authToken',authToken)
          window.localStorage.setItem('userInfo',JSON.stringify(userInfo))
          dispatch(loginSuccess(resp.data.data))
        }else {
          dispatch(loginFailed())
        }
      })
  }
}