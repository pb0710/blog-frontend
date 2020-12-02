import React from 'react'
import style from '../style/index.module.scss'
import { useSelector } from 'react-redux'
import { Panel, Skeleton } from '@/components/base'
import { List, Divider, Tag } from 'sylas-react-ui'
import MailOutlineIcon from 'mdi-react/MailOutlineIcon'
import PhoneIcon from 'mdi-react/PhoneIcon'
import { GithubOutlined, WechatOutlined } from '@ant-design/icons'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFetch } from '@/utils/hooks'
import * as userApi from '@/apis/user'
import defaultAvatar from '@/assets/images/default_avatar1.jpg'
import { useTranslation } from 'react-i18next'
import Contact from './Contact'

export default function IndividualPanel() {
	const { t } = useTranslation()
	const { username = 'pb@qq.com' } = useSelector(state => state.userProfile)

	const { data, loading } = useFetch(userApi.fetchProfile, {
		initialData: {},
		immutable: !username,
		params: [username],
		refreshDeps: [username]
	})
	const { nickname, avatar, contacts } = data
	const hasContacts = typeof contacts === 'object' && Object.values(contacts).filter(Boolean).length > 0

	const contactsElement = hasContacts ? (
		<>
			<Divider />
			<div className={style.contact_wrapper}>
				{contacts.github && (
					<Contact link={contacts.github}>
						<GithubOutlined />
					</Contact>
				)}
				{contacts.wechat && (
					<Contact link={contacts.wechat}>
						<WechatOutlined />
					</Contact>
				)}
				{contacts.email && (
					<Contact link={contacts.email}>
						<MailOutlineIcon size={20} />
					</Contact>
				)}
				{contacts.phone && (
					<Contact link={contacts.phone}>
						<PhoneIcon size={20} />
					</Contact>
				)}
			</div>
		</>
	) : null

	const tagsElement =
		username === 'pb@qq.com' ? (
			<>
				<Divider />
				<div className={style.tags_wrapper}>
					<Tag color="error">{t('home.frontend')}</Tag>
					<Tag color="warning">Developer</Tag>
					<Tag>React</Tag>
					<Tag color="success">NodeJS</Tag>
					<Tag color="error">Sass</Tag>
					<Tag>Typescript</Tag>
				</div>
			</>
		) : null

	const avatarItemCls = clsx(style.item, style.name_wrapper)

	return (
		<Panel className={style.individual_panel}>
			<List>
				<Link to="/">
					<List.Item className={avatarItemCls}>
						<div className={style.avatar}>{loading || <img src={avatar ?? defaultAvatar} alt="" />}</div>
						<div className={style.bottom_wrapper}>
							{nickname ? <h2 className={style.name}>{nickname}</h2> : <Skeleton />}
						</div>
					</List.Item>
				</Link>
			</List>
			{contactsElement}
			{tagsElement}
		</Panel>
	)
}
