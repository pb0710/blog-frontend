import React from 'react'
import Options from './Options'
import { Switch } from 'sylas-react-ui'
import { ImportContactsRounded } from '@material-ui/icons'
import { useSelector } from 'react-redux'

function Editor() {
	const { useMarkdownGuide } = useSelector(state => state.setting)
	const editorOpts = [
		{
			icon: <ImportContactsRounded />,
			title: '写作区添加 Markdown Demo 模版',
			name: 'useMarkdownGuide',
			initialValue: useMarkdownGuide,
			component: <Switch />
		}
	]
	return <Options heading="文章" opts={editorOpts} />
}

export default Editor
