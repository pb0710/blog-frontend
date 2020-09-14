import { createAction } from 'redux-actions'

export const toggleDrawer = createAction('TOGGLE_DRAWER')

export const updateDrawer = createAction('UPDATE_DRAWER', opened => opened)
