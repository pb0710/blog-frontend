import React from 'react'
import Options from './Options'
import PaletteIcon from 'mdi-react/PaletteIcon'
import MenuOpenIcon from 'mdi-react/MenuOpenIcon'
import { Switch, Select } from 'sylas-react-ui'
import { useSelector } from 'react-redux'

function Appearance() {
	const theme = useSelector(state => state.setting.theme)
	const drawerDefaultOpened = useSelector(state => state.setting.drawerDefaultOpened)
	const appearanceOpts = [
		{
			icon: <PaletteIcon size={20} />,
			title: '主题',
			name: 'theme',
			initialValue: theme,
			component: (
				<Select color={theme}>
					<Select.Option value="primary">蔚蓝</Select.Option>
					<Select.Option value="success">葱绿</Select.Option>
					<Select.Option value="warning">金黄</Select.Option>
					<Select.Option value="error">粉红</Select.Option>
				</Select>
			)
		},
		{
			icon: <MenuOpenIcon size={20} />,
			title: '默认展示侧边栏',
			name: 'drawerDefaultOpened',
			initialValue: drawerDefaultOpened,
			component: <Switch color={theme} />
		}
	]
	return <Options heading="外观" opts={appearanceOpts} />
}

export default Appearance
