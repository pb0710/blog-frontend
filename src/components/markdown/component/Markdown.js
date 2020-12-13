import React from 'react'
import MarkdownToJSX from 'markdown-to-jsx'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import style from '../style/index.module.scss'
import { getlang } from '../util'
import { useSelector } from 'react-redux'

const Fragment = props => <>{props.children}</>

const Blockquote = props => <blockquote className={style.blockquote}>{props.children}</blockquote>

const Img = props => (
	<div className={style.pic}>
		<img className={style.pic} alt="" {...props} />
	</div>
)

const Pre = props => <pre className={style.code_wrapper}>{props.children}</pre>

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
						img: Img
					}
				}}
			>
				{props.children}
			</MarkdownToJSX>
		</div>
	)
}

export default React.memo(Markdown)
