import { createAction } from 'redux-actions'
import TYPE from '@/common/actionTypes'

export const updateModalVisible = createAction(TYPE.UPDATE_MODAL_VISIBLE)

export const updateModalContent = createAction(TYPE.UPDATE_MODAL_CONTENT)

export const updateModal = createAction(TYPE.UPDATE_MODAL, (visible, content) => ({ visible, content }))
