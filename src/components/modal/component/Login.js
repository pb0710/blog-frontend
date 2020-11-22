import React from 'react'
import style from '../style/index.module.scss'
import { Form, Input, Button, Loading } from 'sylas-react-ui'
import { CloseOutlined } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import * as commonAction from '@/store/actions'
import * as action from '../store/action'
import Register from './Register'
import defaultAvatar from '@/assets/images/default_avatar1.jpg'
import { msg } from '@/components/base'
import * as userApi from '@/apis/user'
import { useFetch } from '@/utils/hooks'
import { debounce } from '@/utils'

export default function Login() {
	const dispatch = useDispatch()
	const theme = useSelector(state => state.setting.theme)
	const fetchInterval = 400

	const [avatar, setAvatar] = React.useState(defaultAvatar)
	const { loading, data, error, excute: fetchAvatar } = useFetch(userApi.fetchProfile, {
		initData: {},
		immutable: true
	})

	const handleClose = () => {
		dispatch(action.updateModal(false, null))
	}

	const handleGoRegister = () => {
		dispatch(action.updateModal(true, <Register />))
	}

	const handleValuesChange = React.useCallback(
		values => {
			if (values.username) {
				fetchAvatar(values.username)
			}
		},
		[fetchAvatar]
	)

	const handleSubmit = values => {
		console.log('values: ', values)
		const { username, password } = values
		if (!username || !password) {
			msg.error('请输入完整的账号和密码')
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
			<h1>用户登录</h1>
			<Button.Icon className={style.close} onClick={handleClose}>
				<CloseOutlined />
			</Button.Icon>
			<div className={style.avatar_wrapper}>
				{loading ? <Loading.Bounce color={theme} /> : <img src={avatar} alt="" />}
			</div>
			<Form onFinished={handleSubmit} onValuesChange={debounce(handleValuesChange, fetchInterval)}>
				<Form.Item label="用户名" name="username">
					<Input color={theme} placeholder="用户名" />
				</Form.Item>
				<Form.Item label="密码" name="password">
					<Input.Password color={theme} placeholder="密码" />
				</Form.Item>
				<div className={style.footer}>
					<span className={style[`go_register_${theme}`]} onClick={handleGoRegister}>
						没有账号？点击注册
					</span>
					<Button htmlType="submit" color={theme}>
						登录
					</Button>
				</div>
			</Form>
		</div>
	)
}
