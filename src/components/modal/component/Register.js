import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from '../style/index.module.scss'
import { Button, Form, Input } from 'sylas-react-ui'
import ArrowBackIcon from 'mdi-react/ArrowBackIcon'
import ChevronDoubleRightIcon from 'mdi-react/ChevronDoubleRightIcon'
import CloseIcon from 'mdi-react/CloseIcon'
import * as action from '../store/action'
import Login from './Login'
import Profile from './Profile'

export default function Register() {
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
					return Promise.reject('密码长度不得少于 6 位！')
				}
			}
		},
		{
			async validator(value) {
				const pattern = new RegExp('^[a-z0-9]+$', 'i')
				if (!pattern.test(value)) {
					return Promise.reject('只能是数字或字母！')
				}
			}
		}
	]

	return (
		<div className={style.register_wrapper}>
			<h1>创建账号</h1>
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
									return Promise.reject('用户名不能为空!')
								}
							}
						},
						{
							async validator(value) {
								const pattern = new RegExp('^[^\u4e00-\u9fa5]+$', 'i')
								if (!pattern.test(value)) {
									return Promise.reject('不能是汉字！')
								}
							}
						}
					]}
				>
					<Input color={theme} placeholder="用户名" />
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
					<Input type="password" color={theme} placeholder="密码" />
				</Form.Item>
				<Form.Item
					name="passwordConfirm"
					initialValue=""
					rules={[
						...passwordRules,
						({ getFieldValue }) => ({
							async validator(value) {
								if (value !== getFieldValue('password')) {
									return Promise.reject('两次输入的密码不一致！')
								}
							}
						})
					]}
				>
					<Input type="password" color={theme} placeholder="确认密码" />
				</Form.Item>
				<div className={style.footer_bar}>
					<Button type="submit" color={theme} light suffixes={<ChevronDoubleRightIcon size={20} />}>
						下一步
					</Button>
				</div>
			</Form>
		</div>
	)
}
