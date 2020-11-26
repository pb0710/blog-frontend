import React from 'react'
import style from '../style/index.module.scss'
import { Panel } from '@/components/base'
import { List } from 'sylas-react-ui'
import ThumbUpOutlineIcon from 'mdi-react/ThumbUpOutlineIcon'
import BookmarkAddOutlineIcon from 'mdi-react/BookmarkAddOutlineIcon'
import ForumOutlineIcon from 'mdi-react/ForumOutlineIcon'

function ArticleStatsPanel() {
	return (
		<Panel className={style.article_stats_panel}>
			<List>
				<List.Item className={style.item} hovered ripple bordered={false}>
					<ThumbUpOutlineIcon size={20} />
					获赞：<span>999</span>
				</List.Item>
				<List.Item className={style.item} hovered ripple bordered={false}>
					<BookmarkAddOutlineIcon size={20} />
					被收藏：<span>999</span>
				</List.Item>
				<List.Item className={style.item} hovered ripple bordered={false}>
					<ForumOutlineIcon size={20} />
					评论数：<span>999</span>
				</List.Item>
			</List>
		</Panel>
	)
}

export default ArticleStatsPanel
