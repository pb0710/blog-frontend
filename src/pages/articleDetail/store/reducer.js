import { handleActions } from 'redux-actions'

export const detail = handleActions(
  {
    UPDATE_ARTICLE_DETAIL: (state, action) => action.payload
  },
  {}
)
