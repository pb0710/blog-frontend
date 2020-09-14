import React from 'react'
import { MarkdownEditor } from '@/components/markdown'
import style from './style/index.module.scss'

export default function ArticleUpload(props) {
  return (
    <div className={style.page}>
      <MarkdownEditor />
    </div>
  )
}
