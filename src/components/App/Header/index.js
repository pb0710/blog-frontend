import React, { useCallback, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { Glass, IconButton, Input, Dialog } from 'ui'
import {
	MenuSlimIcon,
	NotifyIcon,
	UserIcon,
	ApplicationIcon
} from 'ui/utils/icons'
import { flexCenter } from 'utils/styles'
import { updateDrawerOpenedAction } from 'store/actions'
import Branch from 'components/Branch'
import UserPopup from './UserPopup'
import NotifyPopup from './NotifyPopup'

const useStyles = makeStyles({
	root: {
		boxSizing: 'border-box',
		...flexCenter,
		position: 'fixed',
		top: 0,
		right: 0,
		width: '100%',
		height: 52,
		padding: '0 8px',
		transition: 'width 250ms ease-out',
		zIndex: 70
	},
	navWrapper: {
		...flexCenter,
		justifyContent: 'space-between'
	},
	search: {
		...flexCenter,
		justifyContent: 'space-between',
		margin: '0 auto',
		position: 'relative'
	},
	searchInput: {
		background: 'rgba(250,250,250,.8)',
		width: 240,
		height: 30
	},
	operationWrapper: {
		...flexCenter,
		justifyContent: 'space-between',
		minWidth: 136
	}
})

export default function Header() {
	const drawerOpened = useSelector((state) => state.drawerOpened)
	const dispatch = useDispatch()
	const classes = useStyles({ drawerOpened })

	const handleShowDrawer = useCallback(() => {
		dispatch(updateDrawerOpenedAction(true))
	}, [])

	return (
		<Glass className={classes.root}>
			<div className={classes.navWrapper}>
				<IconButton onClick={handleShowDrawer}>
					<MenuSlimIcon />
				</IconButton>
				<Branch />
			</div>

			<div className={classes.search}>
				<Input className={classes.searchInput} showSearch={true} />
			</div>

			<div className={classes.operationWrapper}>
				<NotifyPopup />
				<IconButton>
					<ApplicationIcon />
				</IconButton>
				<UserPopup />
			</div>
		</Glass>
	)
}
