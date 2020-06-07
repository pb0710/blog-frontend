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
	btnWrapper: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		width: '100%',
		height: 120,
		marginTop: 80
	},
	btn: {
		width: '100%'
	}
})

export default function SSO(props) {
	const {} = props
	const dispatch = useDispatch()
	const classes = useStyles()
	const accountInfo = useSelector(state => state.user.accountInfo)

	const userLogin = async accountInfo => {
		const { username, password } = accountInfo

		try {
			await userApi.login(username, password)
		} catch (error) {
			console.error(`登录失败，${error}`)
			alert(`登录失败，${error}`)
			return
		}

		try {
			const result = await userApi.fetchBaseInfo(username)
			dispatch(actions.updateAccountInfoAction({ ...accountInfo, result }))
			dispatch(actions.updateMaskVisibleAction(false))
		} catch (error) {
			console.error(`获取账号信息失败，${error}`)
			alert(`获取账号信息失败，${error}`)
		}
	}

	const handleLogin = () => {
		userLogin(accountInfo)
	}

	const handleGoRegister = () => {
		dispatch(actions.updateUserStepAction('register'))
	}

	return (
		<div className={classes.root}>
			<ModalHeader title="注册成功" />
			<div className={classes.btnWrapper}>
				<Button className={classes.btn} color="primary" onClick={handleLogin}>
					一键登录
				</Button>
				<Button className={classes.btn} onClick={handleGoRegister}>
					重新注册
				</Button>
				<Close desc="以后再说" />
			</div>
		</div>
	)
}
