import { all, spawn, takeEvery, select, put } from 'redux-saga/effects'
import { msg } from '@/components/base'
import TYPE from '@/common/actionTypes'
import * as settingApi from '@/apis/setting'
import * as action from './action'

function* saveSetting(newSetting) {
	console.log('newSetting: ', newSetting)
	yield put(action.updateSetting(newSetting))
	const { userId } = yield select(state => state.userProfile)
	try {
		yield settingApi.updateSetting(userId, newSetting)

		for (const key in newSetting) {
			if (newSetting.hasOwnProperty(key)) {
				let value = newSetting[key]
				if (typeof value === 'boolean') {
					localStorage.setItem(key, value ? '1' : '0')
				} else if (typeof value !== 'object') {
					localStorage.setItem(key, value)
				}
			}
		}
		yield put(action.updateSetting(newSetting))
		msg.success('保存成功')
	} catch (err) {
		msg.error('保存失败')
	}
}

function* saveSettingSaga() {
	yield takeEvery(TYPE.SAVE_SETTING, action => saveSetting(action.payload))
}

export default function* () {
	yield all([spawn(saveSettingSaga)])
}
