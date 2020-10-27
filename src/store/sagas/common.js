import { all, spawn, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import * as userApi from '@/apis/user'
import * as commonAction from '@/store/actions'
import * as modalAction from '@/components/modal/store/action'
import { msg } from '@/components/base'
import TYPE from '@/common/actionTypes'

function* fetchUser() {
	try {
		const { message, payload } = yield userApi.fetchStatus()
		if (message === 'ok') {
			yield put(commonAction.updateOnline(true))
			yield put(
				commonAction.updateUserProfile({
					//TODO: gender & selfIntroduction
					...payload,
					gender: 'male',
					selfIntroduction: ''
				})
			)
			return
		}
		throw message
	} catch (err) {
		console.error('获取用户失败', err)
	}
}

function* initUser() {
	yield fetchUser()
}

function* login({ username, password }) {
	try {
		const { message } = yield userApi.login(username, password)
		if (message === 'ok') {
			yield fetchUser()
			const { online } = yield select()
			if (online) {
				yield put(modalAction.updateModalVisible(false))
				return
			}
		}
		throw message
	} catch (err) {
		console.error('登录失败', err)
		msg.error(err)
	}
}

function* logout() {
	try {
		yield userApi.logout()
		yield put(commonAction.updateOnline(false))
		yield put(commonAction.updateUserProfile({}))
	} catch (err) {
		console.error('退出登陆失败', err)
		msg.error(err)
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
		msg.error(err)
	}
}

function* saveProfile(profile) {
	const oldProfile = yield select(state => state.userProfile)
	const newProfile = { ...oldProfile, ...profile }
	try {
		yield userApi.saveProfile(newProfile)
		yield put(commonAction.updateUserProfile(newProfile))
		msg.success('保存成功')
	} catch (err) {
		msg.error('保存失败')
	}
}

function* initUserSaga() {
	yield takeEvery(TYPE.INIT_USER, action => initUser(action.payload))
}

function* loginSaga() {
	yield takeLatest(TYPE.USER_LOGIN, action => login(action.payload))
}

function* logoutSaga() {
	yield takeLatest(TYPE.USER_LOGOUT, action => logout(action.payload))
}

function* registerSaga() {
	yield takeEvery(TYPE.USER_REGISTER, action => register(action.payload))
}

function* saveProfileSaga() {
	yield takeEvery(TYPE.SAVE_PROILE, action => saveProfile(action.payload))
}

export default function* () {
	yield all([spawn(initUserSaga), spawn(loginSaga), spawn(logoutSaga), spawn(registerSaga), spawn(saveProfileSaga)])
}
