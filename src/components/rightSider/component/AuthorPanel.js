import React from 'react'
import style from '../style/index.module.scss'
import { useSelector } from 'react-redux'
import { Panel } from '@/components/base'
import { List, Divider, Button } from 'sylas-react-ui'
import MailOutlineIcon from 'mdi-react/MailOutlineIcon'
import { GithubOutlined, WechatOutlined, QqOutlined } from '@ant-design/icons'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFetch } from '@/utils/hooks'
import * as userApi from '@/apis/user'
import defaultAvatar from '@/assets/images/default_avatar1.jpg'

export default function AuthorPanel() {
	const detail = useSelector(state => state.article.detail)
	const theme = useSelector(state => state.setting.theme)
	const { author } = detail

	const { data, excute } = useFetch(userApi.fetchProfile, {
		initData: {},
		immutable: true
	})

	React.useEffect(() => {
		if (author) {
			excute(author)
		}
	}, [author, excute])

	const avatarItemCls = clsx(style.item, style.name_wrapper)

	return (
		<Panel className={style.author_panel}>
			<List>
				<Link to="/">
					<List.Item className={avatarItemCls}>
						<div className={style.avatar}>
							<img src={data.avatar ?? defaultAvatar} alt="" />
						</div>
						<div className={style.right_wrapper}>
							<p className={style.name}>{data.nickname}</p>
						</div>
					</List.Item>
				</Link>
			</List>
			<Divider />
			<div className={style.contact_wrapper}>
				<Button.Icon>
					<GithubOutlined />
				</Button.Icon>
				<Button.Icon>
					<WechatOutlined />
				</Button.Icon>
				<Button.Icon>
					<MailOutlineIcon size={20} />
				</Button.Icon>
				<Button.Icon>
					<QqOutlined />
				</Button.Icon>
			</div>
			<Divider />
			<div className={style.footer}>
				<Button color={theme}>关注TA</Button>
			</div>
		</Panel>
	)
}
