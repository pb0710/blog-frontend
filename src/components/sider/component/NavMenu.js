import React, { useEffect, useState } from 'react'
import { Menu } from 'sylas-react-ui'
import { matchPath, NavLink, useLocation } from 'react-router-dom'
import style from '../style/index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import getNavs from '../navs'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from '@/utils/hooks'
import { updateDrawer } from '../store/action'

/**
 * @param {{
 * 	id: number,
 *	level: number,
 *	to: string,
 *	title: string,
 *	icon: JSX.Element
 * }} props
 * @returns
 */
function InternalNav(props) {
	const { id, level, to, title, icon } = props
	const dispatch = useDispatch()
	const isMobile = useMediaQuery('(max-width:600px)')
	const hide = () => {
		dispatch(updateDrawer(false))
	}
	return (
		<NavLink to={to} onClick={isMobile ? hide : null}>
			<Menu.Item menuKey={id} className={style[`level${level}`]}>
				{icon && React.cloneElement(icon, { className: style.icon })}
				{title}
			</Menu.Item>
		</NavLink>
	)
}

const Nav = React.memo(InternalNav)

function NavMenu() {
	const theme = useSelector(state => state.setting.theme)
	const { pathname } = useLocation()
	const { t } = useTranslation()
	const [currentKey, setCurrentKey] = useState('')

	useEffect(() => {
		function selectMenu(nav) {
			const match = matchPath(pathname, {
				path: nav.to,
				exact: false
			})
			match && setCurrentKey(nav.id)
		}
		getNavs(t).forEach(nav => {
			nav.child
				? nav.child.forEach(subNav => {
						const to = nav.to + subNav.to
						selectMenu({ ...subNav, to })
				  })
				: selectMenu(nav)
		})
	}, [pathname, t])

	return (
		<Menu className={style.menu} openKey={currentKey} color={theme}>
			{getNavs(t).map(nav =>
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
							child = { ...child, to: `${nav.to}${child.to}` }
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

export default NavMenu
