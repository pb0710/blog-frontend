import { all, spawn, put, takeEvery, select } from 'redux-saga/effects'

function* toggleDrawer() {
	const { drawerOpened } = yield select()
	yield put({ type: 'UPDATE_DRAWER', payload: !drawerOpened })
}

// ------------------------------saga---------------watch----------------------------------------

function* toggleDrawerSaga() {
	yield takeEvery('TOGGLE_DRAWER', action => toggleDrawer())
}

export default function* () {
	yield all([spawn(toggleDrawerSaga)])
}
