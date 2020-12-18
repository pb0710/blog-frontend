import React, { useEffect } from 'react'
import style from '../style/index.module.scss'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FlexiblePage } from '@/components/page'
import { Markdown } from '@/components/markdown'
import * as articleApi from '@/apis/article'
import { increaseArticleViews, updateArticleDetail } from '../store/action'
import { msg, Skeleton } from '@/components/base'
import { AspectRatio, Divider, Tag } from 'sylas-react-ui'
import { useFetch, useScrollToTop } from '@/utils/hooks'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import Comments from './Comments'
import config from '@/config'

export default function ArticleDetail() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const theme = useSelector(state => state.setting.theme)
	const detail = useSelector(state => state.articleDetail)
	const { content = '', backgroundImage = '', tags = [], creationTime, views = 0 } = detail
	const { id } = useParams()
	useScrollToTop()
	const { data, loading } = useFetch(async () => articleApi.fetchDetail(id), {
		initialData: {},
		loadingDelay: config.LOADING_DELAY,
		ready: !!id,
		refreshDeps: [id],
		onSuccess(res) {
			if (res?.content) {
				dispatch(updateArticleDetail(res))
			}
		},
		onError(err) {
			if (err) {
				msg.error(err)
			}
		}
	})

	useEffect(() => {
		if (id) {
			dispatch(increaseArticleViews(id))
		}
	}, [dispatch, id])

	const infoElement = (
		<div className={style.info}>
			<div className={style[`author_${theme}`]}>
				{/* <Link to="/user">{data.author}</Link> */}
				{data.author}
			</div>
			<div className={style.article}>
				<div>
					{dayjs(creationTime).isValid() && (
						<span>{dayjs(creationTime).format(`${t('article_detail.create_date')} HH:mm:ss`)}</span>
					)}
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
			<AspectRatio aspectRatio={5 / 8}>
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

	return (
		<FlexiblePage className={style.article_detail_page}>
			<section className={style.article_detail_wrapper}>
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
