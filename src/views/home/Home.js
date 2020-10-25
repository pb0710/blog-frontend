import React from 'react'
import style from './style/index.module.scss'
import { FlexiblePage } from '@/components/page'

export default function Home() {
  return (
    <FlexiblePage className={style.home_page}>
      <h1>home</h1>
    </FlexiblePage>
  )
}
