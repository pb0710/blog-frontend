import React from 'react'
import style from '../style/index.module.scss'
import { Button, Divider, Popup, TouchRipple } from 'sylas-react-ui'
import { useDispatch, useSelector } from 'react-redux'
import * as commonAction from '@/store/actions'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function UserProfile() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { avatar, nickname, username } = useSelector(state => state.userProfile)
	const theme = useSelector(state => state.setting.theme)
	const [visible, popupRef, { toggle, hide }] = Popup.usePopup()

	const handleSignOut = () => {
		dispatch(commonAction.userLogout())
		hide()
	}

	return (
		<>
			<Button.Icon className={style.user_avatar} focus={visible} onClick={toggle}>
				<img src={avatar} alt="" />
			</Button.Icon>
			<Popup ref={popupRef} className={style.user_profile} visible={visible} scaleOrigin="top-right">
				<Link to="/blog">
					<div className={style.large_avatar}>
						<img src={avatar} alt="" />
					</div>
				</Link>
				<Link to="/blog">
					<h3>{nickname}</h3>
				</Link>
				<span>{username}</span>
				<Divider className={style.divider} />
				<TouchRipple />
				<Button light color={theme} onClick={handleSignOut}>
					{t('header.logout')}
				</Button>
			</Popup>
		</>
	)
}
