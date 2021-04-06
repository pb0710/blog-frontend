import React, { useEffect } from 'react'
import style from '../style/index.module.scss'
import { Form } from 'sylas-react-ui'
import { FlexiblePage } from '@/components/page'
import { Login } from '@/components/modal'
import { debounce } from '@/utils'
import { useDispatch, useSelector } from 'react-redux'
import InputIcon from 'mdi-react/InputIcon'
import Account from './Account'
import Appearance from './Appearance'
import I18N from './I18N'
import Banner from './Banner'
import Editor from './Editor'
import { updateModal } from '@/components/modal/store/action'
import { saveProfile } from '@/store/actions'
import { saveSetting } from '../store/action'
import { useTranslation } from 'react-i18next'
import { useScrollToTop } from '@/utils/hooks'

/**
 * 用户设置。
 * 分为两个表单：
 * 1.用户个人资料；
 * 2.系统设置；
 * 系统设置表单包括如下几部分（TODO:目前比较简陋，仅有几个关键的可配置项）：
 * - 用户个人信息
 * - UI
 * - 编辑器设置
 * - 国际化
 * @returns {JSX.Element}
 */
function Setting() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const online = useSelector(state => state.online)
	const profile = useSelector(state => state.userProfile)
	const theme = useSelector(state => state.setting.theme)

	useScrollToTop()
	const accountSaveInterval = 1000
	const settingSaveInterval = 400
	const [profileForm] = Form.useForm()
	const [settingsForm] = Form.useForm()

	const handleSaveProfile = values => {
		const { github, phone, email, wechat } = values
		const profile = {
			...values,
			contacts: { github, phone, email, wechat }
		}
		dispatch(saveProfile(profile))
	}

	const handleSaveSettings = settings => {
		dispatch(saveSetting(settings))
		Object.keys(settings).forEach(key => {
			localStorage.setItem(key, settings[key])
		})
	}

	const handleGoLogin = () => {
		dispatch(updateModal(true, <Login />))
	}

	return (
		<FlexiblePage className={style.setting_page}>
			{online || (
				<Banner theme={theme}>
					<span>{t('settings.auto_sync')}</span>
					<div onClick={handleGoLogin}>
						<span>{t('settings.go_login')}</span>
						<InputIcon size={20} />
					</div>
				</Banner>
			)}
			{online && profile.username && (
				<Form
					form={profileForm}
					onFinsh={handleSaveProfile}
					onValuesChange={debounce(profileForm.submit, accountSaveInterval)}
				>
					<Account form={profileForm} />
				</Form>
			)}
			<Form
				form={settingsForm}
				onFinsh={handleSaveSettings}
				onValuesChange={debounce(settingsForm.submit, settingSaveInterval)}
			>
				<Appearance />
				<I18N />
				<Editor />
			</Form>
		</FlexiblePage>
	)
}

export default Setting
