/*reducre与react无关，只是一个纯函数*/
import actionTypes from '../actions/action-types'

const initState = {
  isLoading: false,
  list: [
    {
      id: 1,
      title: 'Ant Design Title 1',
      description: "1111 Ant Design, a design language for background applications, is refined by Ant UED Team",
      hasRead: false
    }, {
      id: 2,
      title: 'Ant Design Title 2',
      description: "2222 Ant Design, a design language for background applications, is refined by Ant UED Team",
      hasRead: false
    }, {
      id: 3,
      title: 'Ant Design Title 3',
      description: "3333 Ant Design, a design language for background applications, is refined by Ant UED Team",
      hasRead: false
    },
  ]
}
export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.RECEIVED_NOTIFICATIONS:
      return {...state,list:action.payload.list}
    case actionTypes.START_MARK_AS_READ:
      return {...state, isLoading: true}
    case actionTypes.FINISH_MARK_AS_READ:
      return {...state, isLoading: false}
    case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
      const {list} = state
      const newList = list.map(item => {
        if (item.id === action.payload.id) {
          item.hasRead = true
        }
        return item
      })
      return {...state, list: newList}
    case actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ:
      const allList = state.list.map(item => {
        item.hasRead = true
        return item
      })
      return {
        ...state,
        list: allList
      }

    default:
      return state
  }
}
