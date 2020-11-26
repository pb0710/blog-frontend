import React from 'react'
import style from '../style/index.module.scss'
import { Panel } from '@/components/base'
import { List } from 'sylas-react-ui'
import ThumbUpOutlineIcon from 'mdi-react/ThumbUpOutlineIcon'
import BookmarkAddOutlineIcon from 'mdi-react/BookmarkAddOutlineIcon'
import ThumbUpIcon from 'mdi-react/ThumbUpIcon'
import ForumOutlineIcon from 'mdi-react/ForumOutlineIcon'
import * as articleApi from '@/apis/article'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import * as articleDetailAction from '@/views/articleDetail/store/action'

function ArticleStatsPanel() {
	const dispatch = useDispatch()
	const theme = useSelector(state => state.setting.theme)
	const { userId } = useSelector(state => state.userProfile)
	const detail = useSelector(state => state.article.detail)
	const { id: articleId, likes = [] } = detail

	const liked = likes.some(item => item?.toString?.() === userId?.toString?.())

	const handleDislike = React.useCallback(
		async (userId, detail) => {
			const { likes = [] } = detail
			try {
				await articleApi.dislikeArticle(userId, articleId)
				dispatch(
					articleDetailAction.updateDetail({
						...detail,
						likes: likes.filter(item => item?.toString?.() !== userId?.toString?.())
					})
				)
			} catch (err) {
				console.error('取消点赞失败', err)
			}
		},
		[articleId, dispatch]
	)

	const handleLike = React.useCallback(
		async (userId, detail) => {
			const { likes = [] } = detail
			try {
				await articleApi.likeArticle(userId, articleId)
				dispatch(
					articleDetailAction.updateDetail({
						...detail,
						likes: [...likes, userId]
					})
				)
			} catch (err) {
				console.error('点赞失败', err)
			}
		},
		[articleId, dispatch]
	)

	const handleToggleLike = React.useCallback(
		() => (userId && articleId && liked ? handleDislike(userId, detail) : handleLike(userId, detail)),
		[articleId, detail, handleDislike, handleLike, liked, userId]
	)

	return (
		<Panel className={style[`article_stats_panel_${theme}`]}>
			<List>
				<List.Item
					className={clsx(style.item, { [style.actived]: liked })}
					hovered
					ripple
					bordered={false}
					onClick={handleToggleLike}
				>
					{liked ? <ThumbUpIcon size={20} /> : <ThumbUpOutlineIcon size={20} />}
					获赞：<strong>{likes.length}</strong>
				</List.Item>
				<List.Item className={style.item} hovered ripple bordered={false}>
					<BookmarkAddOutlineIcon size={20} />
					被收藏：<strong>999</strong>
				</List.Item>
				<List.Item className={style.item} hovered ripple bordered={false}>
					<ForumOutlineIcon size={20} />
					评论数：<strong>999</strong>
				</List.Item>
			</List>
		</Panel>
	)
}

export default ArticleStatsPanel
