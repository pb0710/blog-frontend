import request from '@/utils/request'

/**
 * 抓取文章列表
 * @param {String} category 分类 不传时获取全部类别
 * @param {Number} limit 返回结果数量
 * @param {String} sortBy 排序 type = 'popular'|'latest'|'random'
 */
export const fetchList = ({ category, limit, sortBy = 'latest' }) =>
	request({
		url: `article/list`,
		params: { category, limit, sortBy }
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
 * @param {String} userId 用户ID
 * @param {String} articleDetail 文章详情
 */
export const addArticle = (userId, articleDetail = {}) =>
	request({
		url: `article/add`,
		method: 'POST',
		data: { userId, articleDetail }
	})

/**
 * 增加文章访问量
 * @param {String} articleId 文章ID
 */
export const increaseViews = articleId =>
	request({
		url: `article/increase_views`,
		method: 'POST',
		data: { articleId }
	})

/**
 * 点赞文章
 * @param {String} userId 用户ID
 * @param {String} articleId 文章ID
 */
export const like = (userId, articleId) =>
	request({
		url: `article/likes`,
		method: 'POST',
		data: { userId, articleId }
	})

/**
 * 取消点赞文章
 * @param {String} userId 用户ID
 * @param {String} articleId 文章ID
 */
export const dislike = (userId, articleId) =>
	request({
		url: `article/dislike`,
		method: 'POST',
		data: { userId, articleId }
	})
