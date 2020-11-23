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

export default function Login() {
	const dispatch = useDispatch()
	const theme = useSelector(state => state.setting.theme)

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
								fetchAvatar(value)
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
					]}
				>
					<Input type="password" color={theme} placeholder="密码" />
				</Form.Item>
				<Button className={style.submit} type="submit" color={theme}>
					登录
				</Button>
				<div className={style[`go_register_${theme}`]} onClick={handleGoRegister}>
					没有账号-立即注册
				</div>
			</Form>
		</div>
	)
}
