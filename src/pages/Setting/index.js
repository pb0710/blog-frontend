import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Container, Paper, List, ListItem, Select, Option, Switch } from 'ui'
import { flexCenter } from 'utils/styles'

const useStyles = makeStyles({
	root: {
		width: 680,

		'& h2': {
			display: 'flex',
			alignItems: 'center',
			fontSize: 15,
			height: 56,
			margin: 0,
			borderBottom: '1px solid #f1f1f1',
		}
	},
	interactive: {
		width: '100%',
	},
	paper: {
		width: '100%',
	},
	optionItem: {
		display: 'flex',
		justifyContent: 'space-between',
		height: 48,

		'&:hover': {
			background: '#fff'
		}
	}
})

export default function Setting(props) {

	const {

	} = props

	const classes = useStyles()

	return (
		<Container className={classes.root}>
			<div className={classes.interactive}>
				<h2>界面交互</h2>
				<Paper className={classes.paper}>
					<List bordered={false}>
						<ListItem className={classes.optionItem}>
							夜间模式
						<Switch />
						</ListItem>
						<ListItem className={classes.optionItem} rippleMuted={true}>主题
						<Select>
								<Option value="primary">湛蓝</Option>
								<Option value="success">碧绿</Option>
								<Option value="error">粉红</Option>
								<Option value="warning">橙黄</Option>
							</Select>
						</ListItem>
						<ListItem className={classes.optionItem}>
							桌面模式下默认打开抽屉
						<Switch />
						</ListItem>
					</List>
				</Paper>
			</div>
		</Container>
	)
}