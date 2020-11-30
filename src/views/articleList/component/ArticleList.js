import React from 'react'
import style from '../style/index.module.scss'
import { FlexiblePage } from '@/components/page'
import { ArticleCard } from '@/components/article'
import * as articleApi from '@/apis/article'
import { useParams } from 'react-router-dom'
import { useFetch } from '@/utils/hooks'
import { Skeleton } from '@/components/base'
import { AspectRatio } from 'sylas-react-ui'
import clsx from 'clsx'

export default function ArticleList() {
	const { sort } = useParams()
	const { data, excute, loading } = useFetch(articleApi.fetchList, {
		initData: [],
		immutable: true
	})

	React.useEffect(() => {
		excute(sort)
	}, [excute, sort])

	const skeletonElement = Object.keys([...Array(12)]).map(key => (
		<div key={key} className={style.skeleton}>
			<AspectRatio aspectRatio={4 / 3}>
				<div className={style.inner}>
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			</AspectRatio>
		</div>
	))

	const pageCls = clsx(style.article_list_page, {
		[style.fixed]: loading
	})
	const listCls = loading ? style.skeleton_list : style.article_list

	return (
		<FlexiblePage className={pageCls} style={{ paddingBottom: 0 }}>
			<article className={listCls}>
				{loading ? skeletonElement : data.map(article => <ArticleCard key={article.id} {...article} />)}
			</article>
		</FlexiblePage>
	)
}
