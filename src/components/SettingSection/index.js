import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { Paper, List } from 'sylas-react-ui'

const useStyles = makeStyles({
	root: {
		width: '100%',

		'&>h2': {
			display: 'flex',
			alignItems: 'center',
			fontSize: 15,
			height: 56,
			paddingLeft: 8,
			margin: 0
		}
	},
	paper: {
		boxSizing: 'border-box',
		width: '100%'
	},
	listItem: {
		display: 'flex',
		justifyContent: 'space-between',
		height: 48,

		'&:hover': {
			background: 'none'
		}
	}
})

function SettingSection(props) {
	const { className, title, optionsList = [] } = props

	const classes = useStyles()

	return (
		<div className={clsx(classes.root, className)}>
			<h2>{title}</h2>
			<Paper className={classes.paper}>
				<List bordered={false}>
					{optionsList.map(({ id, name, component }) => (
						<List.Item key={id} className={classes.listItem} rippleMuted={true}>
							<span>{name}</span>
							{component}
						</List.Item>
					))}
				</List>
			</Paper>
		</div>
	)
}

export default React.memo(SettingSection)
