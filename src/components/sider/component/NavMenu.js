import React, { useState } from 'react'
import { Menu } from 'sylas-react-ui'
import { matchPath, NavLink, useLocation } from 'react-router-dom'
import style from '../style/index.module.scss'
import HomeIcon from 'mdi-react/HomeIcon'
import LibraryEditIcon from 'mdi-react/LibraryEditIcon'
import ExploreIcon from 'mdi-react/ExploreIcon'
import CreateIcon from 'mdi-react/CreateIcon'
import SettingsIcon from 'mdi-react/SettingsIcon'
import InfoCircleIcon from 'mdi-react/InfoCircleIcon'
import { useSelector } from 'react-redux'

const navs = [
	{
		id: '0',
		level: 1,
		to: '/',
		title: '主页',
		icon: <HomeIcon size={20} />
	},
	{
		id: '1',
		level: 1,
		to: '/articles',
		title: '文章分类',
		icon: <LibraryEditIcon size={20} />,
		child: [
			{
				id: '10',
				level: 2,
				to: '/frontend',
				title: 'Web前端'
			},
			{
				id: '11',
				level: 2,
				to: '/mobile',
				title: '移动端'
			},
			{
				id: '12',
				level: 2,
				to: '/backend',
				title: '后端'
			},
			{
				id: '13',
				level: 2,
				to: '/computer_science',
				title: '计算机通用'
			},
			{
				id: '14',
				level: 2,
				to: '/engineering',
				title: '工程化'
			}
		]
	},
	{
		id: '2',
		level: 1,
		title: '文档',
		icon: <ExploreIcon size={20} />,
		child: [
			{
				id: '30',
				level: 2,
				to: '/submenu0',
				title: '子菜单0'
			},
			{
				id: '31',
				level: 2,
				to: '/submenu1',
				title: '子菜单1'
			}
		]
	},
	{
		id: '3',
		level: 1,
		to: '/upload',
		title: '写文章',
		icon: <CreateIcon size={20} />
	},
	{
		id: '4',
		level: 1,
		to: '/setting',
		title: '设置',
		icon: <SettingsIcon size={20} />
	},
	{
		id: '5',
		level: 1,
		to: '/about',
		title: '关于',
		icon: <InfoCircleIcon size={20} />
	}
]

function Nav(props) {
	const { id, level, to, title, icon } = props
	return (
		<NavLink to={to}>
			<Menu.Item menuKey={id} className={style[`level${level}`]}>
				{icon && React.cloneElement(icon, { className: style.icon })}
				{title}
			</Menu.Item>
		</NavLink>
	)
}

function NavMenu() {
	const theme = useSelector(state => state.setting.theme)
	const { pathname } = useLocation()
	const [currentKey, setCurrentKey] = useState('')

	React.useEffect(() => {
		function selectMenu(nav) {
			const match = matchPath(pathname, {
				path: nav.to,
				exact: true
			})
			match && setCurrentKey(nav.id)
		}
		navs.forEach(nav => {
			nav.child
				? nav.child.forEach(subNav => {
						const to = nav.to + subNav.to
						selectMenu({ ...subNav, to })
				  })
				: selectMenu(nav)
		})
	}, [pathname])

	return (
		<Menu className={style.menu} openKey={currentKey} color={theme}>
			{navs.map(nav =>
				nav.child ? (
					<Menu.Sub
						key={nav.id}
						bordered={false}
						menuKey={nav.id}
						className={style.level1}
						title={
							<>
								{nav.icon && React.cloneElement(nav.icon, { className: style.icon })}
								{nav.title}
							</>
						}
					>
						{nav.child.map(child => {
							child = { ...child, to: nav.to + child.to }
							return <Nav key={child.id} {...child} />
						})}
					</Menu.Sub>
				) : (
					<Nav key={nav.id} {...nav} />
				)
			)}
		</Menu>
	)
}

export default React.memo(NavMenu)
