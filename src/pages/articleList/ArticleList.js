import React from 'react'
import style from './style/index.module.scss'
import { FlexiblePage } from '@/components/page'
import { ArticleCard } from '@/components/article'
import * as articleApi from '@/apis/article'
import { useParams } from 'react-router-dom'
import { useFetch } from '@/utils/hooks'

export default function ArticleList() {
  const { sort } = useParams()
  const fetchArticles = React.useCallback(() => articleApi.fetchList(sort), [sort])
  const { data } = useFetch(fetchArticles, {})
  const articles = data.message === 'ok' ? data.payload : []

  return (
    <FlexiblePage className={style.article_list_page}>
      <article className={style.article_list}>
        {articles.map(article => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </article>
    </FlexiblePage>
  )
}
