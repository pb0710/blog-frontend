import { all, spawn, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import * as userApi from '@/apis/user'
import * as commonAction from '@/store/actions'
import * as modalAction from '@/components/modal/store/action'

function* _fetchUser() {
  try {
    const { message, payload } = yield userApi.fetchUserProfile()
    if (message === 'ok') {
      yield put(commonAction.updateOnline(true))
      yield put(commonAction.updateUserProfile(payload))
    }
  } catch (err) {
    console.error('获取用户失败', err)
  }
}

function* initUser() {
  yield _fetchUser()
}

function* login({ username, password }) {
  try {
    const { message } = yield userApi.login(username, password)
    if (message === 'ok') {
      yield _fetchUser()
      const { online } = yield select()
      if (online) {
        yield put(modalAction.updateModalVisible(false))
      }
    }
  } catch (err) {
    console.error('登录失败', err)
  }
}

function* logout() {
  try {
    yield userApi.logout()
    yield put(commonAction.updateOnline(false))
    yield put(commonAction.updateUserProfile({}))
  } catch (err) {
    console.error('退出登陆失败', err)
  }
}

function* initUserSaga() {
  yield takeEvery('INIT_USER', function* (action) {
    yield initUser(action.payload)
  })
}

function* loginSaga() {
  yield takeLatest('USER_LOGIN', function* (action) {
    yield login(action.payload)
  })
}

function* logoutSaga() {
  yield takeLatest('USER_LOGOUT', function* (action) {
    yield logout(action.payload)
  })
}

export default function* () {
  yield all([spawn(initUserSaga), spawn(loginSaga), spawn(logoutSaga)])
}
