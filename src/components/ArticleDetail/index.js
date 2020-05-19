import React from 'react'
import { makeStyles } from '@material-ui/styles'
import ReactMarkdown from 'react-markdown'
import CodeBlock from 'components/CodeBlock'

const useStyles = makeStyles({
	root: {
		boxSizing: 'border-box',
		width: '100%',
		padding: ({ content }) => content && 24
	}
})

export default function ArticleDetail(props) {
	const { content } = props
	const classes = useStyles({ content })

	return (
		<article className={classes.root}>
			<ReactMarkdown
				source={content}
				escapeHtml={true}
				renderers={{
					inlineCode: CodeBlock,
					code: CodeBlock
				}}
			/>
		</article>
	)
}
