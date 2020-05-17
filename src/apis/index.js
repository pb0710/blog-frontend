import request from 'utils/request'

export const fetchArticleList = () =>
	request({
		url: `api/articleList`
	})

export const fetchArticleContent = articleId =>
	request({
		url: `api/articleContent`,
		params: { articleId }
	})
