import React from 'react'
import { useTranslation } from 'react-i18next'
import style from '../style/index.module.scss'

/**
 * 文本编辑器
 * @param {{
 * 	content: string,
 * 	setContent: (value: React.SetStateAction<string>) => void,
 * 	handleInput: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
 * 	handleEnterEditor: (event: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => void,
 * 	handleLeave: (event: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => void,
 * 	handleScrollEditor: (event: React.UIEvent<HTMLTextAreaElement, UIEvent>) => void,
 * }} props
 * @param {React.MutableRefObject<any>} ref
 * @returns
 */
function Editor(props, ref) {
	const { content, setContent, handleInput, handleEnterEditor, handleLeave, handleScrollEditor } = props
	const { t } = useTranslation()

	// textarea 默认 tab 切换表单元素，改为缩进
	const pressTab = event => {
		event.preventDefault()
		const elem = event.target
		const tabIndentStep = 2

		setContent(oldContent => {
			const start = elem.selectionStart
			const end = elem.selectionEnd
			const prefix = oldContent.substring(0, start)
			const suffix = oldContent.substring(end, oldContent.length)
			const tabPlaceholder = ''.padEnd(tabIndentStep)

			const newContent = `${prefix}${tabPlaceholder}${suffix}`

			// 设置光标位置会有延迟，需特殊处理
			setTimeout(() => {
				elem.focus()
				elem.selectionStart = start + tabIndentStep
				elem.selectionEnd = start + tabIndentStep
			})
			return newContent
		})
	}

	const handleKeyDown = event => {
		let isTab = event.type === 'keydown' && (event.key === 'Tab' || event.keyCode === 9)
		if (isTab) {
			pressTab(event)
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
