import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Container } from 'sylas-react-ui'
import UserSetting from './UserSetting'
import AppearanceSetting from './AppearanceSetting'
import LanguageSetting from './LanguageSetting'
import FixedPage from 'components/FixedPage'

const useStyles = makeStyles({
	root: {
		width: '100%',
		height: '100%'
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		width: 680,
		height: '100%'
	}
})

export default function SettingPage(props) {
	const {} = props

	const classes = useStyles()

	return (
		<FixedPage className={classes.root}>
			<div className={classes.container}>
				<UserSetting />
				<AppearanceSetting />
				<LanguageSetting />
			</div>
		</FixedPage>
	)
}
