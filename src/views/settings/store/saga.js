import { all, spawn, takeEvery, put, select } from 'redux-saga/effects'
import { msg } from '@/components/base'
import TYPE from '@/common/actionTypes'
import * as settingApi from '@/apis/setting'
import * as action from './action'

function* saveSetting(newSetting) {
	try {
		const { online } = yield select()
		if (online) {
			yield settingApi.updateSetting(newSetting)
			msg.success('保存成功')
		}
		yield put(action.updateSetting(newSetting))
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
