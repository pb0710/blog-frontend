import React from 'react'
import style from '../style/index.module.scss'
import { useSelector } from 'react-redux'
import { Panel } from '@/components/base'
import { List, Divider, Button } from 'sylas-react-ui'
import { GitHub, Mail, Sms } from '@material-ui/icons'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFetch } from '@/utils/hooks'
import * as userApi from '@/apis/user'
import defaultAvatar from '@/assets/images/default_avatar1.jpg'

export default function AuthorPanel() {
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
		<Panel className={style.author_panel}>
			<List>
				<Link to="/">
					<List.Item className={avatarItemCls}>
						<div className={style.avatar}>
							<img src={profile.avatar ?? defaultAvatar} alt="" />
						</div>
						<div className={style.right_wrapper}>
							<p className={style.name}>{profile.nickname}</p>
						</div>
					</List.Item>
				</Link>
			</List>
			<Divider />
			<div className={style.contact_wrapper}>
				<Button.Icon>
					<Sms />
				</Button.Icon>
				<Button.Icon>
					<GitHub />
				</Button.Icon>
				<Button.Icon>
					<Mail />
				</Button.Icon>
			</div>
			<Divider />
			<div className={style.footer}>
				<Button color="primary">关注TA</Button>
			</div>
		</Panel>
	)
}
