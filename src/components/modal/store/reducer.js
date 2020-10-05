import { handleActions } from 'redux-actions'

export const visible = handleActions(
  {
    UPDATE_MODAL_VISIBLE: (state, action) => action.payload
  },
  false
)

export const content = handleActions(
  {
    UPDATE_MODAL_CONTENT: (state, action) => action.payload
  },
  null
)
