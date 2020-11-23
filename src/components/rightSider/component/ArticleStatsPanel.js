import React from 'react'
import style from '../style/index.module.scss'
import { useSelector } from 'react-redux'
import { Panel } from '@/components/base'
import { List } from 'sylas-react-ui'
import ThumbUpOutlineIcon from 'mdi-react/ThumbUpOutlineIcon'
import BookmarkAddOutlineIcon from 'mdi-react/BookmarkAddOutlineIcon'
import ForumOutlineIcon from 'mdi-react/ForumOutlineIcon'

function ArticleStatsPanel() {
	const detail = useSelector(state => state.article.detail)
	return (
		<Panel className={style.article_stats_panel}>
			<List>
				<List.Item className={style.item} hovered ripple>
					<ThumbUpOutlineIcon size={20} />
					获赞：<span>2048</span>
				</List.Item>
				<List.Item className={style.item} hovered ripple>
					<BookmarkAddOutlineIcon size={20} />
					被收藏次数：<span>{detail.views}</span>
				</List.Item>
				<List.Item className={style.item} hovered ripple>
					<ForumOutlineIcon size={20} />
					评论数：<span>{12}</span>
				</List.Item>
			</List>
		</Panel>
	)
}

export default ArticleStatsPanel
