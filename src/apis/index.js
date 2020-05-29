import request from 'utils/request'

export const fetchArticleList = sort =>
	request({
		url: `article/list`,
		params: { sort }
	})

export const fetchArticleContent = articleId =>
	request({
		url: `article/detail`,
		params: { articleId }
	})

export const uploadArticle = ({ username, articleData = {} }) =>
	request({
		url: `article/add`,
		method: 'POST',
		params: { username, articleData }
	})
