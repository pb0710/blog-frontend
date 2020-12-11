import { all, spawn, takeEvery, put, select } from 'redux-saga/effects'
import TYPE from '@/common/actionTypes'
import * as articleApi from '@/apis/article'
import * as action from './action'

function* increaseArticleViews(articleId) {
	try {
		const { views } = yield articleApi.increaseViews(articleId)
		const oldDetail = yield select(state => state.articleDetail)
		yield put(action.updateArticleDetail({ ...oldDetail, views }))
	} catch (err) {
		console.error('增加文章阅读次数失败', err)
	}
}

function* increaseArticleViewsSaga() {
	yield takeEvery(TYPE.INCREASE_ARTICLE_VIEWS, action => increaseArticleViews(action.payload))
}

export default function* articleDetailSaga() {
	yield all([spawn(increaseArticleViewsSaga)])
}
