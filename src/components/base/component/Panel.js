import React from 'react'
import style from '../style/index.module.scss'
import clsx from 'clsx'

export default function Panel(props) {
  const { children, className } = props
  const panelCls = clsx(style.panel, className)
  return <section className={panelCls}>{children}</section>
}
