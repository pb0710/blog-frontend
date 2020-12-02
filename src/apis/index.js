import request from '@/utils/request'

/**
 * 文章模糊搜索
 * @param {String} keywords 关键字
 */
export const search = keywords =>
	request({
		url: `common/search`,
		method: 'GET',
		params: { keywords }
	})
