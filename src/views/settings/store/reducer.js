import { handleActions } from 'redux-actions'
import TYPE from '@/common/actionTypes'

export const setting = handleActions(
	{
		[TYPE.UPDATE_SETTING]: (state, action) => ({ ...state, ...action.payload })
	},
	{
		theme: 'primary',
		drawerDefaultOpened: false,
		lang: 'zh-CN',
		useMarkdownGuide: true
	}
)
