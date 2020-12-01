import { all, spawn, takeEvery, put, select } from 'redux-saga/effects'
import TYPE from '@/common/actionTypes'
import * as articleApi from '@/apis/article'
import * as action from './action'

function* increaseArticleViews(articleId) {
	try {
		const { views } = yield articleApi.increaseViews(articleId)
		const oldDetail = yield select(state => state.article.detail)
		yield put(action.updateDetail({ ...oldDetail, views }))
	} catch (err) {
		console.error('增加文章阅读量失败', err)
	}
}

function* increaseArticleViewsSaga() {
	yield takeEvery(TYPE.INCREASE_ARTICLE_VIEWS, action => increaseArticleViews(action.payload))
}

export default function* articleDetailSaga() {
	yield all([spawn(increaseArticleViewsSaga)])
}
