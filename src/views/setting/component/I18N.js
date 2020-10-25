import React from 'react'
import Options from './Options'
import { Select } from 'sylas-react-ui'
import { Translate } from '@material-ui/icons'

function I18N() {
	const i18nOpts = [
		{
			icon: <Translate />,
			title: '语言',
			name: 'language',
			initialValue: 'zh-CN',
			component: (
				<Select>
					<Select.Option value="zh-CN">简体中文</Select.Option>
					<Select.Option value="en-US">English</Select.Option>
				</Select>
			)
		}
	]
	return <Options heading="国际化" opts={i18nOpts} />
}

export default I18N
