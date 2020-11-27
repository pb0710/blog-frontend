import { createAction } from 'redux-actions'
import TYPE from '@/common/actionTypes'

/**
 * 注意：这里的 update 和 save 并非一致：
 * update 更新 redux store
 */

export const mergeSetting = createAction(TYPE.MERGE_SETTING)

export const saveSetting = createAction(TYPE.SAVE_SETTING)
