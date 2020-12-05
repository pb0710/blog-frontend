import React from 'react'
import style from '../style/index.module.scss'
import { Form, Input, Button, Loading } from 'sylas-react-ui'
import CloseIcon from 'mdi-react/CloseIcon'
import { useDispatch, useSelector } from 'react-redux'
import * as commonAction from '@/store/actions'
import * as action from '../store/action'
import Register from './Register'
import defaultAvatar from '@/assets/images/default_avatar1.jpg'
import { msg } from '@/components/base'
import * as userApi from '@/apis/user'
import { useFetch } from '@/utils/hooks'
import { useTranslation } from 'react-i18next'

export default function Login() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const theme = useSelector(state => state.setting.theme)

	const [avatar, setAvatar] = React.useState(defaultAvatar)
	const { loading, data, error, excute: fetchAvatar } = useFetch(userApi.fetchProfile, {
		initialData: {},
		immutable: true
	})

	const handleClose = () => {
		dispatch(action.updateModal(false, null))
	}

	const handleGoRegister = () => {
		dispatch(action.updateModal(true, <Register />))
	}

	const handleSubmit = values => {
		console.log('values: ', values)
		const { username, password } = values
		if (!username || !password) {
			msg.error(t('modal.login.rule.complete_account'))
			return
		}

		dispatch(commonAction.userLogin({ username, password }))
	}

	React.useEffect(() => {
		if (error) {
			setAvatar(defaultAvatar)
			return
		}
		if (data?.avatar) {
			setAvatar(data.avatar)
		}
	}, [data, error])

	return (
		<div className={style.login_wrapper}>
			<h1>{t('modal.login.heading')}</h1>
			<Button.Icon className={style.close} onClick={handleClose}>
				<CloseIcon size={20} />
			</Button.Icon>
			<div className={style.avatar_wrapper}>
				{loading ? (
					<div>
						<Loading color={theme} />
					</div>
				) : (
					<img src={avatar} alt="" />
				)}
			</div>
			<Form onFinsh={handleSubmit}>
				<Form.Item
					name="username"
					initialValue=""
					rules={[
						{
							async validator(value) {
								if (!value) {
									return Promise.reject(t('modal.login.rule.username_not_empty'))
								}
							}
						},
						{
							async validator(value) {
								if (!value) return
								const pattern = new RegExp('^[^\u4e00-\u9fa5]+$', 'i')
								if (!pattern.test(value)) {
									return Promise.reject(t('modal.login.rule.not_zh'))
								}
								fetchAvatar(value)
							}
						}
					]}
				>
					<Input color={theme} placeholder={t('modal.login.username')} />
				</Form.Item>
				<Form.Item
					name="password"
					initialValue=""
					rules={[
						{
							async validator(value) {
								if (value.length < 6) {
									return Promise.reject(t('modal.login.rule.password_length_limit'))
								}
							}
						},
						{
							async validator(value) {
								const pattern = new RegExp('^(?=.*?[a-z])(?=.*?[0-9]).*$', 'i')
								if (!pattern.test(value)) {
									return Promise.reject(t('modal.login.rule.number_and_alphabet'))
								}
							}
						}
					]}
				>
					<Input type="password" color={theme} placeholder={t('modal.login.password')} />
				</Form.Item>
				<Button className={style.submit} type="submit" color={theme}>
					{t('modal.login.login')}
				</Button>
				<div className={style[`go_register_${theme}`]} onClick={handleGoRegister}>
					{t('modal.login.have_not_account')}
				</div>
			</Form>
		</div>
	)
}
