import { handleActions } from 'redux-actions'
import TYPE from '@/common/actionTypes'

// 用户登录状态
export const online = handleActions(
	{
		[TYPE.UPDATE_ONLINE]: (state, action) => action.payload
	},
	false
)

// 用户信息
export const userProfile = handleActions(
	{
		[TYPE.UPDATE_USER_PROFILE]: (state, action) => action.payload
	},
	{}
)
