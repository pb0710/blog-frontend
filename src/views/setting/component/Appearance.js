import React from 'react'
import Options from './Options'
import { PaletteOutlined, MenuOpen, FormatLineSpacingOutlined } from '@material-ui/icons'
import { Switch, Select } from 'sylas-react-ui'
import { useSelector } from 'react-redux'

function Appearance() {
	const theme = useSelector(state => state.setting.theme)
	const drawerDefaultOpened = useSelector(state => state.setting.drawerDefaultOpened)
	const menuDefaultExpansion = useSelector(state => state.setting.menuDefaultExpansion)
	const appearanceOpts = [
		{
			icon: <PaletteOutlined />,
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
			icon: <MenuOpen />,
			title: '默认收起侧边栏',
			name: 'drawerDefaultOpened',
			initialValue: drawerDefaultOpened,
			component: <Switch color={theme} />
		},
		{
			icon: <FormatLineSpacingOutlined />,
			title: '默认展开所有子菜单',
			name: 'menuDefaultExpansion',
			initialValue: menuDefaultExpansion,
			component: <Switch color={theme} />
		}
	]
	return <Options heading="外观" opts={appearanceOpts} />
}

export default Appearance
