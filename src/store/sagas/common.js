import { all, spawn, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import * as userApi from '@/apis/user'
import * as commonAction from '@/store/actions'
import * as modalAction from '@/components/modal/store/action'
import * as settingAction from '@/views/settings/store/action'
import { msg } from '@/components/base'
import TYPE from '@/common/actionTypes'
import omit from 'omit.js'

function* fetchUserInfo() {
	try {
		const payload = yield userApi.initData()
		const profile = omit(payload, ['setting'])
		yield put(commonAction.updateUserProfile(profile))
		yield put(settingAction.updateSetting(payload.setting))
		yield put(commonAction.updateOnline(true))
		return
	} catch (err) {
		console.error('获取用户失败', err)
	}
}

function* initUser() {
	yield fetchUserInfo()
}

function* login({ username, password }) {
	try {
		yield userApi.login(username, password)
		yield fetchUserInfo()
		yield put(modalAction.updateModal(false, null))
		yield put(commonAction.updateOnline(true))
		msg.success('登录成功')
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
		msg.success('已退出')
	} catch (err) {
		console.error('退出登录失败', err)
		msg.error(err)
	}
}

function* register({ username, password, profile }) {
	try {
		yield userApi.register(username, password, profile)
		yield put(commonAction.userLogin({ username, password }))
		msg.success('注册成功')
	} catch (err) {
		console.error('注册失败', err)
		msg.error(err)
	}
}

function* saveProfile(profile) {
	const oldProfile = yield select(state => state.userProfile)
	const newProfile = { ...oldProfile, ...profile }
	console.log('newProfile: ', newProfile)
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

export default function* commonSaga() {
	yield all([spawn(initUserSaga), spawn(loginSaga), spawn(logoutSaga), spawn(registerSaga), spawn(saveProfileSaga)])
}
