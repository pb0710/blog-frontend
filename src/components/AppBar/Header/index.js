import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Glass, IconButton, Input } from 'ui'
import { MenuIcon, NotifyIcon, UserIcon, ApplicationIcon, SearchIcon } from 'ui/utils/icons'
import { flexCenter } from 'utils/styles'

const useStyles = makeStyles({
	root: ({ drawerOpened }) => ({
		display: 'flex',
		alignItems: 'center',
		width: drawerOpened ? 'calc(100% - 240px)' : '100%',
		height: 48,
		position: 'fixed',
		top: 0,
		right: 0,
		transition: 'width 250ms ease-out',
		zIndex: 777,
	}),
	navWrapper: {
		...flexCenter,
		justifyContent: 'space-between',
		position: 'absolute',
		left: 8,
		minWidth: 112,
	},
	branch: {
		paddingLeft: 16,
		fontSize: 23,
		fontWeight: 600,
		color: '#409eff',
		cursor: 'pointer',
		userSelect: 'none',
	},
	search: {
		...flexCenter,
		justifyContent: 'space-between',
		margin: '0 auto',
		position: 'relative',
	},
	searchInput: {
		background: 'rgba(250,250,250,.8)',
		width: 240,
	},
	operationWrapper: {
		...flexCenter,
		justifyContent: 'space-between',
		position: 'absolute',
		right: 8,
		minWidth: 136,
	}
})

export default function Header(props) {

	const {
		drawerOpened = false,
		setDrawerOpened = () => { }
	} = props

	const classes = useStyles({ drawerOpened })

	const handleShowDrawer = useCallback(
		() => {
			setDrawerOpened(true)
		},
		[]
	)

	return (
		<Glass className={classes.root}>
			<div className={classes.navWrapper}>
				{
					drawerOpened ? null : (
						<IconButton onClick={handleShowDrawer}>
							<MenuIcon />
						</IconButton>
					)
				}
				<span className={classes.branch}>
					Blog
			</span>
			</div>

			<div className={classes.search}>
				<Input className={classes.searchInput} showSearch={true} />
			</div>

			<div className={classes.operationWrapper}>
				<IconButton>
					<NotifyIcon />
				</IconButton>
				<IconButton>
					<ApplicationIcon />
				</IconButton>
				<IconButton>
					<UserIcon />
				</IconButton>
			</div>
		</Glass>
	)
}