import React from 'react'
import Options from './Options'
import { Select } from 'sylas-react-ui'
import { Translate } from '@material-ui/icons'
import { useSelector } from 'react-redux'

function I18N() {
	const theme = useSelector(state => state.setting.theme)
	const lang = useSelector(state => state.setting.lang)
	const i18nOpts = [
		{
			icon: <Translate />,
			title: '语言',
			name: 'lang',
			initialValue: lang,
			component: (
				<Select>
					<Select.Option color={theme} value="zh-CN">
						简体中文
					</Select.Option>
					<Select.Option color={theme} value="en-US">
						English
					</Select.Option>
				</Select>
			)
		}
	]
	return <Options heading="国际化" opts={i18nOpts} />
}

export default I18N
