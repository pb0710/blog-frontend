import React from 'react'
import style from './style/index.module.scss'
import { useParams } from 'react-router-dom'
import { FlexiblePage } from '@/components/page'
import { Markdown } from '@/components/markdown'
import * as articleApi from '@/apis/article'

export default function ArticleDetail() {
  const { id } = useParams()

  const [markdown, setMarkdown] = React.useState('')
  const [bgPic, setBgPic] = React.useState('')

  React.useEffect(() => {
    ;(async () => {
      try {
        const { payload: detail } = await articleApi.fetchDetail(id)
        setMarkdown(detail.content)
        setBgPic(detail.backgroundImage)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])

  return (
    <FlexiblePage className={style.article_detail}>
      <section className={style.article_container}>
        <Markdown>{markdown}</Markdown>
      </section>
    </FlexiblePage>
  )
}
