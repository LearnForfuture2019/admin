import actionTypes from '../actions/action-types'
const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
const isLogin = Boolean(window.localStorage.getItem('authToken'))

const initState = {
  ...userInfo,
  isLogin,
  isLoading:false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.START_LOGIN:
      return {...state,isLoading: true}
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload.userInfo,
        isLogin: true,
        isLoading: false
      }
    case actionTypes.LOGIN_FAILED:
      return {
        id:'',
        displayName:'',
        avatar:'',
        role:'',
        isLogin:false,
        isLoading:false,
      }
    case actionTypes.CHANGE_AVATAR:
      return {...state,avatar:action.payload.avatarUrl}
    default:
      return state
  }
}