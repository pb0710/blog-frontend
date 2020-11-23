import { all, spawn, takeEvery, put } from 'redux-saga/effects'
import { msg } from '@/components/base'
import TYPE from '@/common/actionTypes'
import * as settingApi from '@/apis/setting'
import * as action from './action'

function saveOnLocalStoage(setting) {
	for (const key in setting) {
		if (setting.hasOwnProperty(key)) {
			let value = setting[key]
			if (typeof value === 'boolean') {
				localStorage.setItem(key, value ? '1' : '0')
			} else if (typeof value !== 'object') {
				localStorage.setItem(key, value)
			}
		}
	}
}

function* saveSetting(newSetting) {
	try {
		yield settingApi.updateSetting(newSetting)
		yield put(action.updateSetting(newSetting))
		saveOnLocalStoage(newSetting)
		msg.success('保存成功')
	} catch (err) {
		msg.error('保存失败')
	}
}

function* saveSettingSaga() {
	yield takeEvery(TYPE.SAVE_SETTING, action => saveSetting(action.payload))
}

export default function* settingSaga() {
	yield all([spawn(saveSettingSaga)])
}
