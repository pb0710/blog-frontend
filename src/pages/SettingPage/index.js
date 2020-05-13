import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Container, Paper, List, ListItem, Select, Option, Switch } from 'ui'
import AppearanceSetting from './AppearanceSetting'

const useStyles = makeStyles({
	root: {
		width: 680,
	},
})

export default function SettingPage(props) {

	const {

	} = props

	const classes = useStyles()

	return (
		<Container className={classes.root}>
			<AppearanceSetting />
		</Container>
	)
}