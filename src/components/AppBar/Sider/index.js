import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'
import { IconButton, Paper, Divider } from 'ui'
import { ArrowLeftIcon } from 'ui/utils/icons'
import NavMenu from './NavMenu'

const useStyles = makeStyles({
	root: ({ drawerOpened }) => ({
		width: 240,
		height: '100vh',
		position: 'fixed',
		left: 0,
		transform: `translateX(${drawerOpened ? 0 : -240}px)`,
		transition: 'transform 250ms ease-out',
		overflowY: 'auto',
		zIndex: 888,
	}),
	divider: {
		marginTop: 48,
	},
	hideIcon: {
		position: 'absolute',
		right: 8,
		top: 4,
		fontSize: 15,
	},
})

export default function Sider(props) {

	const {
		drawerOpened = false,
		setDrawerOpened = () => { }
	} = props

	const classes = useStyles({ drawerOpened })

	const handleHideDrawer = useCallback(
		() => {
			setDrawerOpened(false)
		},
		[setDrawerOpened]
	)

	return (
		<Paper className={classes.root}>
			{
				drawerOpened &&
				<IconButton className={classes.hideIcon} onClick={handleHideDrawer}>
					<ArrowLeftIcon />
				</IconButton>
			}
			<Divider className={classes.divider} />
			<NavMenu />
		</Paper >
	)
}