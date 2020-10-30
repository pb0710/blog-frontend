import React from 'react'
import style from '../style/index.module.scss'
import { useSelector } from 'react-redux'
import { Panel } from '@/components/base'
import { List } from 'sylas-react-ui'
import { ForumRounded, ThumbUpRounded, LocalOfferRounded } from '@material-ui/icons'
import clsx from 'clsx'
import { useFetch } from '@/utils/hooks'
import * as userApi from '@/apis/user'

function ArticleStatsPanel() {
	const { detail } = useSelector(state => state.article)
	return (
		<Panel className={style.article_stats_panel}>
			<List>
				<List.Item className={style.item} hovered ripple>
					<ThumbUpRounded />
					获赞：<span>2048</span>
				</List.Item>
				<List.Item className={style.item} hovered ripple>
					<LocalOfferRounded />
					被收藏次数：<span>{detail.views}</span>
				</List.Item>
				<List.Item className={style.item} hovered ripple>
					<ForumRounded />
					评论数：<span>{12}</span>
				</List.Item>
			</List>
		</Panel>
	)
}

export default ArticleStatsPanel
