import { all, spawn } from 'redux-saga/effects'
import commonSaga from './common'
import siderSaga from '@/components/sider/store/saga'
import settingSaga from '@/views/settings/store/saga'
import modalSaga from '@/components/modal/store/saga'
import articleDetailSaga from '@/views/articleDetail/store/saga'

export default function* rootSaga() {
	yield all([spawn(commonSaga), spawn(siderSaga), spawn(settingSaga), spawn(modalSaga), spawn(articleDetailSaga)])
}
