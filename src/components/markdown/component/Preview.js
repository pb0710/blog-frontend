import React from 'react'
import Markdown from './Markdown'
import style from '../style/index.module.scss'

/**
 * @param {{
 * 	content: string,
 * 	handleInput: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
 * 	handleEnterPreview: (event: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => void,
 * 	handleLeave: (event: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => void,
 * 	handleScrollPreview: (event: React.UIEvent<HTMLTextAreaElement, UIEvent>) => void,
 * }} props
 * @param {React.MutableRefObject<any>} ref
 * @returns
 */
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
