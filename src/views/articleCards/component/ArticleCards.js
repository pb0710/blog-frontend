import React from 'react'
import style from '../style/index.module.scss'
import { FlexiblePage } from '@/components/page'
import ArticleCard from './ArticleCard'
import * as articleApi from '@/apis/article'
import { useParams } from 'react-router-dom'
import { useFetch } from '@/utils/hooks'
import { Skeleton } from '@/components/base'
import { AspectRatio } from 'sylas-react-ui'
import clsx from 'clsx'

export default function ArticleCards() {
	const { category } = useParams()
	const { data, loading } = useFetch(articleApi.fetchList, {
		initialData: [],
		params: [{ category }],
		refreshDeps: [category]
	})

	const skeletonElement = (
		<article className={style.skeleton_list}>
			{Object.keys([...Array(12)]).map(key => (
				<div key={key} className={style.skeleton_card}>
					<AspectRatio aspectRatio={4 / 3}>
						<div className={style.container}>
							<Skeleton className={style.img_skeleton} />
							<div className={style.inner}>
								<Skeleton />
								<Skeleton />
								<Skeleton />
							</div>
						</div>
					</AspectRatio>
				</div>
			))}
		</article>
	)

	const cardsElement = (
		<article className={style.article_card_list}>
			{data.map(article => (
				<ArticleCard key={article.id} {...article} />
			))}
		</article>
	)

	const pageCls = clsx(style.article_list_page, {
		[style.fixed]: loading
	})

	return <FlexiblePage className={pageCls}>{loading ? skeletonElement : cardsElement}</FlexiblePage>
}
