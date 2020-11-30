import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from '../style/index.module.scss'
import { Button, Form, Input } from 'sylas-react-ui'
import ArrowBackIcon from 'mdi-react/ArrowBackIcon'
import ArrowRightIcon from 'mdi-react/ArrowRightIcon'
import CloseIcon from 'mdi-react/CloseIcon'
import * as action from '../store/action'
import Login from './Login'
import Profile from './Profile'
import { useTranslation } from 'react-i18next'

export default function Register() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const theme = useSelector(state => state.setting.theme)

	const handleReturn = () => {
		dispatch(action.updateModal(true, <Login />))
	}

	const handleClose = () => {
		dispatch(action.updateModal(false, null))
	}

	const handleCreateAccount = values => {
		const { username, password } = values
		dispatch(action.updateModal(true, <Profile account={{ username, password }} />))
	}

	const passwordRules = [
		{
			async validator(value) {
				if (value.length < 6) {
					return Promise.reject(t('modal.register.rule.password_length_limit'))
				}
			}
		},
		{
			async validator(value) {
				const pattern = new RegExp('^[a-z0-9]+$', 'i')
				if (!pattern.test(value)) {
					return Promise.reject(t('modal.register.rule.number_or_alphabet'))
				}
			}
		}
	]

	return (
		<div className={style.register_wrapper}>
			<h1>{t('modal.register.heading')}</h1>
			<Button.Icon className={style.return} onClick={handleReturn}>
				<ArrowBackIcon size={20} />
			</Button.Icon>
			<Button.Icon className={style.close} onClick={handleClose}>
				<CloseIcon size={20} />
			</Button.Icon>
			<div className={style.header}></div>
			<Form onFinsh={handleCreateAccount}>
				<Form.Item
					name="username"
					initialValue=""
					rules={[
						{
							async validator(value) {
								if (!value) {
									return Promise.reject(t('modal.register.rule.username_not_empty'))
								}
							}
						},
						{
							async validator(value) {
								if (!value) return
								const pattern = new RegExp('^[^\u4e00-\u9fa5]+$', 'i')
								if (!pattern.test(value)) {
									return Promise.reject(t('modal.register.rule.not_zh'))
								}
							}
						}
					]}
				>
					<Input color={theme} placeholder={t('modal.register.username')} />
				</Form.Item>
				<Form.Item
					name="password"
					initialValue=""
					rules={[
						...passwordRules,
						({ getFieldValue, setFieldsValue }) => ({
							async validator(value) {
								if (value !== getFieldValue('passwordConfirm')) {
									setFieldsValue({ passwordConfirm: '' })
								}
							}
						})
					]}
				>
					<Input type="password" color={theme} placeholder={t('modal.register.password')} />
				</Form.Item>
				<Form.Item
					name="passwordConfirm"
					initialValue=""
					rules={[
						...passwordRules,
						({ getFieldValue }) => ({
							async validator(value) {
								if (value !== getFieldValue('password')) {
									return Promise.reject(t('modal.register.rule.password_confirm_not_equal'))
								}
							}
						})
					]}
				>
					<Input type="password" color={theme} placeholder={t('modal.register.password_confirm')} />
				</Form.Item>
				<div className={style.footer_bar}>
					<Button type="submit" color={theme} light suffixes={<ArrowRightIcon size={20} />}>
						{t('modal.register.next')}
					</Button>
				</div>
			</Form>
		</div>
	)
}
