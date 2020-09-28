import React from 'react'
import style from './style/index.module.scss'
import { FlexiblePage } from '@/components/page'
import { ArticleCard } from '@/components/article'
import * as articleApi from '@/apis/article'

export default function Home() {
  const [articles, setArticles] = React.useState([])

  React.useEffect(() => {
    ;(async () => {
      try {
        const {
          payload: { aritcles = [] }
        } = await articleApi.fetchList()
        setArticles(aritcles)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])

  return (
    <FlexiblePage className={style.home_page}>
      <article className={style.article_list}>
        {articles.map(article => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </article>
    </FlexiblePage>
  )
}
