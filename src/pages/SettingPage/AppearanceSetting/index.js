import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Select, Option, Switch } from 'ui'
import SettingSection from 'components/SettingSection'

const useStyles = makeStyles({
	root: {
		marginBottom: 16
	}
})

export default function SettingPage() {
	const classes = useStyles()

	const optionsList = useMemo(
		() => [
			{
				id: 0,
				name: '主题',
				component: (
					<Select>
						<Option value="primary">湛蓝</Option>
						<Option value="success">碧绿</Option>
						<Option value="error">粉红</Option>
						<Option value="warning">橙黄</Option>
					</Select>
				)
			},
			{
				id: 1,
				name: '夜间模式',
				component: <Switch defaultChecked={false} />
			},
			{
				id: 2,
				name: '桌面模式下默认打开抽屉',
				component: <Switch />
			}
		],
		[]
	)

	return <SettingSection className={classes.root} title="外观" optionsList={optionsList} />
}
