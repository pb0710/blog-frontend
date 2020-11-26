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
export const increaseArticleViews = articleId =>
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
export const likeArticle = (userId, articleId) =>
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
export const dislikeArticle = (userId, articleId) =>
	request({
		url: `article/dislike`,
		method: 'POST',
		data: { userId, articleId }
	})
