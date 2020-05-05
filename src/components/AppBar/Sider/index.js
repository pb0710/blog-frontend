import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Paper, IconButton, List, ListItem } from 'ui'
import themeColors from 'ui/utils/themeColors'
import { ArrowLeftIcon } from 'ui/utils/icons'
import navMap from 'common/navMap'
import { flexCenter } from 'utils/styles'

const useStyles = makeStyles({
	root: ({ drawerOpened }) => ({
		width: 240,
		height: '100vh',
		position: 'fixed',
		left: 0,
		transform: `translateX(${drawerOpened ? 0 : -240}px)`,
		transition: 'transform 250ms ease-out',
		zIndex: 888,
	}),
	hideIcon: {
		position: 'absolute',
		right: 8,
		top: 4,
		fontSize: 15,
	},
	navList: {
		marginTop: 48,
	},
	navItem: {
		textDecoration: 'none',
		fontWeight: 500,
		color: '#303133',
	},
	navIcon: {
		...flexCenter,
		justifyContent: 'start',
		width: 40,
		height: '100%',
		fontSize: 16,
	},
	actived: ({ color }) => ({
		textDecoration: 'none',
		fontWeight: 500,
		color: color.dim,
	})
})

export default function Sider(props) {

	const {
		drawerOpened = false,
		setDrawerOpened = () => { }
	} = props

	const color = 'primary'

	const classes = useStyles({
		color: themeColors[color],
		drawerOpened
	})

	const handleHideDrawer = useCallback(
		() => {
			setDrawerOpened(false)
		},
		[]
	)

	return (
		<Paper className={classes.root}>
			{
				drawerOpened
					? (
						<IconButton className={classes.hideIcon} onClick={handleHideDrawer}>
							<ArrowLeftIcon />
						</IconButton>
					)
					: null
			}

			<List className={classes.navList} bordered={false}>
				{
					navMap.map(({ id, name, path, icon }) => (
						<ListItem
							key={id}
							className={classes.navItem}
							activeClassName={classes.actived}
							to={path}
							bordered={false}
						>
							<i className={classes.navIcon}>{icon}</i>
							{name}
						</ListItem>
					))
				}
			</List>
		</Paper>
	)
}