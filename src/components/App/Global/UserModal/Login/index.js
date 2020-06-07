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

	const userLogin = async values => {
		const { username, password } = values

		try {
			await userApi.login(username, password)
		} catch (error) {
			console.error(`登录失败，${error}`)
			alert(`登录失败，${error}`)
			return
		}

		try {
			const result = await userApi.fetchBaseInfo(username)
			dispatch(actions.updateAccountInfoAction({ ...values, ...result }))
			dispatch(actions.updateMaskVisibleAction(false))
		} catch (error) {
			console.error(`获取账号信息失败，${error}`)
			alert(`获取账号信息失败，${error}`)
		}
	}

	const handleSubmit = values => {
		console.log('values', values)
		userLogin(values)
	}

	const handleSubmitFailed = (values, errors) => {
		console.error('validate errors: ', errors)
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
				name: 'password',
				label: '密码',
				validator: validateRequired,
				component: <Input className={classes.input} type="password" />
			}
		],
		[]
	)

	return (
		<div className={classes.root}>
			<ModalHeader title="用户登陆" />
			<Form className={classes.registerForm} form={form} onFinish={handleSubmit} onFinishFailed={handleSubmitFailed}>
				{formFields.map(item => (
					<FormItem key={item.name} {...item}>
						{item.component}
					</FormItem>
				))}
				<div className={classes.operationsWrapper}>
					<Close desc="以后再说" />
					<FormItem className={classes.submit} submitType={true}>
						<Button color="primary">登录</Button>
					</FormItem>
				</div>
			</Form>
		</div>
	)
}
