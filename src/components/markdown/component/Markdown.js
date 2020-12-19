import React from 'react'
import MarkdownToJSX from 'markdown-to-jsx'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import style from '../style/index.module.scss'
import { getlang } from '../util'
import { useSelector } from 'react-redux'
import { LinkOutlined, CopyOutlined } from '@ant-design/icons'
import useClipboard from 'use-clipboard-hook'
import { msg } from '@/components/base'
import { useTranslation } from 'react-i18next'

const Fragment = props => <>{props.children}</>

const Blockquote = props => <blockquote className={style.blockquote}>{props.children}</blockquote>

const Img = props => (
	<div className={style.pic}>
		<img className={style.pic} alt="" {...props} />
	</div>
)

const Pre = props => {
	const { children } = props
	const { t } = useTranslation()
	let codeContent
	if (children.props?.children && typeof children.props.children === 'string') {
		codeContent = children.props.children
	}
	const { ref, copy } = useClipboard({
		onSuccess(text) {
			if (text) {
				msg.info(`${t('info.copy_code_to_clipboard')}`)
			}
		}
	})
	return (
		<div style={{ position: 'relative' }}>
			<div onClick={copy} className={style.copy_btn}>
				<CopyOutlined />
				<span ref={ref} className={style.copy_text}>
					{codeContent}
				</span>
			</div>
			<pre className={style.code_wrapper}>{props.children}</pre>
		</div>
	)
}

// 防止 SyntaxHighlighter 重复注入 props.language ，进而引发组件频繁重渲染造成性能问题。
const Highlight = React.memo(props => {
	const { language, children } = props
	return (
		<SyntaxHighlighter PreTag={Fragment} style={vs} language={language}>
			{children}
		</SyntaxHighlighter>
	)
})

function Code(props) {
	const { children, className } = props
	return <Highlight language={getlang(className)}>{children}</Highlight>
}

const A = props => (
	<a target="blank" {...props}>
		<LinkOutlined />
		{props.children}
	</a>
)

function Markdown(props) {
	const theme = useSelector(state => state.setting.theme)
	return (
		<div className={style[`markdown_wrapper_${theme}`]}>
			<MarkdownToJSX
				options={{
					disableParsingRawHTML: true,
					overrides: {
						blockquote: Blockquote,
						code: Code,
						pre: Pre,
						img: Img,
						a: A
					}
				}}
			>
				{props.children}
			</MarkdownToJSX>
		</div>
	)
}

export default React.memo(Markdown)
