import { createAction } from 'redux-actions'

export const initUser = createAction('INIT_USER')

export const userLogin = createAction('USER_LOGIN')

export const userLogout = createAction('USER_LOGOUT')

export const updateOnline = createAction('UPDATE_ONLINE')

export const updateUserProfile = createAction('UPDATE_USER_PROFILE')
