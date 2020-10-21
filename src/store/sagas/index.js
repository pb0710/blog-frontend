import { all, fork } from 'redux-saga/effects'
import commonSaga from './common'
import siderSaga from '@/components/sider/store/saga'

export default function* () {
	yield all([fork(commonSaga), fork(siderSaga)])
}
