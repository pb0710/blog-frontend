import React from 'react'
import { HomeIcon, ReadIcon, ControlIcon, BranchIcon } from 'ui/utils/icons'
import Home from 'pages/Home'
import Article from 'pages/Article'
import Setting from 'pages/Home'
import StudyRoute from 'pages/StudyRoute'
import HTML from 'pages/HTML'
import CSS from 'pages/CSS'
import JS from 'pages/JS'

const navMap = [
	{
		id: 0,
		name: '主页',
		path: '/home',
		icon: <HomeIcon />,
		component: <Home />,
		child: null,
	},
	{
		id: 1,
		name: '文章',
		path: '/article',
		icon: <ReadIcon />,
		component: <Article />,
		child: [
			{
				id: 0,
				name: 'HTML5',
				path: '/html',
				icon: null,
				component: <HTML />,
			},
			{
				id: 1,
				name: 'CSS3',
				path: '/css',
				icon: null,
				component: <CSS />,
			},
			{
				id: 2,
				name: 'ECMAScript',
				path: '/es6',
				icon: null,
				component: <JS />,
			},
		]
	},
	{
		id: 2,
		name: '学习路线',
		path: '/js',
		icon: <BranchIcon />,
		component: <StudyRoute />,
		child: null,
	},
	{
		id: 3,
		name: '设置',
		path: '/setting',
		icon: <ControlIcon />,
		component: <Setting />,
		child: null,
	},
]

export default navMap