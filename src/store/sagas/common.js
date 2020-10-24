import { all, spawn, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import * as userApi from '@/apis/user'
import * as commonAction from '@/store/actions'
import * as modalAction from '@/components/global/store/action'
import { message } from '@/components/global'

function* _fetchUser() {
	try {
		const { message, payload } = yield userApi.fetchStatus()
		if (message === 'ok') {
			yield put(commonAction.updateOnline(true))
			yield put(commonAction.updateUserProfile(payload))
		}
	} catch (err) {
		console.error('获取用户失败', err)
		message.error(err)
	}
}

function* initUser() {
	yield _fetchUser()
}

function* login({ username, password }) {
	try {
		const { message } = yield userApi.login(username, password)
		if (message === 'ok') {
			yield _fetchUser()
			const { online } = yield select()
			if (online) {
				yield put(modalAction.updateModalVisible(false))
			}
		}
	} catch (err) {
		console.error('登录失败', err)
		message.error(err)
	}
}

function* logout() {
	try {
		yield userApi.logout()
		yield put(commonAction.updateOnline(false))
		yield put(commonAction.updateUserProfile({}))
	} catch (err) {
		console.error('退出登陆失败', err)
		message.error(err)
	}
}

function* register({ username, password, profile }) {
	try {
		const { message } = yield userApi.register(username, password, profile)
		if (message === 'ok') {
			yield put(commonAction.userLogin({ username, password }))
		}
	} catch (err) {
		console.error('注册失败', err)
		message.error(err)
	}
}

function* initUserSaga() {
	yield takeEvery('INIT_USER', action => initUser(action.payload))
}

function* loginSaga() {
	yield takeLatest('USER_LOGIN', action => login(action.payload))
}

function* logoutSaga() {
	yield takeLatest('USER_LOGOUT', action => logout(action.payload))
}

function* registerSaga() {
	yield takeEvery('USER_REGISTER', action => register(action.payload))
}

export default function* () {
	yield all([spawn(initUserSaga), spawn(loginSaga), spawn(logoutSaga), spawn(registerSaga)])
}
