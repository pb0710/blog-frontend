import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'sylas-react-ui'
import ArrowBackIcon from 'mdi-react/ArrowBackIcon'
import style from '../style/index.module.scss'
import { updateDrawer } from '@/components/sider/store/action'
import clsx from 'clsx'
import NavMenu from './NavMenu'
import { Branch } from '@/components/header'
import { Mask } from '@/components/base'
import { useMediaQuery } from '@/utils/hooks'
import { stringToBoolean } from '@/utils'

export default function Sider() {
	const dispatch = useDispatch()
	const drawerOpened = useSelector(state => state.sider.drawerOpened)
	const isMobile = useMediaQuery('(max-width:600px)')

	const hanldeClose = () => {
		dispatch(updateDrawer(false))
		localStorage.setItem('drawerOpened', false)
	}

	useEffect(() => {
		dispatch(updateDrawer(stringToBoolean(localStorage.getItem('drawerOpened'))))
	}, [dispatch])

	const asideCls = clsx(style.sider, {
		[style.open]: drawerOpened
	})

	return (
		<>
			{isMobile && drawerOpened && <Mask style={{ zIndex: 250 }} onClick={hanldeClose} />}
			<aside className={asideCls}>
				<div className={style.top}>
					<Branch />
					<Button.Icon className={style.drawer_control} onClick={hanldeClose}>
						<ArrowBackIcon size={20} />
					</Button.Icon>
				</div>
				<NavMenu />
			</aside>
		</>
	)
}
