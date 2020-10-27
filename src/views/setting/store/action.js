import { createAction } from 'redux-actions'
import TYPE from '@/common/actionTypes'

/**
 * 注意：这里的 update 和 save 并非一致：
 * update 更新 redux store
 * save 包含 update 和 localStorage setItem 操作
 */

export const updateSetting = createAction(TYPE.UPDATE_SETTING)

export const saveSetting = createAction(TYPE.SAVE_SETTING)
