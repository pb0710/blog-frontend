import { handleActions } from 'redux-actions'

export const modalVisible = handleActions(
	{
		UPDATE_MODAL_VISIBLE: (state, action) => action.payload
	},
	false
)

export const modalContent = handleActions(
	{
		UPDATE_MODAL_CONTENT: (state, action) => action.payload
	},
	null
)

export const promptVisible = handleActions(
	{
		UPDATE_PROMPT_VISIBLE: (state, action) => action.payload
	},
	false
)

export const promptContent = handleActions(
	{
		UPDATE_PROMPT_CONTENT: (state, action) => action.payload
	},
	null
)
