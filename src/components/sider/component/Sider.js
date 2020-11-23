import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'sylas-react-ui'
import ArrowBackIcon from 'mdi-react/ArrowBackIcon'
import style from '../style/index.module.scss'
import * as action from '@/components/sider/store/action'
import clsx from 'clsx'
import NavMenu from './NavMenu'
import { Branch } from '@/components/header'

export default function Sider() {
	const dispatch = useDispatch()
	const opened = useSelector(state => state.sider.drawerOpened)
	const defaultClosed = useSelector(state => state.setting.drawerDefaultOpened)

	const hanldeClose = () => {
		dispatch(action.updateDrawer(false))
	}

	React.useEffect(() => {
		dispatch(action.updateDrawer(!defaultClosed))
	}, [dispatch, defaultClosed])

	const asideCls = clsx(style.sider, opened && style.in)

	return (
		<aside className={asideCls}>
			<div className={style.top}>
				<Branch />
				<Button.Icon className={style.drawer_control} onClick={hanldeClose}>
					<ArrowBackIcon size={20} />
				</Button.Icon>
			</div>
			<NavMenu />
		</aside>
	)
}
