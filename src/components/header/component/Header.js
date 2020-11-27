import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'sylas-react-ui'
import style from '../style/index.module.scss'
import * as commonAction from '@/store/actions'
import * as action from '@/components/sider/store/action'
import * as modalAction from '@/components/modal/store/action'
import AppCenter from './AppCenter'
import Search from './Search'
import UserProfile from './UserProfile'
import { Login } from '@/components/modal'
import MenuIcon from 'mdi-react/MenuIcon'
import Branch from './Branch'
import { useTranslation } from 'react-i18next'

export default function Header() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const online = useSelector(state => state.online)
	const theme = useSelector(state => state.setting.theme)

	const handleToggleDrawer = () => {
		dispatch(action.updateDrawer(true))
	}

	const handleGoLogin = () => {
		dispatch(modalAction.updateModal(true, <Login />))
	}

	React.useEffect(() => {
		dispatch(commonAction.initUser())
	}, [dispatch])

	return (
		<header className={style.header}>
			<Button.Icon className={style.drawer_control} onClick={handleToggleDrawer}>
				<MenuIcon size={20} />
			</Button.Icon>
			<Branch />
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
		</header>
	)
}
