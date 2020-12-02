import React from 'react'
import { useTranslation } from 'react-i18next'
import style from '../style/index.module.scss'

function Editor(props, ref) {
	const { t } = useTranslation()
	return (
		<article className={style.editor}>
			<textarea
				ref={ref}
				value={props.content}
				onChange={props.handleInput}
				onMouseEnter={props.handleEnterEditor}
				onMouseLeave={props.handleLeave}
				onScroll={props.handleScrollEditor}
				placeholder={t('markdown.placeholder')}
			></textarea>
		</article>
	)
}

export default React.memo(React.forwardRef(Editor))
