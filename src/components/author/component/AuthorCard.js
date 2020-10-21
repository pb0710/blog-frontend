import React from 'react'
import style from '../style/index.module.scss'
import { useSelector } from 'react-redux'
import { Panel } from '@/components/base'
import { List } from 'sylas-react-ui'
import { VisibilityOutlined, ThumbUpOutlined } from '@material-ui/icons'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFetch } from '@/utils/hooks'
import * as userApi from '@/apis/user'
import defaultAvatar from '@/assets/images/default_avatar1.jpg'

export default function AuthorCard() {
	const {
		detail,
		detail: { author }
	} = useSelector(state => state.article)

	const fetchProfile = React.useCallback(async () => (author ? await userApi.fetchProfile(author) : {}), [author])
	const {
		data: { message, payload }
	} = useFetch(fetchProfile, {})

	const profile = message === 'ok' ? payload : {}

	const avatarItemCls = clsx(style.item, style.name_wrapper)

	return (
		<Panel className={style.author_card}>
			<List>
				<Link to="/">
					<List.Item className={avatarItemCls}>
						<div className={style.avatar}>
							<img src={profile.avatar ?? defaultAvatar} alt="avatar" />
						</div>
						<div className={style.right_wrapper}>
							<p className={style.name}>{profile.nickname}</p>
						</div>
					</List.Item>
				</Link>
				<List.Item className={style.item}>
					<ThumbUpOutlined />
					<span>获赞：2048</span>
				</List.Item>
				<List.Item className={style.item}>
					<VisibilityOutlined />
					<span>阅读量：{detail.views}</span>
				</List.Item>
			</List>
		</Panel>
	)
}
