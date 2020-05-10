import { all, fork, put, takeEvery, select } from 'redux-saga/effects'

function* toggleDrawer() {
	const { drawerOpened } = yield select()
	yield put({ type: 'UPDATE_DRAWER_OPEN', payload: !drawerOpened })
}

// ------------------------------saga---------------watch----------------------------------------

function* toggleDrawerSaga() {
	yield takeEvery('TOGGLE_DRAWER', function*(action) {
		yield toggleDrawer()
	})
}

export default function*() {
	yield all([
		fork(toggleDrawerSaga),
	])
}
