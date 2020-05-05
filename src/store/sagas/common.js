import { all, fork, put, takeEvery, select } from 'redux-saga/effects'

// 初始化全局数据
function* initData() {
	
}

// ------------------------------saga---------------watch----------------------------------------

function* initDataSaga() {
	yield takeEvery('INIT_DATA', function*(action) {
		yield initData(action.payload)
	})
}

export default function*() {
	yield all([
		fork(initDataSaga),
	])
}
