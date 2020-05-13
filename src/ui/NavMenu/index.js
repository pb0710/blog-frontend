import React, { Fragment, useCallback, useMemo, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import Collapse from '../Collapse'
import List from '../List'
import ListItem from '../ListItem'
import { ArrowDownBoldIcon } from '../utils/icons'
import themeColors from '../utils/themeColors'

const useStyles = makeStyles({
	root: {
		cursor: 'pointer',
		userSelect: 'none',
		transition: 'all 250ms',
	},
	navItem: {
		textDecoration: 'none',
		color: '#303133',
		fontWeight: 500,
		'&>svg': {
			marginRight: 24,
			fontSize: 16,
		}
	},
	childWrapper: {
		minHeight: 0,
		transition: 'height 250ms ease-out',
	},
	childNavItem: ({ paddingLeft }) => ({
		textDecoration: 'none',
		color: '#303133',
		paddingLeft,
		'&>svg': {
			marginRight: 24,
			fontSize: 16,
		}
	}),
	arrowIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		height: '100%',
		position: 'absolute',
		top: 0,
		right: 16,
		transition: 'transform 250ms ease-out',
	},
	arrowIconSelected: {
		transform: 'rotate(180deg)',
	},
	navItemActived: ({ color }) => ({
		textDecoration: 'none',
		color: color.main,
		fontWeight: 500,
	}),
	childNavItemActived: ({ color }) => ({
		textDecoration: 'none',
		color: color.main,
	}),
})

export default function NavMenu(props) {

	const {
		color = 'primary',
		menuOptions = [],
		paddingLeft = 44
	} = props

	const defaultChildOpenStatus = useMemo(
		() => {
			let defaultObj = {}
			menuOptions.forEach(({ id }) => {
				defaultObj[id] = false
			})
			return defaultObj
		},
		[menuOptions]
	)

	const [childOpenStatus, setChildOpenStatus] = useState(defaultChildOpenStatus)

	const classes = useStyles({
		paddingLeft,
		color: themeColors[color]
	})

	const handleToggleChildOpen = useCallback(
		id => {
			setChildOpenStatus(prev => ({
				...prev,
				[id]: !prev[id]
			}))
		},
		[setChildOpenStatus]
	)

	return (
		<List className={classes.root} bordered={false}>
			{
				menuOptions.map(({ id, name, path, child, icon }) => {
					const opened = childOpenStatus[id]

					return (
						<Fragment key={id}>
							<ListItem
								className={classes.navItem}
								activeClassName={classes.navItemActived}
								bordered={false}
								to={path}
								linked={!child}
								onClick={child ? () => handleToggleChildOpen(id) : null}
							>
								{icon}
								<span>{name}</span>
								{
									child &&
									<i className={clsx(classes.arrowIcon, opened && classes.arrowIconSelected)}>
										<ArrowDownBoldIcon />
									</i>
								}
							</ListItem>
							{
								child &&
								<Collapse
									className={classes.childWrapper}
									visible={opened}
									bordered={false}
								>
									{
										child.map(({ id, name, path: childPath, icon }) => (
											<ListItem
												key={id}
												className={classes.childNavItem}
												activeClassName={classes.childNavItemActived}
												to={path + childPath}
												bordered={false}
												linked={true}
											>
												{icon}
												<span>{name}</span>
											</ListItem>
										))
									}
								</Collapse>
							}
						</Fragment>
					)
				})
			}
		</List>
	)
}