import { handleActions } from 'redux-actions'

// 当前操作步骤
export const step = handleActions(
	{
		UPDATE_USER_STEP: (state, action) => action.payload
	},
	'register'
)

// 用户数据
export const accountInfo = handleActions(
	{
		UPDATE_ACCOUNT_INFO: (state, action) => action.payload
	},
	{}
)
