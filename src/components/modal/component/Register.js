import React from 'react'
import { useDispatch } from 'react-redux'
import style from '../style/index.module.scss'
import { Button, Form, Input } from 'sylas-react-ui'
import { CloseOutlined, ArrowBackOutlined, ChevronRight } from '@material-ui/icons'
import { msg } from '@/components/base'
import * as action from '../store/action'
import Login from './Login'
import Profile from './Profile'

export default function Register() {
	const dispatch = useDispatch()

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
				<ArrowBackOutlined />
			</Button.Icon>
			<Button.Icon className={style.close} onClick={handleClose}>
				<CloseOutlined />
			</Button.Icon>
			<div className={style.header}></div>
			<Form onFinished={handleCreateAccount}>
				<Form.Item label="用户名" name="username">
					<Input placeholder="用户名" />
				</Form.Item>
				<Form.Item label="密码" name="password">
					<Input placeholder="密码" />
				</Form.Item>
				<Form.Item label="确认密码" name="password_confirm">
					<Input placeholder="再输一次" />
				</Form.Item>
				<div className={style.footer_bar}>
					<Button color="default" htmlType="submit" suffixes={<ChevronRight />}>
						下一步
					</Button>
				</div>
			</Form>
		</div>
	)
}
