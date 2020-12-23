import { createAction } from 'redux-actions'
import TYPE from '@/common/actionTypes'

export const updateArticleDetail = createAction(TYPE.UPDATE_ARTICLE_DETAIL)

export const updateArticleAuthorProfile = createAction(TYPE.UPDATE_ARTICLE_AUTHOR_PROFILE)

export const increaseArticleViews = createAction(TYPE.INCREASE_ARTICLE_VIEWS)
