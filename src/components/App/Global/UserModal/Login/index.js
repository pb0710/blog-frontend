import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Input, Button, Switch, Loading, Form, FormItem } from 'ui'
import { useSelector, useDispatch } from 'react-redux'
import { updateMaskVisibleAction } from 'store/actions'
import ModalHeader from '../ModalHeader'
import * as userApi from 'apis/user'

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: 280,
		height: 640,
		padding: 16,
		overflow: 'hidden'
		// border: '1px solid #000',
	},
	registerForm: {
		height: 400
	},
	input: {
		width: '100%'
	},
	operationsWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: 280,
		height: 80,
		'&>u': {
			paddingLeft: 4,
			color: '#606266',
			fontSize: 13,
			cursor: 'pointer'
		}
	},
	submit: {
		width: 80
	}
})

export default function Login(props) {
	const {} = props
	const dispatch = useDispatch()
	const classes = useStyles()
	const form = Form.useForm()

	const [loading, setLoading] = useState(false)

	const userRegister = async values => {
		setLoading(true)
		const { username, password, nickname } = values
		try {
			await userApi.register(username, password, nickname)
			alert('注册成功')
		} catch (error) {
			console.error(`注册失败，${error}`)
			alert(`注册失败，${error}`)
		}
		setLoading(false)
	}

	const handleQuit = () => {
		dispatch(updateMaskVisibleAction(false))
	}

	const handleSubmit = values => {
		console.log('values', values)
		userRegister(values)
	}

	const handleSubmitFailed = (values, errors) => {
		console.error('validate errors: ', errors)
	}

	// 校验两次输入密码相等
	const validatePasswordEqual = async (value, callback, values) => {
		const passwordVal = values.password || ''
		if (!value) {
			callback('必填')
		} else if (value === passwordVal) {
			callback()
		} else {
			callback('密码不一致')
		}
	}

	const validateRequired = async (value, callback, values) => {
		if (value) {
			callback()
		} else {
			callback('必填')
		}
	}

	const formFields = useMemo(
		() => [
			{
				name: 'username',
				label: '用户名',
				validator: validateRequired,
				component: <Input className={classes.input} />
			},
			{
				name: 'nickname',
				label: '昵称',
				component: <Input className={classes.input} />
			},
			{
				name: 'password',
				label: '密码',
				validator: validateRequired,
				component: <Input className={classes.input} type="password" />
			},
			{
				name: 'password_confirm',
				label: '确认密码',
				validator: validatePasswordEqual,
				component: <Input className={classes.input} type="password" />
			}
		],
		[]
	)

	return (
		<div className={classes.root}>
			<ModalHeader title="账户注册" loading={loading} />
			<Form className={classes.registerForm} form={form} onFinish={handleSubmit} onFinishFailed={handleSubmitFailed}>
				{formFields.map(item => (
					<FormItem key={item.name} {...item}>
						{item.component}
					</FormItem>
				))}
				<div className={classes.operationsWrapper}>
					<u onClick={handleQuit}>以后再说</u>
					<FormItem className={classes.submit} submitType={true}>
						<Button color="primary">下一步</Button>
					</FormItem>
				</div>
			</Form>
		</div>
	)
}
