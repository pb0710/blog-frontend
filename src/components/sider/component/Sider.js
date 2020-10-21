import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'sylas-react-ui'
import { ArrowBackOutlined } from '@material-ui/icons'
import style from '../style/index.module.scss'
import * as action from '@/components/sider/store/action'
import clsx from 'clsx'
import NavMenu from './NavMenu'

export default function Sider() {
	const dispatch = useDispatch()
	const { drawerOpened } = useSelector(state => state.sider)

	const hanldeCloseDrawer = () => {
		dispatch(action.updateDrawer(false))
	}

	const asideCls = clsx([style.sider, drawerOpened && style.in])

	return (
		<aside className={asideCls}>
			<div className={style.top}>
				<Button.Icon className={style.drawerControl} onClick={hanldeCloseDrawer}>
					<ArrowBackOutlined />
				</Button.Icon>
			</div>
			<NavMenu />
		</aside>
	)
}
