import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import Collapse from '../Collapse'
import List from '../List'
import ListItem from '../ListItem'
import { ArrowDownBoldIcon } from '../utils/icons'
import themeColors from '../utils/themeColors'

const useStyles = makeStyles({
	root: {
		overflowY: 'auto',
		cursor: 'pointer',
		userSelect: 'none',
		transition: 'all 250ms'
	},
	navItem: {
		fontWeight: 500,
		'&>svg': {
			marginRight: 24,
			fontSize: 16
		}
	},
	childWrapper: {
		minHeight: 0,
		transition: 'height 250ms ease-out'
	},
	childNavItem: ({ paddingLeft }) => ({
		textDecoration: 'none',
		color: '#303133',
		paddingLeft,
		'&>svg': {
			marginRight: 24,
			fontSize: 16
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
		transition: 'transform 250ms ease-out'
	},
	arrowIconSelected: {
		transform: 'rotate(180deg)'
	},
	navItemActived: ({ color }) => ({
		textDecoration: 'none',
		color: color.main,
		fontWeight: 500
	}),
	childNavItemActived: ({ color }) => ({
		textDecoration: 'none',
		color: color.main
	})
})

export default function NavMenu(props) {
	const { color = 'primary', menuOptions = [], paddingLeft = 44 } = props

	const defaultChildOpenStatus = React.useMemo(() => {
		let defaultObj = {}
		menuOptions.forEach(({ id }) => {
			defaultObj[id] = false
		})
		return defaultObj
	}, [menuOptions])

	const [childOpenStatus, setChildOpenStatus] = React.useState(defaultChildOpenStatus)

	const classes = useStyles({
		paddingLeft,
		color: themeColors[color]
	})

	const handleToggleChildOpen = React.useCallback(
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
			{menuOptions.map(({ id, name, path, childs, icon }) => {
				const opened = childOpenStatus[id]

				return (
					<React.Fragment key={id}>
						<ListItem
							className={classes.navItem}
							activeClassName={classes.navItemActived}
							bordered={false}
							to={path}
							linked={!childs}
							onClick={childs ? () => handleToggleChildOpen(id) : null}
						>
							{icon}
							<span>{name}</span>
							{childs && (
								<i className={clsx(classes.arrowIcon, opened && classes.arrowIconSelected)}>
									<ArrowDownBoldIcon />
								</i>
							)}
						</ListItem>
						{childs && (
							<Collapse className={classes.childWrapper} visible={opened} bordered={false}>
								{childs.map(({ id, name, path: childPath, icon }) => (
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
								))}
							</Collapse>
						)}
					</React.Fragment>
				)
			})}
		</List>
	)
}
