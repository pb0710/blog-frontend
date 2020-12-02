import React from 'react'
import { useTranslation } from 'react-i18next'
import style from '../style/index.module.scss'

function Editor(props, ref) {
	const { content, setContent, handleInput, handleEnterEditor, handleLeave, handleScrollEditor } = props
	const { t } = useTranslation()

	const pressTab = e => {
		e.preventDefault()
		const elem = e.target
		const tabIndentStep = 2

		setContent(oldContent => {
			const start = elem.selectionStart
			const end = elem.selectionEnd
			const prefix = oldContent.substring(0, start)
			const suffix = oldContent.substring(end, oldContent.length)
			const tabPlaceholder = ''.padEnd(tabIndentStep)

			const newContent = `${prefix}${tabPlaceholder}${suffix}`

			// 设置光标位置会有延迟，需特殊处理
			setTimeout(function () {
				elem.focus()
				elem.selectionStart = start + tabIndentStep
				elem.selectionEnd = start + tabIndentStep
			})
			return newContent
		})
	}

	const handleKeyDown = e => {
		let isTab = e.type === 'keydown' && (e.key === 'Tab' || e.keyCode === 9)
		if (isTab) {
			pressTab(e)
		}
	}

	return (
		<article className={style.editor}>
			<textarea
				ref={ref}
				value={content}
				onChange={handleInput}
				onMouseEnter={handleEnterEditor}
				onMouseLeave={handleLeave}
				onScroll={handleScrollEditor}
				onKeyDown={handleKeyDown}
				placeholder={t('markdown.placeholder')}
			></textarea>
		</article>
	)
}

export default React.forwardRef(Editor)
