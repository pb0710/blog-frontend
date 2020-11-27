import React from 'react'
import style from '../style/index.module.scss'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FlexiblePage } from '@/components/page'
import { Markdown } from '@/components/markdown'
import * as articleApi from '@/apis/article'
import * as action from '../store/action'
import { msg, Skeleton } from '@/components/base'
import { Tag } from 'sylas-react-ui'
import { useFetch } from '@/utils/hooks'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

export default function ArticleDetail() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const theme = useSelector(state => state.setting.theme)
	const detail = useSelector(state => state.article.detail)
	const { content = '', backgroundImage = '', tags = [], creationTime, views = 0 } = detail
	const { id } = useParams()

	const { data, error, loading } = useFetch(articleApi.fetchDetail, {
		defaultParams: [id]
	})

	React.useEffect(() => {
		if (data?.content) {
			dispatch(action.updateDetail(data))
		}
		if (error) {
			msg.error(error)
		}
	}, [data, dispatch, error])

	React.useEffect(() => {
		dispatch(action.increaseArticleViews(id))
	}, [dispatch, id])

	const infoElement = (
		<div className={style.info}>
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
	)

	return (
		<FlexiblePage className={style.article_detail}>
			<section className={style.article_wrapper}>
				{loading ? (
					<Skeleton className={style.bg_skeleton}></Skeleton>
				) : (
					<img className={style.bg_pic} src={backgroundImage} alt="" />
				)}
				{infoElement}
				{loading ? (
					<div className={style.content_skeleton}>
						<Skeleton className={style.heading} />
						<Skeleton className={style.content1} />
						<Skeleton className={style.content2} />
						<Skeleton className={style.content3} />
					</div>
				) : (
					<Markdown>{content}</Markdown>
				)}
			</section>
		</FlexiblePage>
	)
}
