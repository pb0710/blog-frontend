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
	const drawerDefaultOpened = useSelector(state => state.setting.drawerDefaultOpened)
	const drawerOpened = useSelector(state => state.sider.drawerOpened)

	const hanldeClose = () => {
		dispatch(action.updateDrawer(false))
	}

	React.useEffect(() => {
		dispatch(action.updateDrawer(drawerDefaultOpened))
	}, [dispatch, drawerDefaultOpened])

	const asideCls = clsx(style.sider, {
		[style.open]: drawerOpened
	})

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
