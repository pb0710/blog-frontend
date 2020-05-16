import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Select, Option, Switch } from 'ui'
import SettingSection from 'components/SettingSection'

const useStyles = makeStyles({
	root: {
		marginBottom: 16
	}
})

export default function UserSetting() {
	const classes = useStyles()

	const optionsList = useMemo(
		() => [
			{
				id: 0,
				name: '云端同步',
				component: <Switch defaultChecked={false} />
			},
			{
				id: 1,
				name: '自动登录',
				component: <Switch />
			}
		],
		[]
	)

	return <SettingSection className={classes.root} title="账户" optionsList={optionsList} />
}
