import React from 'react'
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

function Setting() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const online = useSelector(state => state.online)
	const profile = useSelector(state => state.userProfile)
	const setting = useSelector(state => state.setting)
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
	}

	const handleGoLogin = () => {
		dispatch(updateModal(true, <Login />))
	}

	return (
		<FlexiblePage className={style.setting_page}>
			{online || (
				<Banner theme={setting.theme}>
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
