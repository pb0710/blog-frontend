import React from 'react'
import HomePage from 'pages/HomePage'
import ArticlePage from 'pages/ArticlePage'
import SettingPage from 'pages/SettingPage'
import StudyRoute from 'pages/StudyRoute'
import HTML from 'pages/HTML'
import CSS from 'pages/CSS'
import JS from 'pages/JS'

const navMap = [
	{
		id: 0,
		name: '主页',
		path: '/',
		icon: null,
		component: <HomePage />,
		child: null
	},
	{
		id: 1,
		name: '文章分类',
		path: '/article',
		icon: null,
		component: null,
		child: [
			{
				id: 0,
				name: '前端',
				path: '/frontend',
				icon: null,
				component: <HTML />
			},
			{
				id: 1,
				name: '移动端',
				path: '/mobile',
				icon: null,
				component: <CSS />
			},
			{
				id: 2,
				name: '后端',
				path: '/backend',
				icon: null,
				component: <JS />
			},
			{
				id: 3,
				name: '计算机基础',
				path: '/computer_science',
				icon: null,
				component: <JS />
			},
			{
				id: 4,
				name: '软件工具',
				path: '/tools',
				icon: null,
				component: <CSS />
			}
		]
	},
	{
		id: 2,
		name: '学习路线',
		path: '/js',
		icon: null,
		component: null,
		child: [
			{
				id: 0,
				name: '前端',
				path: '/frontend',
				icon: null,
				component: <HTML />
			},
			{
				id: 1,
				name: '后端',
				path: '/backend',
				icon: null,
				component: <CSS />
			},
			{
				id: 2,
				name: '运维',
				path: '/operations',
				icon: null,
				component: <StudyRoute />
			},
			{
				id: 3,
				name: '测试',
				path: '/tester',
				icon: null,
				component: <JS />
			}
		]
	},
	{
		id: 3,
		name: '文档聚合',
		path: '/comment',
		icon: null,
		component: <ArticlePage />,
		child: null
	},
	{
		id: 4,
		name: '设置',
		path: '/setting',
		icon: null,
		component: <SettingPage />,
		child: null
	}
]

export default navMap
