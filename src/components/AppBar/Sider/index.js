import React, { Fragment, useCallback, useMemo, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import navMap from 'common/navMap'
import { IconButton, List, ListItem, Paper, Collapse } from 'ui'
import { ArrowLeftIcon, ArrowBoldIcon } from 'ui/utils/icons'
import themeColors from 'ui/utils/themeColors'
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
		cursor: 'pointer',
		userSelect: 'none',
		transition: 'all 250ms',
	},
	navItem: {
		textDecoration: 'none',
		color: '#303133',
		fontWeight: 500,
	},
	navChildWrapper: {
		minHeight: 0,
		transition: 'height 250ms ease-out',
	},
	navSelected: {
		height: 120,
	},
	navChildItem: {
		textDecoration: 'none',
		color: '#303133',
		paddingLeft: 48,
	},
	navChildIcon: {
		...flexCenter,
		justifyContent: 'flex-end',
		height: '100%',
		position: 'absolute',
		right: 16,
		transition: 'transform 250ms ease-out',
	},
	navIconSelected: {
		transform: 'rotate(180deg)',
	},
	navActived: ({ color }) => ({
		textDecoration: 'none',
		color: color.dim,
		fontWeight: 500,
	}),
	navChildActived: ({ color }) => ({
		textDecoration: 'none',
		color: color.dim,
	}),
})

export default function Sider(props) {

	const {
		color = 'primary',
		drawerOpened = false,
		setDrawerOpened = () => { }
	} = props

	const defaultChildShow = useMemo(
		() => {
			let defaultObj = {}
			for (const { id } of navMap) {
				defaultObj[id] = false
			}
			return defaultObj
		},
		[navMap]
	)

	const [childShow, setChildShow] = useState(defaultChildShow)

	const classes = useStyles({
		color: themeColors[color],
		drawerOpened
	})

	const handleHideDrawer = useCallback(
		() => {
			setDrawerOpened(false)
		},
		[setDrawerOpened]
	)

	const handleToggleChild = useCallback(
		id => {
			setChildShow(prev => ({
				...prev,
				[id]: !prev[id]
			}))
		},
		[setChildShow]
	)

	return (
		<Paper className={classes.root}>
			{
				drawerOpened && (
					<IconButton className={classes.hideIcon} onClick={handleHideDrawer}>
						<ArrowLeftIcon />
					</IconButton>
				)
			}

			<List className={classes.navList} bordered={false}>
				{
					navMap.map(({ id, name, path, child }) => (
						<Fragment key={id}>
							<ListItem
								className={classes.navItem}
								activeClassName={classes.navActived}
								to={path}
								bordered={false}
								linked={!child}
								onClick={child ? () => handleToggleChild(id) : null}
							>
								{name}
								{
									child && (
										<i className={clsx(classes.navChildIcon, childShow[id] && classes.navIconSelected)}>
											<ArrowBoldIcon />
										</i>
									)
								}
							</ListItem>
							{
								child && (
									<Collapse
										className={clsx(classes.navChildWrapper)}
										visible={childShow[id]}
										bordered={false}
									>
										{
											child.map(({ id, name, path }) => (
												<ListItem
													key={id}
													className={classes.navChildItem}
													activeClassName={classes.navChildActived}
													to={path}
													bordered={false}
													linked={true}
												>
													{name}
												</ListItem>
											))
										}
									</Collapse>
								)
							}
						</Fragment>
					))
				}
			</List>
		</Paper >
	)
}