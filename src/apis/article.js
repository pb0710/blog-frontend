import request from '@/utils/request'

/**
 * 抓取文章列表
 * @param {String} sort 分类 不传时获取全部
 */
export const fetchList = sort =>
	request({
		url: `article/list`,
		params: { sort }
	})

/**
 * 抓取文章详情
 * @param {String} articleId 文章ID
 */
export const fetchDetail = articleId =>
	request({
		url: `article/detail`,
		params: { articleId }
	})

/**
 * 添加文章
 * @param {Object} opt
 * 	@param {String} userId 用户ID
 * 	@param {String} articleDetail 文章详情
 */
export const addArticle = ({ userId, articleDetail = {} }) =>
	request({
		url: `article/add`,
		method: 'POST',
		data: { userId, articleDetail }
	})
