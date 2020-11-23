import React from 'react'
import Options from './Options'
import { Switch } from 'sylas-react-ui'
import ChromeReaderModeIcon from 'mdi-react/ChromeReaderModeIcon'
import { useSelector } from 'react-redux'

function Editor() {
	const theme = useSelector(state => state.setting.theme)
	const useMarkdownGuide = useSelector(state => state.setting.useMarkdownGuide)
	const editorOpts = [
		{
			icon: <ChromeReaderModeIcon size={20} />,
			title: '展示 Markdown Demo',
			name: 'useMarkdownGuide',
			initialValue: useMarkdownGuide,
			component: <Switch color={theme} />
		}
	]
	return <Options heading="文章" opts={editorOpts} />
}

export default Editor
