import React from 'react'
import { Menu } from 'sylas-react-ui'
import { matchPath, NavLink, useLocation } from 'react-router-dom'
import style from '../style/index.module.scss'
import { Home, LibraryBooks, Create, Settings, Explore } from '@material-ui/icons'

function Nav(props) {
	const { id, level, to, title, icon } = props
	return (
		<NavLink to={to}>
			<Menu.Item id={id} className={style[`level${level}`]}>
				{icon && <span className={style.icon}>{icon}</span>}
				{title}
			</Menu.Item>
		</NavLink>
	)
}

export default function NavMenu() {
	const menu = Menu.useMenu()
	const { pathname } = useLocation()

	const navs = [
		{
			id: '0',
			level: 1,
			to: '/',
			title: '主页',
			icon: <Home />
		},
		{
			id: '1',
			level: 1,
			to: '/articles',
			title: '文章',
			icon: <LibraryBooks />,
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
			to: '/upload',
			title: '发布',
			icon: <Create />
		},
		{
			id: '3',
			level: 1,
			title: '文档聚合',
			icon: <Explore />,
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
			id: '4',
			level: 1,
			to: '/options',
			title: '设置',
			icon: <Settings />
		}
	]

	React.useEffect(() => {
		function selectMenu(nav) {
			const match = matchPath(pathname, {
				path: nav.to,
				exact: true
			})
			match && menu.setCurrentKey(nav.id)
		}
		navs.forEach(nav => {
			nav.child
				? nav.child.forEach(subNav => {
						const to = nav.to + subNav.to
						selectMenu({ ...subNav, to })
				  })
				: selectMenu(nav)
		})
		// FIXME: navs and menu cannot in deps
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname])

	return (
		<Menu className={style.menu} menu={menu}>
			{navs.map(nav =>
				nav.child ? (
					<Menu.SubMenu
						key={nav.id}
						className={style.level1}
						title={
							<>
								{nav.icon && <span className={style.icon}>{nav.icon}</span>}
								{nav.title}
							</>
						}
						opened
					>
						{nav.child.map(child => {
							child = { ...child, to: nav.to + child.to }
							return <Nav key={child.id} {...child} />
						})}
					</Menu.SubMenu>
				) : (
					<Nav key={nav.id} {...nav} />
				)
			)}
		</Menu>
	)
}
