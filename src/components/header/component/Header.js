import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'sylas-react-ui'
import style from '../style/index.module.scss'
import * as commonAction from '@/store/actions'
import * as action from '@/components/sider/store/action'
import * as modalAction from '@/components/global/store/action'
import AppCenter from './AppCenter'
import Search from './Search'
import Notification from './Notification'
import UserProfile from './UserProfile'
import { Login } from '@/components/global'
import { MenuOutlined } from '@material-ui/icons'
import Branch from './Branch'

export default function Header() {
	const dispatch = useDispatch()
	const { online } = useSelector(state => state)

	const handleToggleDrawer = () => {
		dispatch(action.updateDrawer(true))
	}

	const handleGoLogin = () => {
		dispatch(modalAction.updateModalContent(<Login />))
		dispatch(modalAction.updateModalVisible(true))
	}

	React.useEffect(() => {
		dispatch(commonAction.initUser())
	}, [dispatch])

	return (
		<header className={style.header}>
			<Button.Icon className={style.drawer_control} onClick={handleToggleDrawer}>
				<MenuOutlined />
			</Button.Icon>
			<Branch />
			<div className={style.tool_bar}>
				<Search />
				<Notification />
				<AppCenter />
				{online ? (
					<UserProfile />
				) : (
					<Button className={style.go_login} color="primary" onClick={handleGoLogin}>
						登录
					</Button>
				)}
			</div>
		</header>
	)
}
