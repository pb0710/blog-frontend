import { all, spawn, takeEvery, put, select } from 'redux-saga/effects'
import { msg } from '@/components/base'
import TYPE from '@/common/actionTypes'
import * as settingApi from '@/apis/setting'
import * as action from './action'
import i18n from '@/common/i18n'

function* saveSetting(newSetting) {
	try {
		const { online } = yield select()
		if (online) {
			yield settingApi.updateSetting(newSetting)
			msg.success(i18n.t('success.save'))
		}
		yield put(action.mergeSetting(newSetting))
	} catch (err) {
		msg.error(i18n.t('error.save'))
	}
}

function* changeLang(setting) {
	const { setting: oldSetting } = yield select()
	const lang = setting?.lang ? setting.lang : oldSetting.lang
	i18n.changeLanguage(lang.slice(0, 2))
}

function* saveSettingSaga() {
	yield takeEvery(TYPE.SAVE_SETTING, action => saveSetting(action.payload))
}

function* changeLangSaga() {
	yield takeEvery(TYPE.MERGE_SETTING, action => changeLang(action.payload))
}

export default function* settingSaga() {
	yield all([spawn(saveSettingSaga), spawn(changeLangSaga)])
}
