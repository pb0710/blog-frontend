import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Select, Option } from 'ui'
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
				name: '语言',
				component: (
					<Select>
						<Option value="zh">中文</Option>
						<Option value="en">English</Option>
					</Select>
				)
			}
		],
		[]
	)

	return <SettingSection className={classes.root} title="国际化" optionsList={optionsList} />
}
