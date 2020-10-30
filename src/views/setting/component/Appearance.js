import React from 'react'
import Options from './Options'
import { Brightness4Outlined, Palette, MenuOpen, FormatLineSpacing } from '@material-ui/icons'
import { Switch, Select } from 'sylas-react-ui'
import { useSelector } from 'react-redux'

function Appearance() {
	const { theme, nightMode, drawerDefaultClosed, menuDefaultOpened } = useSelector(state => state.setting)
	const appearanceOpts = [
		{
			icon: <Palette />,
			title: '主题',
			name: 'theme',
			initialValue: theme,
			component: (
				<Select>
					<Select.Option color={theme} value="primary">
						蔚蓝
					</Select.Option>
					<Select.Option color={theme} value="success">
						葱绿
					</Select.Option>
					<Select.Option color={theme} value="warning">
						金黄
					</Select.Option>
					<Select.Option color={theme} value="error">
						粉红
					</Select.Option>
				</Select>
			)
		},
		{
			icon: <Brightness4Outlined />,
			title: '夜间模式',
			name: 'nightMode',
			initialValue: nightMode,
			component: <Switch color={theme} />
		},
		{
			icon: <MenuOpen />,
			title: '默认收起侧边栏',
			name: 'drawerDefaultClosed',
			initialValue: drawerDefaultClosed,
			component: <Switch color={theme} />
		},
		{
			icon: <FormatLineSpacing />,
			title: '默认展开所有子菜单',
			name: 'menuDefaultOpened',
			initialValue: menuDefaultOpened,
			component: <Switch color={theme} />
		}
	]
	return <Options heading="外观" opts={appearanceOpts} />
}

export default Appearance
