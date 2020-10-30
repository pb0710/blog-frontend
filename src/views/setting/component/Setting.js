import React from 'react'
import style from '../style/index.module.scss'
import { Form } from 'sylas-react-ui'
import { FlexiblePage } from '@/components/page'
import { Login } from '@/components/modal'
import { debounce, equal, notEmpty } from '@/utils'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '@material-ui/icons'
import Account from './Account'
import Appearance from './Appearance'
import I18N from './I18N'
import Banner from './Banner'
import Editor from './Editor'
import * as modalAction from '@/components/modal/store/action'
import * as commonAction from '@/store/actions'
import * as action from '../store/action'
import omit from 'omit.js'

// 一个对象是否拥有另一个对象的所有 key
const contain = (origin, target) => !Reflect.ownKeys(target).some(key => origin[key] === undefined)
// 两个对象共有的 key 的值不相等
const notEqual = (origin, target) => Reflect.ownKeys(target).some(key => !equal(origin[key], target[key]))

function Setting() {
	const dispatch = useDispatch()
	const online = useSelector(state => state.online)
	const profile = useSelector(state => state.userProfile)
	const setting = useSelector(state => state.setting)
	const saveInterval = 400

	const handleOptionsSave = values => {
		console.log('values: ', values)
		const { nickname, gender, selfIntroduction } = values
		const newProfile = { nickname, gender, selfIntroduction }
		const newSetting = omit(values, ['gender', 'selfIntroduction', 'nickname'])

		if (notEmpty(newProfile) && contain(profile, newProfile) && notEqual(profile, newProfile)) {
			dispatch(commonAction.saveProfile(newProfile))
		}
		if (!equal(setting, newSetting)) {
			dispatch(action.saveSetting(newSetting))
		}
	}

	const handleGoLogin = () => {
		dispatch(modalAction.updateModal(true, <Login />))
	}

	return (
		<FlexiblePage className={style.setting_page}>
			{online || (
				<Banner theme={setting.theme}>
					<span>登录账号以同步配置</span>
					<div onClick={handleGoLogin}>
						<span>去登录</span>
						<Input />
					</div>
				</Banner>
			)}
			<Form className={style.form} onValuesChange={debounce(handleOptionsSave, saveInterval)}>
				<Account />
				<Appearance />
				<I18N />
				<Editor />
			</Form>
		</FlexiblePage>
	)
}

export default Setting
