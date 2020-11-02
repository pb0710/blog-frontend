import React from 'react'
import { Menu } from 'sylas-react-ui'
import { matchPath, NavLink, useLocation } from 'react-router-dom'
import style from '../style/index.module.scss'
import { Home, LibraryBooks, Create, Settings, Explore, Info } from '@material-ui/icons'
import { useSelector } from 'react-redux'

function Nav(props) {
	const { id, level, to, title, icon } = props
	const theme = useSelector(state => state.setting.theme)
	return (
		<NavLink to={to}>
			<Menu.Item id={id} color={theme} className={style[`level${level}`]}>
				{icon && React.cloneElement(icon, { className: style.icon })}
				{title}
			</Menu.Item>
		</NavLink>
	)
}

function NavMenu() {
	const opened = useSelector(state => state.setting.menuDefaultExpansion)
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
			title: '文章分类',
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
			title: '文档',
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
			id: '3',
			level: 1,
			to: '/upload',
			title: '写文章',
			icon: <Create />
		},
		{
			id: '4',
			level: 1,
			to: '/setting',
			title: '设置',
			icon: <Settings />
		},
		{
			id: '5',
			level: 1,
			to: '/about',
			title: '关于',
			icon: <Info />
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
						opened={opened}
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
					</Menu.SubMenu>
				) : (
					<Nav key={nav.id} {...nav} />
				)
			)}
		</Menu>
	)
}

export default React.memo(NavMenu)
