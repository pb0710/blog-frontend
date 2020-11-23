import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from '../style/index.module.scss'
import { Button, Form, Input } from 'sylas-react-ui'
import ArrowBackIcon from 'mdi-react/ArrowBackIcon'
import CloseIcon from 'mdi-react/CloseIcon'
import { msg } from '@/components/base'
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

		if (!username || !password) {
			msg.error('请输入完整的账号和密码')
			// return
		}
		dispatch(action.updateModal(true, <Profile account={{ username, password }} />))
	}

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
			<Form onFinished={handleCreateAccount}>
				<Form.Item label="用户名" name="username">
					<Input color={theme} placeholder="用户名" />
				</Form.Item>
				<Form.Item label="密码" name="password">
					<Input color={theme} placeholder="密码" />
				</Form.Item>
				<Form.Item label="确认密码" name="password_confirm">
					<Input color={theme} placeholder="再输一次" />
				</Form.Item>
				<div className={style.footer_bar}>
					<Button type="submit" light>
						下一步
					</Button>
				</div>
			</Form>
		</div>
	)
}
