import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Input, Button, Switch, Loading, Form, FormItem } from 'ui'
import { useSelector, useDispatch } from 'react-redux'
import { updateMaskVisibleAction } from 'store/actions'

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
	title: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 160
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

export default function Register(props) {
	const {} = props
	const dispatch = useDispatch()
	const classes = useStyles()
	const form = Form.useForm()

	const handleQuit = () => {
		dispatch(updateMaskVisibleAction(false))
	}

	const handleSubmit = values => {
		console.log('values', values)
	}

	const handleSubmitFailed = (values, errors) => {
		console.log('errors: ', errors)
	}

	const handleFormChange = (targetName, targetValue, values) => {}

	// 校验两次输入密码相等
	const validatePasswordEqual = async (value, callback, values) => {
		const passwordVal = values.password || ''
		if (!value) {
			callback('必填项！')
		} else if (value === passwordVal) {
			callback()
		} else {
			callback('密码不一致！')
		}
	}

	const validateRequired = async (value, callback, values) => {
		if (value) {
			callback()
		} else {
			callback('必填项！')
		}
	}

	return (
		<div className={classes.root}>
			<div className={classes.title}>
				<h1>账户注册</h1>
				{/* <Loading type="bounce" color="primary" /> */}
			</div>
			<Form form={form} onFinish={handleSubmit} onFinishFailed={handleSubmitFailed} onChange={handleFormChange}>
				<FormItem label="用户名" name="username" validator={validateRequired}>
					<Input className={classes.input} />
				</FormItem>
				<FormItem label="密码" name="password" validator={validateRequired}>
					<Input className={classes.input} type="password" />
				</FormItem>
				<FormItem label="确认密码" name="password_confirm" validator={validatePasswordEqual}>
					<Input className={classes.input} type="password" />
				</FormItem>
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
