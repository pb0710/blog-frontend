import { handleActions } from 'redux-actions'

// 侧边抽屉打开状态
export const drawerOpened = handleActions(
	{
		UPDATE_DRAWER_OPEN: (state, action) => action.payload
	},
	false
)

// 全局遮罩层显示状态
export const maskVisible = handleActions(
	{
		UPDATE_MASK_VISIBLE: (state, action) => action.payload
	},
	true
)
