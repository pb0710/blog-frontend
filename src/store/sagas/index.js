import { all, fork } from 'redux-saga/effects'
import commonSaga from './common'

export default function* () {
	yield all([fork(commonSaga)])
}
