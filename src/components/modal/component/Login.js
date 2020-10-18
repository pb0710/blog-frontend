import React from 'react'
import style from '../style/index.module.scss'
import { Form, Input, Button, Loading } from 'sylas-react-ui'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import { useDispatch } from 'react-redux'
import * as commonAction from '@/store/actions'
import * as action from '../store/action'
import Register from './Register'
import defaultAvatar from '@/assets/images/default_avatar1.jpg'

export default function Login(props) {
	const dispatch = useDispatch()
	const form = Form.useForm()

	const [avatarSrc, setAvatarSrc] = React.useState(defaultAvatar)

	const handleClose = () => {
		dispatch(action.updateModalVisible(false))
		dispatch(action.updateModalContent(null))
	}

	const handleGoRegister = () => {
		dispatch(action.updateModalContent(<Register />))
	}

	const handleSubmit = values => {
		console.log('values: ', values)
		const { username, password } = values
		if (!username || !password) return
		dispatch(commonAction.userLogin({ username, password }))
	}

	return (
		<div className={style.login_wrapper}>
			<h1>用户登陆</h1>
			<Button.Icon className={style.close} onClick={handleClose}>
				<CloseOutlinedIcon />
			</Button.Icon>
			<div className={style.avatar_wrapper}>
				<img src={avatarSrc} />
				{/* <Loading.Bounce /> */}
			</div>
			<Form form={form} onFinished={handleSubmit}>
				<Form.Item label="用户名" name="username">
					<Input placeholder="用户名" />
				</Form.Item>
				<Form.Item label="密码" name="password">
					<Input.Password placeholder="密码" />
				</Form.Item>
				<div className={style.footer}>
					<span className={style.register} onClick={handleGoRegister}>
						立即注册
					</span>
					<Button htmlType="submit" color="primary">
						确认登录
					</Button>
				</div>
			</Form>
		</div>
	)
}
