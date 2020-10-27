import { handleActions } from 'redux-actions'
import TYPE from '@/common/actionTypes'

export const detail = handleActions(
	{
		[TYPE.UPDATE_ARTICLE_DETAIL]: (state, action) => action.payload
	},
	{}
)
