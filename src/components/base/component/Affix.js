import React from 'react'
import style from '../style/index.module.scss'
import clsx from 'clsx'

export default function Affix(props) {
  const { children, className } = props
  const affixCls = clsx(style.affix, className)
  return <section className={affixCls}>{children}</section>
}
