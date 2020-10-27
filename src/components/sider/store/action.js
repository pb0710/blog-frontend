import { createAction } from 'redux-actions'
import TYPE from '@/common/actionTypes'

export const toggleDrawer = createAction(TYPE.TOGGLE_DRAWER)

export const updateDrawer = createAction(TYPE.UPDATE_DRAWER)
