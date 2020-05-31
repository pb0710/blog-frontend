import request from 'utils/request'
import { Method } from 'common/constants'

/**
 * 获取用户配置
 * @param {string} userId 用户ID
 */
export const fetchOptions = userId =>
	request({
		url: `setting/options`,
		params: { userId }
	})

/**
 * 更新用户配置
 * @param {object} opt
 * 	@param {string} userId 用户ID
 * 	@param {object} options 用户配置
 */
export const updateOptions = ({ userId, options = {} } = {}) =>
	request({
		url: `setting/update_options`,
		method: Method.POST,
		data: { userId, options }
	})
