import React from 'react'
import Markdown from './Markdown'
import style from '../style/index.module.scss'

function Preview(props, ref) {
  return (
    <article
      ref={ref}
      className={style.preview}
      onScroll={props.handleScrollPreview}
      onMouseEnter={props.handleEnterPreview}
      onMouseLeave={props.handleLeave}
    >
      <Markdown>{props.content}</Markdown>
    </article>
  )
}

export default React.memo(React.forwardRef(Preview))
