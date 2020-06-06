import { createAction } from 'redux-actions'

export const toggleDrawerAction = createAction('TOGGLE_DRAWER')

export const updateDrawerOpenedAction = createAction('UPDATE_DRAWER_OPEN', opened => opened)

export const updateMaskVisibleAction = createAction('UPDATE_MASK_VISIBLE', visible => visible)
