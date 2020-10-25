import React from 'react'
import style from '../style/index.module.scss'
import { Form } from 'sylas-react-ui'
import { FlexiblePage } from '@/components/page'
import { message, Login } from '@/components/global'
import { debounce } from '@/utils'
import Account from './Account'
import Appearance from './Appearance'
import I18N from './I18N'
import Banner from './Banner'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '@material-ui/icons'
import * as modalAction from '@/components/global/store/action'

function Setting() {
	const dispatch = useDispatch()
	const online = useSelector(state => state.online)

	const handleOptionsSave = debounce(values => {
		console.log('values: ', values)
		message.success('保存成功')
	}, 500)

	const handleGoLogin = () => {
		dispatch(modalAction.updateModalContent(<Login />))
		dispatch(modalAction.updateModalVisible(true))
	}

	return (
		<FlexiblePage className={style.setting_page}>
			{online || (
				<Banner>
					登录账号以同步配置
					<div onClick={handleGoLogin}>
						<span>去登录</span>
						<Input />
					</div>
				</Banner>
			)}
			<Form className={style.form} onValuesChange={handleOptionsSave}>
				<Account />
				<Appearance />
				<I18N />
			</Form>
		</FlexiblePage>
	)
}

export default Setting
