import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Input, Button, Switch, Loading, Form, FormItem } from 'ui'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from 'store/actions'
import * as userApi from 'apis/user'
import ModalHeader from '../ModalHeader'
import Close from '../Close'

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
		height: 80
	},
	submit: {
		width: 80
	}
})

export default function Register(props) {
	const {} = props
	const dispatch = useDispatch()
	const classes = useStyles()
	const form = Form.useForm()

	const userRegister = async values => {
		const { username, password, nickname } = values
		try {
			await userApi.register(username, password, nickname)
			dispatch(actions.updateAccountInfoAction({ username, password, nickname }))
			dispatch(actions.updateUserStepAction('SSO'))
		} catch (error) {
			console.error(`注册失败，${error}`)
			alert(`注册失败，${error}`)
		}
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

	const handleInputPassword = useCallback(() => {
		form.setFieldsValue({ password_confirm: '' })
	}, [])

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
				component: <Input className={classes.input} type="password" onChange={handleInputPassword} />
			},
			{
				name: 'password_confirm',
				label: '确认密码',
				validator: validatePasswordEqual,
				component: <Input className={classes.input} type="password" />
			}
		],
		[handleInputPassword]
	)

	return (
		<div className={classes.root}>
			<ModalHeader title="账号注册" />
			<Form className={classes.registerForm} form={form} onFinish={handleSubmit} onFinishFailed={handleSubmitFailed}>
				{formFields.map(item => (
					<FormItem key={item.name} {...item}>
						{item.component}
					</FormItem>
				))}
				<div className={classes.operationsWrapper}>
					<Close desc="以后再说" />
					<FormItem className={classes.submit} submitType={true}>
						<Button color="primary">下一步</Button>
					</FormItem>
				</div>
			</Form>
		</div>
	)
}
