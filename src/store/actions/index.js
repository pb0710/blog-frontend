import { createAction } from 'redux-actions'
import TYPE from '@/common/actionTypes'

export const initUser = createAction(TYPE.INIT_USER)

export const userLogin = createAction(TYPE.USER_LOGIN)

export const userLogout = createAction(TYPE.USER_LOGOUT)

export const userRegister = createAction(TYPE.USER_REGISTER)

export const updateOnline = createAction(TYPE.UPDATE_ONLINE)

export const updateUserProfile = createAction(TYPE.UPDATE_USER_PROFILE)

export const saveProfile = createAction(TYPE.SAVE_PROILE)

export const updateTopProgress = createAction(TYPE.UPDATE_TOP_PROGRESS)
