import React from 'react'
import Options from './Options'
import { Switch } from 'sylas-react-ui'
import ChromeReaderModeIcon from 'mdi-react/ChromeReaderModeIcon'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

function Editor() {
	const { t } = useTranslation()
	const theme = useSelector(state => state.setting.theme)
	const useMarkdownGuide = useSelector(state => state.setting.useMarkdownGuide)
	const editorOpts = [
		{
			icon: <ChromeReaderModeIcon size={20} />,
			title: t('settings.show_markdown_guide'),
			name: 'useMarkdownGuide',
			initialValue: useMarkdownGuide,
			component: <Switch color={theme} />
		}
	]
	return <Options heading={t('settings.article')} opts={editorOpts} />
}

export default Editor
