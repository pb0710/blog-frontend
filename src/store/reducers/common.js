import { handleActions } from 'redux-actions'

// 用户登陆状态
export const online = handleActions(
  {
    UPDATE_ONLINE: (state, action) => action.payload
  },
  false
)

// 用户信息
export const userProfile = handleActions(
  {
    UPDATE_USER_PROFILE: (state, action) => action.payload
  },
  {}
)
