import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'sylas-react-ui'
import style from '../style/index.module.scss'
import { initUser } from '@/store/actions'
import { updateDrawer } from '@/components/sider/store/action'
import { updateModal } from '@/components/modal/store/action'
import AppCenter from './AppCenter'
import Search from './Search'
import UserProfile from './UserProfile'
import { Login } from '@/components/modal'
import MenuIcon from 'mdi-react/MenuIcon'
import Branch from './Branch'
import Title from './Titile'
import { useTranslation } from 'react-i18next'

export default function Header() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const online = useSelector(state => state.online)
	const theme = useSelector(state => state.setting.theme)

	const handleToggleDrawer = () => {
		dispatch(updateDrawer(true))
	}

	const handleGoLogin = () => {
		dispatch(updateModal(true, <Login />))
	}

	useEffect(() => {
		dispatch(initUser())
	}, [dispatch])

	const toolbarElement = (
		<div className={style.tool_bar}>
			<Search />
			<AppCenter />
			{online ? (
				<UserProfile />
			) : (
				<Button className={style.go_login} color={theme} onClick={handleGoLogin}>
					{t('header.login')}
				</Button>
			)}
		</div>
	)

	return (
		<header className={style.header}>
			<Button.Icon className={style.drawer_control} onClick={handleToggleDrawer}>
				<MenuIcon size={20} />
			</Button.Icon>
			<Branch />
			<Title />
			{toolbarElement}
		</header>
	)
}
