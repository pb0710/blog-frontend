import React from 'react'
import Options from './Options'
import { Select } from 'sylas-react-ui'
import TranslateIcon from 'mdi-react/TranslateIcon'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

/**
 * 国际化设置
 * @returns {JSX.Element}
 */
function I18N() {
	const { t } = useTranslation()
	const theme = useSelector(state => state.setting.theme)
	const lang = useSelector(state => state.setting.lang)
	const i18nOpts = [
		{
			icon: <TranslateIcon size={20} />,
			title: t('settings.language'),
			name: 'lang',
			initialValue: lang,
			component: (
				<Select color={theme}>
					<Select.Option value="zh-CN">简体中文</Select.Option>
					<Select.Option value="en-US">English</Select.Option>
				</Select>
			)
		}
	]
	return <Options heading={t('settings.i18n')} opts={i18nOpts} />
}

export default I18N
