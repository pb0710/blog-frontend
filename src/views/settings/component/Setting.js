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
import * as modalAction from '@/components/modal/store/action'
import * as commonAction from '@/store/actions'
import * as action from '../store/action'

function Setting() {
	const dispatch = useDispatch()
	const online = useSelector(state => state.online)
	const profile = useSelector(state => state.userProfile)
	const setting = useSelector(state => state.setting)
	const saveInterval = 400
	const [profileForm] = Form.useForm()
	const [settingsForm] = Form.useForm()

	const handleSaveProfile = profile => {
		dispatch(commonAction.saveProfile(profile))
	}

	const handleSaveSettings = settings => {
		dispatch(action.saveSetting(settings))
	}

	const handleGoLogin = () => {
		dispatch(modalAction.updateModal(true, <Login />))
	}

	return (
		<FlexiblePage className={style.setting_page}>
			{online || (
				<Banner theme={setting.theme}>
					<span>登录账号 开启设置云端同步</span>
					<div onClick={handleGoLogin}>
						<span>去登录</span>
						<InputIcon size={20} />
					</div>
				</Banner>
			)}
			{online && profile.username && (
				<Form
					form={profileForm}
					onFinsh={handleSaveProfile}
					onValuesChange={debounce(profileForm.submit, saveInterval)}
				>
					<Account form={profileForm} />
				</Form>
			)}
			<Form
				form={settingsForm}
				onFinsh={handleSaveSettings}
				onValuesChange={debounce(settingsForm.submit, saveInterval)}
			>
				<Appearance />
				<I18N />
				<Editor />
			</Form>
		</FlexiblePage>
	)
}

export default Setting
