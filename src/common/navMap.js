import React from 'react'
import HomePage from 'pages/HomePage'
import ArticleListPage from 'pages/ArticleListPage'
import ArticlePage from 'pages/ArticlePage'
import SettingPage from 'pages/SettingPage'

const navMap = [
	{
		id: 0,
		name: '主页',
		path: '/',
		icon: null,
		component: <HomePage />,
		childs: null
	},
	{
		id: 1,
		name: '文章分类',
		path: '/article',
		icon: null,
		component: null,
		childs: [
			{
				id: 0,
				name: '全部',
				path: '/all',
				icon: null,
				component: <ArticleListPage />
			},
			{
				id: 1,
				name: '前端',
				path: '/frontend',
				icon: null,
				component: <ArticleListPage sort="frontend" />
			},
			{
				id: 2,
				name: '移动端',
				path: '/mobile',
				icon: null,
				component: <ArticleListPage sort="mobile" />
			},
			{
				id: 3,
				name: '后端',
				path: '/backend',
				icon: null,
				component: <ArticleListPage sort="backend" />
			},
			{
				id: 4,
				name: '计算机通用',
				path: '/computer_science',
				icon: null,
				component: <ArticleListPage sort="computer_science" />
			},
			{
				id: 5,
				name: '工程化',
				path: '/engineering',
				icon: null,
				component: <ArticleListPage sort="engineering" />
			}
		]
	},
	{
		id: 2,
		name: '文档聚合',
		path: '/document',
		icon: null,
		component: <ArticlePage />,
		childs: null
	},
	{
		id: 3,
		name: '设置',
		path: '/setting',
		icon: null,
		component: <SettingPage />,
		childs: null
	}
]

export default navMap
