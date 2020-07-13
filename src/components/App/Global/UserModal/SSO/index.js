import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Input, Button, Switch, Loading, Form, FormItem } from 'sylas-react-ui'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from 'store/actions'
import * as userApi from 'apis/user'
import ModalHeader from '../ModalHeader'
import Close from '../Close'
import { delay } from 'utils'

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
	btnWrapper: {
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		width: '100%',
		height: 160,
		padding: 16
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
	const [remain, setRemain] = useState(5)

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
			dispatch(actions.updateAccountInfoAction({ ...accountInfo, ...result }))
			dispatch(actions.updateMaskVisibleAction(false))
		} catch (error) {
			console.error(`获取账号信息失败，${error}`)
			alert(`获取账号信息失败，${error}`)
		}
	}

	const handleLogin = useCallback(() => {
		userLogin(accountInfo)
	}, [accountInfo])

	const handleGoRegister = () => {
		dispatch(actions.updateUserStepAction('REGISTER'))
	}

	// 自动登陆倒计时
	useEffect(() => {
		let isUnmounted = false
		;(async () => {
			const oneSecond = 1000
			let count = remain
			while (true) {
				if (isUnmounted) {
					break
				} else {
					setRemain(count)
					count--
					if (count < 0) {
						userLogin(accountInfo)
						break
					}
					await delay(oneSecond)
				}
			}
		})()
		return () => {
			// 组件卸载后中断异步逻辑
			isUnmounted = true
		}
	}, [])

	return (
		<div className={classes.root}>
			<ModalHeader title="注册成功" />
			<div className={classes.btnWrapper}>
				<Button className={classes.btn} color="primary" onClick={handleLogin}>
					一键登录（{remain}s）
				</Button>
				<Button className={classes.btn} onClick={handleGoRegister}>
					重新注册
				</Button>
				<Close desc="以后再说" />
			</div>
		</div>
	)
}
