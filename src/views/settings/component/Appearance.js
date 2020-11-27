import React from 'react'
import Options from './Options'
import PaletteIcon from 'mdi-react/PaletteIcon'
import MenuOpenIcon from 'mdi-react/MenuOpenIcon'
import { Switch, Select } from 'sylas-react-ui'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

function Appearance() {
	const { t } = useTranslation()
	const theme = useSelector(state => state.setting.theme)
	const drawerDefaultOpened = useSelector(state => state.setting.drawerDefaultOpened)
	const appearanceOpts = [
		{
			icon: <PaletteIcon size={20} />,
			title: t('settings.theme'),
			name: 'theme',
			initialValue: theme,
			component: (
				<Select color={theme}>
					<Select.Option value="primary">{t('settings.primary')}</Select.Option>
					<Select.Option value="success">{t('settings.success')}</Select.Option>
					<Select.Option value="warning">{t('settings.warning')}</Select.Option>
					<Select.Option value="error">{t('settings.error')}</Select.Option>
				</Select>
			)
		},
		{
			icon: <MenuOpenIcon size={20} />,
			title: t('settings.default_open_drawer'),
			name: 'drawerDefaultOpened',
			initialValue: drawerDefaultOpened,
			component: <Switch color={theme} />
		}
	]
	return <Options heading={t('settings.appearance')} opts={appearanceOpts} />
}

export default Appearance
