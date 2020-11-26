import React from 'react'
import style from '../style/index.module.scss'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FlexiblePage } from '@/components/page'
import { Markdown } from '@/components/markdown'
import * as articleApi from '@/apis/article'
import * as action from '../store/action'
import { msg } from '@/components/base'
import { Tag } from 'sylas-react-ui'
import { useFetch } from '@/utils/hooks'
import dayjs from 'dayjs'

export default function ArticleDetail() {
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

	return (
		<FlexiblePage className={style.article_detail}>
			<section className={style.article_wrapper}>
				{loading ? (
					<div className={style.bg_skeleton}></div>
				) : (
					<img className={style.bg_pic} src={backgroundImage} alt="" />
				)}
				<div className={style.info}>
					<div>
						{dayjs(creationTime).isValid() && <span>{dayjs(creationTime).format('YYYY年MM月DD日HH:mm:ss')}</span>}
						<span>总字数：{content.length}</span>
						<span>阅读量：{views}</span>
					</div>
					<div className={style.tags_wrapper}>
						{tags.map((tag, index) => (
							<Tag key={index} color={theme}>
								{tag}
							</Tag>
						))}
					</div>
				</div>
				<Markdown>{content}</Markdown>
			</section>
		</FlexiblePage>
	)
}