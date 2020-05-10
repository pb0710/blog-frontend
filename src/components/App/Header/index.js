import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { Glass, IconButton, Input } from 'ui'
import { MenuSlimIcon, NotifyIcon, UserIcon, ApplicationIcon } from 'ui/utils/icons'
import { flexCenter } from 'utils/styles'
import { updateDrawerOpenedAction } from 'store/actions'

const useStyles = makeStyles({
	root: {
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		height: '100%',
	},
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
		height: 30,
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

	} = props

	const drawerOpened = useSelector(state => state.drawerOpened)
	const dispatch = useDispatch()
	const classes = useStyles()

	const handleShowDrawer = useCallback(
		() => {
			dispatch(updateDrawerOpenedAction(true))
		},
		[]
	)

	return (
		<Glass className={classes.root}>
			<div className={classes.navWrapper}>
				{
					drawerOpened ||
					<IconButton onClick={handleShowDrawer}>
						<MenuSlimIcon />
					</IconButton>
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