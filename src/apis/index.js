import request from 'utils/request'

export const fetchArticleList = sort =>
	request({
		url: `api/articleList`,
		params: { sort }
	})

export const fetchArticleContent = articleId =>
	request({
		url: `api/articleContent`,
		params: { articleId }
	})
