import React from 'react'
import Options from './Options'
import { Brightness4Outlined, Palette, MenuOpen } from '@material-ui/icons'
import { Switch, Select } from 'sylas-react-ui'
const { Option } = Select

function Appearance() {
	const appearanceOpts = [
		{
			icon: <Palette />,
			title: '主题',
			name: 'theme',
			initialValue: 'primary',
			component: (
				<Select>
					<Option value="primary">蔚蓝</Option>
					<Option value="success">葱绿</Option>
					<Option value="warning">金黄</Option>
					<Option value="error">粉红</Option>
				</Select>
			)
		},
		{
			icon: <Brightness4Outlined />,
			title: '夜间模式',
			name: 'nightMode',
			initialValue: false,
			component: <Switch />
		},
		{
			icon: <MenuOpen />,
			title: '默认收起侧边栏',
			name: 'drawerClose',
			initialValue: false,
			component: <Switch />
		}
	]
	return <Options heading="外观" opts={appearanceOpts} />
}

export default Appearance
