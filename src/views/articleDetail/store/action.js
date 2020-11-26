import { createAction } from 'redux-actions'
import TYPE from '@/common/actionTypes'

export const updateDetail = createAction(TYPE.UPDATE_ARTICLE_DETAIL)

export const increaseArticleViews = createAction(TYPE.INCREASE_ARTICLE_VIEWS)
