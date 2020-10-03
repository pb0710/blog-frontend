import React from 'react'
import style from './style/index.module.scss'
import { FlexiblePage } from '@/components/page'
import { ArticleCard } from '@/components/article'
import * as articleApi from '@/apis/article'
import { useParams } from 'react-router-dom'

export default function ArticleList() {
  const { sort } = useParams()
  const [articles, setArticles] = React.useState([])

  React.useEffect(() => {
    ;(async () => {
      try {
        const {
          payload: { aritcles = [] }
        } = await articleApi.fetchList(sort)
        setArticles(aritcles)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [sort])

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
