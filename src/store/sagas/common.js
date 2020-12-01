import { all, spawn, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import * as userApi from '@/apis/user'
import * as commonAction from '@/store/actions'
import * as modalAction from '@/components/modal/store/action'
import * as settingAction from '@/views/settings/store/action'
import { msg } from '@/components/base'
import TYPE from '@/common/actionTypes'
import omit from 'omit.js'
import i18n from '@/common/i18n'

function* fetchUserInfo() {
	try {
		const payload = yield userApi.initialData()
		const profile = omit(payload, ['setting'])
		yield put(commonAction.updateUserProfile(profile))
		yield put(settingAction.mergeSetting(payload.setting))
		yield put(commonAction.updateOnline(true))
		return
	} catch (err) {
		console.error('获取用户信息失败', err)
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
		msg.success(i18n.t('success.login'))
	} catch (err) {
		console.error(i18n.t('error.login'), err)
		msg.error(`${i18n.t('error.login')} ${err}`)
	}
}

function* logout() {
	try {
		yield userApi.logout()
		yield put(commonAction.updateOnline(false))
		yield put(commonAction.updateUserProfile({}))
		yield put(
			settingAction.mergeSetting({
				// due to browser language detected, don't reset it.
				theme: 'primary',
				drawerDefaultOpened: false,
				useMarkdownGuide: true
			})
		)
		msg.success(i18n.t('success.logout'))
	} catch (err) {
		console.error(i18n.t('error.logout'), err)
		msg.error(i18n.t('error.logout'))
	}
}

function* register({ username, password, profile }) {
	try {
		yield userApi.register(username, password, profile)
		yield put(commonAction.userLogin({ username, password }))
		msg.success(i18n.t('success.register'))
	} catch (err) {
		console.error(i18n.t('error.register'), err)
		msg.error(`${i18n.t('error.register')} ${err}`)
	}
}

function* saveProfile(profile) {
	const oldProfile = yield select(state => state.userProfile)
	const newProfile = { ...oldProfile, ...profile }
	try {
		yield userApi.saveProfile(newProfile)
		yield put(commonAction.updateUserProfile(newProfile))
		msg.success(i18n.t('success.save'))
	} catch (err) {
		console.error(i18n.t('error.save'), err)
		msg.error(i18n.t('error.save'))
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
