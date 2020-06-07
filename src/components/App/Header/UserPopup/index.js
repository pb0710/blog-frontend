import React, { useCallback, useMemo } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import { IconButton, Popup, Button, Link, List, ListItem } from 'ui'
import { UserIcon, WriteIcon } from 'ui/utils/icons'
import * as actions from 'store/actions'
import * as userApi from 'apis/user'
const defaultAvatar = 'https://lh3.googleusercontent.com/ogw/ADGmqu97NB7zYjkUdeIKAirM7m8dq1RQZZwyescNtVzX=s192-c-mo'

const useStyles = makeStyles({
	root: {},
	popup: {
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		overflowY: 'auto'
	},
	userInfo: {
		boxSizing: 'border-box',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'column',
		width: '100%',
		height: 240,
		padding: 16,
		'&>img': {
			width: 80,
			height: 80,
			borderRadius: '50%'
		}
	},
	accountInfo: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'column',
		'&>h3': {
			marginTop: 0
		},
		'&>span': {
			color: '#777'
		}
	},
	setting: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 160,
		height: 32,
		color: '#3c4043',
		fontWeight: 500,
		background: '#fff',
		borderRadius: 16,
		border: '1px solid #dadce0',
		'&:hover': {
			background: '#f8f8f8'
		}
	},
	articleWrapper: {
		width: '100%',
		borderLeft: 0,
		borderRight: 0,
		borderRadius: 0,
		border: '1px solid #e8eaed'
	},
	counts: {
		boxSizing: 'border-box',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		height: 56,
		padding: '0 40px'
	},
	countTag: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: '100%',
		'&>span': {
			fontSize: 12,
			color: '#777'
		},
		'&>p': {
			margin: 0,
			fontWeight: 500
		}
	},
	write: {
		boxSizing: 'border-box',
		width: '100%',
		height: 56,
		color: '#3c4043',
		fontWeight: 500,
		padding: '0 40px',
		'&>i': {
			height: 15,
			fontSize: 15,
			marginRight: 16
		}
	},
	account: {
		boxSizing: 'border-box',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: 200,
		height: 64,

		'&>*': {
			margin: '0 16px',
			width: 80
		}
	},
	logout: {
		border: '1px solid #dadce0',
		background: '#fff',
		'&:hover': {
			background: '#f8f8f8'
		}
	}
})

export default function UserPopup(props) {
	const {} = props
	const dispatch = useDispatch()
	const { popupRef, visible, handleShowPopup, handleHidePopup } = Popup.usePopupVisible()
	const classes = useStyles()
	const accountInfo = useSelector(state => state.user.accountInfo)
	const { isOnline = false, nickname, username, avatar } = accountInfo

	const showUserModal = e => {
		handleHidePopup(e)
		dispatch(actions.updateMaskVisibleAction(true))
	}

	const handleRegister = e => {
		showUserModal(e)
		dispatch(actions.updateUserStepAction('REGISTER'))
	}

	const handleLogin = e => {
		showUserModal(e)
		dispatch(actions.updateUserStepAction('LOGIN'))
	}

	const handleLogout = useCallback(() => {
		;(async () => {
			const { username } = accountInfo
			try {
				await userApi.logout(username)
			} catch (error) {
				console.error(`登出失败：${error}`)
			}
		})()
		dispatch(actions.updateAccountInfoAction({}))
	}, [accountInfo])

	const countsInfo = useMemo(() => {
		const { level = '--', articleNum = '--', collections = '--' } = accountInfo
		return [
			{
				key: 'level',
				name: '等级',
				count: level
			},
			{
				key: 'articleNum',
				name: '文章',
				count: articleNum
			},
			{
				key: 'collections',
				name: '收藏',
				count: collections
			}
		]
	}, [accountInfo])

	return (
		<div className={classes.root}>
			<IconButton focus={visible} onClick={handleShowPopup}>
				<UserIcon />
			</IconButton>
			<Popup className={classes.popup} ref={popupRef} visible={visible}>
				<div className={classes.userInfo}>
					<img src={avatar ?? defaultAvatar} />
					<div className={classes.accountInfo}>
						<h3>{nickname ?? '尚未登录...'}</h3>
						<span>{username ?? '匿名访客'}</span>
					</div>
					<Link className={classes.setting} to="/setting" onClick={handleHidePopup}>
						管理您的账号
					</Link>
				</div>
				<List className={classes.articleWrapper} bordered={true}>
					<ListItem className={classes.counts} rippleMuted={true} onClick={handleHidePopup}>
						{countsInfo.map(({ key, name, count }) => (
							<div key={key} className={classes.countTag}>
								<span>{name}</span>
								<p>{count}</p>
							</div>
						))}
					</ListItem>
					<ListItem
						className={classes.write}
						linked={true}
						to="/article_upload"
						rippleMuted={true}
						onClick={handleHidePopup}
					>
						<i>
							<WriteIcon />
						</i>
						发布一篇文章
					</ListItem>
				</List>
				<div className={classes.account}>
					{isOnline ? (
						<Button className={classes.logout} rippleMuted={true} onClick={handleLogout}>
							退出
						</Button>
					) : (
						<>
							<Button onClick={handleRegister}>注册</Button>
							<Button color="primary" onClick={handleLogin}>
								登录
							</Button>
						</>
					)}
				</div>
			</Popup>
		</div>
	)
}
