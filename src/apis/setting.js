import request from '@/utils/request'

/**
 * 获取用户配置
 * @param {String} userId 用户ID
 */
export const fetchSetting = userId =>
	request({
		url: `setting/fetch`,
		params: { userId }
	})

/**
 * 更新用户配置
 * @param {String} userId 用户ID
 * @param {Object} setting 用户配置
 */
export const updateSetting = (userId, setting = {}) =>
	request({
		url: `setting/update`,
		method: 'POST',
		data: { userId, setting }
	})
