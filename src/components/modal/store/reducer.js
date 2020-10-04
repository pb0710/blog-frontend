import { handleActions } from 'redux-actions'

export const visible = handleActions(
  {
    UPDATE_MODAL_VISIBLE: (state, action) => action.payload
  },
  false
)
