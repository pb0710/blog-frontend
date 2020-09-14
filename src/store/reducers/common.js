import { handleActions } from 'redux-actions'

// 全局遮罩层显示状态
export const maskVisible = handleActions(
  {
    UPDATE_MASK_VISIBLE: (state, action) => action.payload
  },
  false
)
