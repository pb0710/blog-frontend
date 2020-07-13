import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Button } from 'sylas-react-ui'
import { MenuSlimIcon } from 'ui/utils/icons'
import { flexCenter } from 'utils/styles'
import { updateDrawerOpenedAction } from 'store/actions'
import Branch from 'components/Branch'
import Search from './Search'
import UserPopup from './UserPopup'
import AppsPopup from './AppsPopup'
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
		padding: '0 16px',
		borderRadius: 0,
		boxShadow: '0 1px 2px rgba(26,26,26,.1)',
		transition: 'width 250ms ease-out',
		zIndex: 70
	},
	navWrapper: {
		...flexCenter,
		justifyContent: 'space-between'
	},
	operationWrapper: {
		...flexCenter,
		justifyContent: 'space-between',
		minWidth: 136
	}
})

export default function Header() {
	const drawerOpened = useSelector(state => state.drawerOpened)
	const dispatch = useDispatch()
	const classes = useStyles({ drawerOpened })

	const handleShowDrawer = useCallback(() => {
		dispatch(updateDrawerOpenedAction(true))
	}, [])

	return (
		<Paper className={classes.root}>
			<div className={classes.navWrapper}>
				<Button.Icon onClick={handleShowDrawer}>
					<MenuSlimIcon />
				</Button.Icon>
				<Branch />
			</div>

			<Search />

			<div className={classes.operationWrapper}>
				<NotifyPopup />
				<AppsPopup />
				<UserPopup />
			</div>
		</Paper>
	)
}
