import React from 'react'
import style from './style/index.module.scss'
import { FlexiblePage } from '@/components/page'
import { ArticleCard } from '@/components/article'
import * as articleApi from '@/apis/article'
import { useParams } from 'react-router-dom'
import { useFetch } from '@/utils/hooks'

export default function ArticleList() {
	const { sort } = useParams()
	const { data, excute } = useFetch(articleApi.fetchList, {
		initData: [],
		immutable: true
	})

	React.useEffect(() => {
		excute(sort)
	}, [excute, sort])

	return (
		<FlexiblePage className={style.article_list_page}>
			<article className={style.article_list}>
				{data.map(article => (
					<ArticleCard key={article.id} {...article} />
				))}
			</article>
		</FlexiblePage>
	)
}
