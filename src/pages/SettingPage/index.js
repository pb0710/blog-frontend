import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Container } from 'ui'
import UserSetting from './UserSetting'
import AppearanceSetting from './AppearanceSetting'
import LanguageSetting from './LanguageSetting'

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: 680,
	},
})

export default function SettingPage(props) {

	const {

	} = props

	const classes = useStyles()

	return (
		<Container className={classes.root}>
			<UserSetting />
			<AppearanceSetting />
			<LanguageSetting />
		</Container>
	)
}