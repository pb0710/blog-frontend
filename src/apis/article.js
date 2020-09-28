import request from '@/utils/request'

/**
 * 抓取文章列表
 * @param {string} sort 文章分类 不传时获取全部
 */
export const fetchList = sort =>
  request({
    url: `article/list`,
    params: { sort }
  })

/**
 * 抓取文章详情
 * @param {string} articleId 文章ID
 */
export const fetchDetail = articleId =>
  request({
    url: `article/detail`,
    params: { articleId }
  })

/**
 * 添加文章
 * @param {object} opt
 * 	@param {string} userId 用户ID
 * 	@param {string} articleDetail 文章详情
 */
export const addArticle = ({ userId, articleDetail = {} }) =>
  request({
    url: `article/add`,
    method: 'POST',
    data: { userId, articleDetail }
  })
