import React from 'react'
import style from '../style/index.module.scss'
import { useSelector } from 'react-redux'
import { Panel } from '@/components/base'
import { List } from 'sylas-react-ui'
import { UserOutlined, LikeOutlined, EyeOutlined } from '@ant-design/icons'
import clsx from 'clsx'

export default function AuthorCard() {
  const { detail } = useSelector(state => state.article)

  const avatarItemCls = clsx(style.item, style.name_wrapper)

  return (
    <Panel className={style.author_card}>
      <List>
        <List.Item className={avatarItemCls}>
          <div className={style.avatar}>
            <UserOutlined />
          </div>
          <div className={style.right_wrapper}>
            <p className={style.name}>{detail.author}</p>
            <div className={style.introduce}>时代发生的方式方法地方</div>
          </div>
        </List.Item>
        <List.Item className={style.item}>
          <LikeOutlined />
          <span>获赞：2048</span>
        </List.Item>
        <List.Item className={style.item}>
          <EyeOutlined />
          <span>阅读量：{detail.views}</span>
        </List.Item>
      </List>
    </Panel>
  )
}
