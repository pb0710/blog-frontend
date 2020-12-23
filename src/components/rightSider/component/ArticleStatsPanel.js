import React, { useCallback } from 'react'
import style from '../style/index.module.scss'
import { msg, Panel } from '@/components/base'
import { List } from 'sylas-react-ui'
import ThumbUpOutlineIcon from 'mdi-react/ThumbUpOutlineIcon'
import BookmarkAddOutlineIcon from 'mdi-react/BookmarkAddOutlineIcon'
import ThumbUpIcon from 'mdi-react/ThumbUpIcon'
import ChatOutlineIcon from 'mdi-react/ChatOutlineIcon'
import EyeOutlineIcon from 'mdi-react/EyeOutlineIcon'
import * as articleApi from '@/apis/article'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import { updateArticleDetail } from '@/views/articleDetail/store/action'
import { useTranslation } from 'react-i18next'

function ArticleStatsPanel() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const theme = useSelector(state => state.setting.theme)
	const { userId } = useSelector(state => state.userProfile)
	const detail = useSelector(state => state.articleDetail)
	const { id: articleId, likes = [], views = 0, reviews = [] } = detail

	const liked = likes.some(item => String(item) === String(userId))

	const handleDislike = useCallback(
		async (userId, detail) => {
			const { likes = [] } = detail
			try {
				await articleApi.dislike(userId, articleId)
				dispatch(
					updateArticleDetail({
						...detail,
						likes: likes.filter(item => String(item) !== String(userId))
					})
				)
			} catch (err) {
				console.error('取消点赞失败', err)
			}
		},
		[articleId, dispatch]
	)

	const handleLike = useCallback(
		async (userId, detail) => {
			const { likes = [] } = detail
			try {
				await articleApi.like(userId, articleId)
				dispatch(
					updateArticleDetail({
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

	const handleToggleLike = () => {
		if (userId && articleId) {
			return liked ? handleDislike(userId, detail) : handleLike(userId, detail)
		}
		msg.error(t('error.login_first'))
	}

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
					{t('article_detail.likes')}
					<strong>{likes.length}</strong>
				</List.Item>
				<List.Item className={style.item} hovered ripple bordered={false}>
					<BookmarkAddOutlineIcon size={20} />
					{t('article_detail.collections')}
					<strong>0</strong>
				</List.Item>
				<List.Item className={style.item} bordered={false}>
					<EyeOutlineIcon size={20} />
					{t('article_detail.views')}
					<strong>{views}</strong>
				</List.Item>
				<List.Item className={style.item} bordered={false}>
					<ChatOutlineIcon size={20} />
					{t('article_detail.reviews')}
					<strong>{reviews.length}</strong>
				</List.Item>
			</List>
		</Panel>
	)
}

export default ArticleStatsPanel
