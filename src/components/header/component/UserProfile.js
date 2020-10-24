import React from 'react'
import style from '../style/index.module.scss'
import { Button, Divider, Popup } from 'sylas-react-ui'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import * as commonAction from '@/store/actions'
import { Link } from 'react-router-dom'

export default function UserProfile() {
	const dispatch = useDispatch()
	const { avatar, nickname, username } = useSelector(state => state.userProfile)

	const { popupRef, visible, handleShowPopup } = Popup.usePopupVisible()

	const handleSignOut = () => {
		dispatch(commonAction.userLogout())
	}

	const avatarCls = clsx(style.user_avatar, visible && style.active)

	return (
		<div className={avatarCls} onClick={handleShowPopup}>
			<img src={avatar} alt="" />
			<Popup className={style.user_profile} ref={popupRef} visible={visible} scaleOrigin="top-right">
				<Link to="/">
					<div className={style.large_avatar}>
						<img src={avatar} alt="" />
					</div>
				</Link>
				<Link to="/">
					<h3>{nickname}</h3>
				</Link>
				<span>{username}</span>
				<Divider className={style.divider} />
				<Button onClick={handleSignOut}>退出</Button>
			</Popup>
		</div>
	)
}
