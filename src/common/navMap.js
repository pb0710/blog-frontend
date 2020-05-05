import React from 'react'
import { HomeIcon, ReadIcon, SettingIcon } from 'ui/utils/icons'
import Home from 'pages/Home'
import Article from 'pages/Article'
import Setting from 'pages/Home'
import JS from 'pages/JS'

const navMap = [
	{
		id: 0,
		name: '主页',
		path: '/home',
		icon: <HomeIcon />,
		component: <Home />
	},
	{
		id: 1,
		name: '文章',
		path: '/article',
		icon: <ReadIcon />,
		component: <Article />
	},
	{
		id: 2,
		name: '设置',
		path: '/setting',
		icon: <SettingIcon />,
		component: <Setting />
	},
	{
		id: 3,
		name: 'JavaScript',
		path: '/js',
		icon: <HomeIcon />,
		component: <JS />
	},
]

export default navMap