import React from 'react'
import MarkdownToJSX from 'markdown-to-jsx'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import style from '../style/index.module.scss'
import { getlang } from '../util'
import { useSelector } from 'react-redux'

const Fragment = props => <>{props.children}</>

const Img = props => (
	<span className={style.pic}>
		<img alt="" {...props} />
	</span>
)

const Pre = props => <pre className={style.code_wrapper}>{props.children}</pre>

// 防止 SyntaxHighlighter 大量重渲染
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
