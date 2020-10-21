import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Button } from 'sylas-react-ui'
import style from './style/index.module.scss'
import { FullScreenPage } from '@/components/page'

export default function NotFound() {
  const history = useHistory()

  const handleGoback = () => {
    history.goBack()
  }

  return (
    <FullScreenPage className={style.not_found_page}>
      <div className={style.prompt}>
        <h1>页面找不到啦...</h1>

        <div className={style.operation}>
          <Button className={style.go_back} onClick={handleGoback}>
            后退
          </Button>
          <Link to="/">
            <Button color="primary">返回首页</Button>
          </Link>
        </div>
      </div>
    </FullScreenPage>
  )
}