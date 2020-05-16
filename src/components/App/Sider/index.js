import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton, Paper, NavMenu } from 'ui'
import { ArrowLeftBoldIcon } from 'ui/utils/icons'
import navMap from 'common/navMap'
import { updateDrawerOpenedAction } from 'store/actions'
import Branch from 'components/Branch'

const useStyles = makeStyles({
	root: ({ drawerOpened }) => ({
		display: 'flex',
		flexDirection: 'column',
		boxSizing: 'border-box',
		width: 240,
		height: '100%',
		position: 'fixed',
		top: 0,
		left: 0,
		paddingTop: 52,
		borderRight: '1px solid #eaeaea',
		boxShadow: 'none',
		transform: `translateX(${drawerOpened ? 0 : -240}px)`,
		transition: 'transform 200ms ease-out',
		overflowX: 'hidden',
		overflowY: 'hidden',
		zIndex: 88
	}),
	topbar: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row-reverse',
		width: '100%',
		height: 52,
		borderBottom: '1px solid #eaeaea',
		position: 'fixed',
		top: 0,
		right: 0
	},
	closeDrawerIcon: {
		position: 'absolute',
		left: 8,
		top: 6,
		fontSize: 15
	}
})

export default function Sider() {
	const dispatch = useDispatch()
	const drawerOpened = useSelector(state => state.drawerOpened)
	const classes = useStyles({ drawerOpened })

	const handleHideDrawer = useCallback(() => {
		dispatch(updateDrawerOpenedAction(false))
	}, [])

	return (
		<Paper className={classes.root}>
			<div className={classes.topbar}>
				<IconButton className={classes.closeDrawerIcon} onClick={handleHideDrawer}>
					<ArrowLeftBoldIcon />
				</IconButton>
				<Branch />
			</div>
			<NavMenu menuOptions={navMap} />
		</Paper>
	)
}
