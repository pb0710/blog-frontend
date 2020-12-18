import React, { useEffect } from 'react'
import style from '../style/index.module.scss'
import { useSelector } from 'react-redux'
import { Panel, Skeleton } from '@/components/base'
import { List, Divider, Button } from 'sylas-react-ui'
import MailOutlineIcon from 'mdi-react/MailOutlineIcon'
import PhoneIcon from 'mdi-react/PhoneIcon'
import AddIcon from 'mdi-react/AddIcon'
import { GithubOutlined, WechatOutlined } from '@ant-design/icons'
import clsx from 'clsx'
import { useFetch } from '@/utils/hooks'
import * as userApi from '@/apis/user'
import { updateArticleDetail } from '@/views/articleDetail/store/action'
import defaultAvatar from '@/assets/images/default_avatar1.jpg'
import { useTranslation } from 'react-i18next'
import Contact from './Contact'
import config from '@/config'

export default function AuthorPanel() {
	const { t } = useTranslation()
	const detail = useSelector(state => state.articleDetail)
	const theme = useSelector(state => state.setting.theme)
	const { author } = detail

	const { data, loading } = useFetch(async () => userApi.fetchProfile(author), {
		initialData: {},
		loadingDelay: config.LOADING_DELAY,
		ready: !!author,
		refreshDeps: [author]
	})
	const { nickname, avatar, contacts } = data
	const hasContacts = typeof contacts === 'object' && Object.values(contacts).filter(Boolean).length > 0

	useEffect(
		() => () => {
			// reset article detail
			updateArticleDetail({})
		},
		[]
	)

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

	const avatarItemCls = clsx(style.item, style.name_wrapper)

	return (
		<Panel className={style.author_panel}>
			<List>
				{/* <Link to="/"> */}
				<List.Item className={avatarItemCls}>
					<div className={style.avatar}>{loading ? null : <img src={avatar ?? defaultAvatar} alt="" />}</div>
					<div className={style.right_wrapper}>
						<h2 className={style.name}>{nickname || <Skeleton />}</h2>
					</div>
				</List.Item>
				{/* </Link> */}
			</List>
			{contactsElement}
			<Divider />
			<div className={style.footer}>
				<Button light color={theme} suffixes={<AddIcon size={20} />}>
					{t('article_detail.subscribe')}
				</Button>
			</div>
		</Panel>
	)
}
