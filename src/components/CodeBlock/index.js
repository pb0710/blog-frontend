import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export default function CodeBlock({ value, language }) {
	return (
		<SyntaxHighlighter language={language} style={atomOneLight}>
			{value}
		</SyntaxHighlighter>
	)
}
