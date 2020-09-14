import { handleActions } from 'redux-actions'

// 侧边抽屉打开状态
export const drawerOpened = handleActions(
  {
    UPDATE_DRAWER: (state, action) => action.payload
  },
  true
)
