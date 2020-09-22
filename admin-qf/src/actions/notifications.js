import actionTypes from './action-types'
import {getAllNotifications} from '../requests/index'
const startMarkPost = ()=>({type:actionTypes.START_MARK_AS_READ})
const finishMarkPost = ()=>({type:actionTypes.FINISH_MARK_AS_READ})
export const markNotificationsById = (id) => {
  return dispatch => {
    dispatch(startMarkPost())
    //模拟异步发送消息
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
        payload: {
          id
        }
      })
      dispatch(finishMarkPost())
    },2000)
  }
}
export const markAllNotifications = ()=>{
  return dispatch =>{
    dispatch(startMarkPost())
    //模拟异步消息
    setTimeout(()=>{
      dispatch({
        type:actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ,
      })
      dispatch(finishMarkPost())
    },2000)
  }
}

export const getNotificationsToShow = ()=>{
  return dispatch =>{
    //发送ajax请求
    getAllNotifications()
      .then(resp =>{

        dispatch({
          type:actionTypes.RECEIVED_NOTIFICATIONS,
          payload: {
              list:resp.list
          }
        })
      })
  }
}