import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton, Paper, Divider, NavMenu } from 'ui'
import { ArrowLeftIcon } from 'ui/utils/icons'
import navMap from 'common/navMap'
import { updateDrawerOpenedAction } from 'store/actions'

const useStyles = makeStyles({
	root: {
		width: '100%',
		height: '100%',
	},
	divider: {
		marginTop: 52,
	},
	hideIcon: {
		position: 'absolute',
		right: 8,
		top: 6,
		fontSize: 15,
	},
})

export default function Sider(props) {

	const {

	} = props

	const drawerOpened = useSelector(state => state.drawerOpened)
	const dispatch = useDispatch()
	const classes = useStyles()

	const handleHideDrawer = useCallback(
		() => {
			dispatch(updateDrawerOpenedAction(false))
		},
		[]
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
			<NavMenu menuOptions={navMap} />
		</Paper >
	)
}