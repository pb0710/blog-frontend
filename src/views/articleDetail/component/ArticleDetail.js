import React, { useEffect } from 'react'
import style from '../style/index.module.scss'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FlexiblePage } from '@/components/page'
import { Markdown } from '@/components/markdown'
import * as articleApi from '@/apis/article'
import * as userApi from '@/apis/user'
import { increaseArticleViews, updateArticleAuthorProfile, updateArticleDetail } from '../store/action'
import { msg, Skeleton } from '@/components/base'
import { AspectRatio, Divider, Tag } from 'sylas-react-ui'
import { useFetch, useScrollToTop } from '@/utils/hooks'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import Comments from './Comments'
import config from '@/config'
import clsx from 'clsx'
import defaultAvatar from '@/assets/images/default_avatar.jpg'

export default function ArticleDetail() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const theme = useSelector(state => state.setting.theme)
	const articleDetail = useSelector(state => state.articleDetail)
	const articleAuthorProfile = useSelector(state => state.articleAuthorProfile)
	const { content = '', backgroundImage = '', tags = [], creationTime, views = 0, author } = articleDetail
	const { nickname, avatar } = articleAuthorProfile
	const { id: articleId } = useParams()
	useScrollToTop()

	const { loading } = useFetch(async () => articleApi.fetchDetail(articleId), {
		initialData: {},
		loadingDelay: config.LOADING_DELAY,
		ready: articleId != null,
		refreshDeps: [articleId],
		onSuccess(res) {
			dispatch(updateArticleDetail(res))
			dispatch(increaseArticleViews(articleId))
		},
		onError(err) {
			msg.error(err)
		}
	})

	useFetch(async () => userApi.fetchProfile(author), {
		initialData: {},
		loadingDelay: config.LOADING_DELAY,
		ready: !!author,
		refreshDeps: [author],
		onSuccess(res) {
			dispatch(updateArticleAuthorProfile(res))
		}
	})

	useEffect(
		() => () => {
			dispatch(updateArticleDetail({}))
			dispatch(updateArticleAuthorProfile({}))
		},
		[dispatch]
	)

	const infoElement = (
		<div className={style.info}>
			<div className={style[`author_${theme}`]}>
				<img alt="" src={avatar || defaultAvatar} />
				<div className={style.right_wrapper}>
					<strong className={style.nickname}>{nickname}</strong>
					<br />
					{dayjs(creationTime).isValid() && (
						<span className={style.creation_time}>
							{dayjs(creationTime).format(`${t('article_detail.create_date')} HH:mm:ss`)}
						</span>
					)}
				</div>
			</div>
			<div className={style.article}>
				<div>
					<span>
						{t('article_detail.total_words')}
						{content.length}
					</span>
					<span>
						{t('article_detail.views')}
						{views}
					</span>
				</div>
				<div className={style.tags_wrapper}>
					{tags.map((tag, index) => (
						<Tag key={index} color={theme}>
							{tag}
						</Tag>
					))}
				</div>
			</div>
		</div>
	)

	const skeletonElement = (
		<div className={style.skeleton_wrapper}>
			<AspectRatio aspectRatio={9 / 16}>
				<Skeleton className={style.bg_skeleton} />
			</AspectRatio>
			<div className={style.content_skeleton}>
				<Skeleton className={style.heading} />
				<Skeleton className={style.content1} />
				<Skeleton className={style.content2} />
				<Skeleton className={style.content3} />
			</div>
		</div>
	)

	const detailCls = clsx(style.article_detail_wrapper, {
		[style.loading]: loading
	})

	return (
		<FlexiblePage className={style.article_detail_page}>
			<section className={detailCls}>
				{loading ? (
					skeletonElement
				) : (
					<>
						<img className={style.bg_pic} src={backgroundImage} alt="" />
						{infoElement}
						<article className={style.article_content}>
							<Markdown>{content}</Markdown>
						</article>
						<Divider />
						<Comments />
					</>
				)}
			</section>
		</FlexiblePage>
	)
}
