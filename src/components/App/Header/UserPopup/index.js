import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useDispatch } from 'react-redux'
import { IconButton, Popup, Button, Link, Divider } from 'ui'
import { UserIcon } from 'ui/utils/icons'
import { usePopupVisible } from 'ui/utils/hooks'
import { updateMaskVisibleAction } from 'store/actions'
const avatar = 'https://lh3.googleusercontent.com/ogw/ADGmqu97NB7zYjkUdeIKAirM7m8dq1RQZZwyescNtVzX=s192-c-mo'

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
	accountSetting: {
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
	articleUpload: {
		padding: 16
	},
	accountOperators: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: 200,
		padding: 16
	}
})

export default function UserPopup(props) {
	const {} = props
	const dispatch = useDispatch()
	const { popupRef, visible, handleShowPopup, handleHidePopup } = usePopupVisible()
	const classes = useStyles()

	const handleRegister = e => {
		handleHidePopup(e)
		dispatch(updateMaskVisibleAction(true))
	}

	return (
		<div className={classes.root}>
			<IconButton focus={visible} onClick={handleShowPopup}>
				<UserIcon />
			</IconButton>
			<Popup className={classes.popup} ref={popupRef} visible={visible}>
				<div className={classes.userInfo}>
					<img src={avatar} />
					<div className={classes.accountInfo}>
						<h3>这是用户昵称</h3>
						<span>1234567890@gmail.com</span>
					</div>
					<Link className={classes.accountSetting} to="/setting" onClick={handleHidePopup}>
						管理您的账号
					</Link>
				</div>
				<Divider />
				<Link className={classes.articleUpload} to="/article_upload">
					<Button color="primary" onClick={handleHidePopup}>
						发布文章
					</Button>
				</Link>
				<Divider />
				<div className={classes.accountOperators}>
					<Button color="primary">登录</Button>
					<Button onClick={handleRegister}>注册</Button>
				</div>
			</Popup>
		</div>
	)
}
