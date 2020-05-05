import { handleActions } from 'redux-actions'

// 是否为历史保单（历史保单不允许操作）
export const isHistory = handleActions({
	UPDATE_IS_HISTORY: (state, action) => action.payload
}, false)