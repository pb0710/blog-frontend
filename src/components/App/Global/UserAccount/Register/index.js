import React, { useState, useCallback, useMemo } from 'react'
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
	}
})

export default function Register(props) {
	const {} = props
	const dispatch = useDispatch()
	const classes = useStyles()

	const handleInputUsername = value => {
		console.log('value: ', value)
	}

	const handleInputPassword = value => {}

	const handleInputPasswordConfirm = (value, values) => {
		console.log('value: ', value)
		console.log('values: ', values)
		if (value === values.password) {
			alert('相等')
		}
	}

	const handleQuit = () => {
		dispatch(updateMaskVisibleAction(false))
	}

	const handleSubmit = values => {
		console.log('values', values)
	}

	const handleFormChange = (target, values) => {}

	return (
		<div className={classes.root}>
			<div className={classes.title}>
				<h1>账户注册</h1>
				{/* <Loading type="bounce" color="primary" /> */}
			</div>
			<Form onSubmit={handleSubmit} onChange={handleFormChange}>
				<FormItem label="用户名" name="username">
					<Input className={classes.input} onChange={handleInputUsername} />
				</FormItem>
				<FormItem label="密码" name="password">
					<Input className={classes.input} type="password" onChange={handleInputPassword} />
				</FormItem>
				<FormItem label="确认密码" name="password_confirm">
					<Input className={classes.input} type="password" onChange={handleInputPasswordConfirm} />
				</FormItem>
				<div className={classes.operationsWrapper}>
					<u onClick={handleQuit}>以后再说</u>
					<FormItem submitType={true}>
						<Button color="primary">下一步</Button>
					</FormItem>
				</div>
			</Form>
		</div>
	)
}
