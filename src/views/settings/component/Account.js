import React from 'react'
import style from '../style/index.module.scss'
import Options from './Options'
import { Input, Button, Select, Uploader } from 'sylas-react-ui'
import defaultAvatar from '@/assets/images/default_avatar1.jpg'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import FingerprintIcon from 'mdi-react/FingerprintIcon'
import PersonIcon from 'mdi-react/PersonIcon'
import FaceIcon from 'mdi-react/FaceIcon'
import WcIcon from 'mdi-react/WcIcon'
import ChatOutlineIcon from 'mdi-react/ChatOutlineIcon'
import MailOutlineIcon from 'mdi-react/MailOutlineIcon'
import PhoneIcon from 'mdi-react/PhoneIcon'
import * as fileApi from '@/apis/file'
import * as commonAction from '@/store/actions'
import { msg } from '@/components/base'
import { useTranslation } from 'react-i18next'
import { GithubOutlined, WechatOutlined } from '@ant-design/icons'

function Account() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const profile = useSelector(state => state.userProfile)
	const theme = useSelector(state => state.setting.theme)
	const { username, nickname, avatar, gender, selfIntroduction, contacts } = profile

	const handleChangeAvatar = React.useCallback(
		async formData => {
			formData.append('userId', profile.userId)
			try {
				const avatar = await fileApi.uploadImage(formData)
				dispatch(
					commonAction.updateUserProfile({
						...profile,
						avatar
					})
				)
				return avatar
			} catch (err) {
				msg.error(`${t('error.upload')} ${err}`)
			}
		},
		[dispatch, profile, t]
	)

	const handleLogout = () => {
		dispatch(commonAction.userLogout())
	}

	const usernameOptCls = clsx(style.option, style.username_wrapper)
	const avatarOptCls = clsx(style.option, style[`avatar_wrapper_${theme}`])
	const btnCls = style[`btn_${theme}`]

	const accountOpts = [
		{
			icon: <FingerprintIcon size={20} />,
			title: t('settings.profile.username'),
			component: (
				<div className={usernameOptCls}>
					<span>{username ?? t('settings.profile.not_login')}</span>
					<Button className={btnCls} light color={theme} onClick={handleLogout}>
						{t('settings.profile.logout')}
					</Button>
				</div>
			)
		},
		{
			icon: <PersonIcon size={20} />,
			title: t('settings.profile.nickname'),
			name: 'nickname',
			initialValue: nickname,
			rules: [
				{
					async validator(value) {
						if (value.length < 4) {
							return Promise.reject(t('settings.profile.rule.nickname_length_limit'))
						}
					}
				}
			],
			component: <Input color={theme} placeholder={t('settings.profile.your_name')} />
		},
		{
			icon: <FaceIcon size={20} />,
			title: t('settings.profile.avatar'),
			name: 'avatar',
			initialValue: avatar,
			component: (
				<Uploader action={handleChangeAvatar}>
					<div className={avatarOptCls}>
						<img src={avatar || defaultAvatar} alt="" />
					</div>
				</Uploader>
			)
		},
		{
			icon: <WcIcon size={20} />,
			title: t('settings.profile.gender'),
			name: 'gender',
			initialValue: gender,
			component: (
				<Select color={theme}>
					<Select.Option value="male">{t('settings.profile.male')}</Select.Option>
					<Select.Option value="female">{t('settings.profile.female')}</Select.Option>
				</Select>
			)
		},
		{
			icon: <ChatOutlineIcon size={20} />,
			title: t('settings.profile.self_introduction'),
			name: 'selfIntroduction',
			initialValue: selfIntroduction,
			component: (
				<Input.Textarea
					color={theme}
					placeholder={t('settings.profile.skills_and_hobbies')}
					style={{ resize: 'none' }}
				/>
			)
		},
		{
			icon: <GithubOutlined />,
			title: t('settings.profile.github'),
			name: 'github',
			initialValue: contacts.github ?? '',
			component: <Input color={theme} />
		},
		{
			icon: <MailOutlineIcon size={20} />,
			title: t('settings.profile.email'),
			name: 'email',
			initialValue: contacts.email ?? '',
			component: <Input color={theme} />
		},
		{
			icon: <PhoneIcon size={20} />,
			title: t('settings.profile.phone'),
			name: 'phone',
			initialValue: contacts.phone ?? '',
			component: <Input color={theme} />
		},
		{
			icon: <WechatOutlined />,
			title: t('settings.profile.wechat'),
			name: 'wechat',
			initialValue: contacts.wechat ?? '',
			component: <Input color={theme} />
		}
	]
	return <Options className={style.account} heading={t('settings.profile.heading')} opts={accountOpts} />
}

export default Account
