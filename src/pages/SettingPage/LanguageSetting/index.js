import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Select } from 'sylas-react-ui'
import SettingSection from 'components/SettingSection'

const useStyles = makeStyles({
	root: {
		marginBottom: 16
	},
	lang: {
		minWidth: 120
	}
})

export default function SettingPage() {
	const classes = useStyles()

	const optionsList = [
		{
			id: 0,
			name: '语言',
			component: (
				<Select className={classes.lang} defaultValue="zh">
					<Select.Option value="zh">简体中文</Select.Option>
					<Select.Option value="en">English</Select.Option>
				</Select>
			)
		}
	]

	return <SettingSection className={classes.root} title="国际化" optionsList={optionsList} />
}
