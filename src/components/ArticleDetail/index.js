import React from 'react'
import { makeStyles } from '@material-ui/styles'
import ReactMarkdown from 'react-markdown'
import { Paper } from 'ui'
import { markdown } from 'common/markdownTemp'

const useStyles = makeStyles({
	root: {
		boxSizing: 'border-box',
		width: '100%',
		padding: 24
	}
})

export default function ArticleDetail(props) {
	const {} = props

	const classes = useStyles()

	return (
		<Paper className={classes.root}>
			<ReactMarkdown source={markdown} escapeHtml={false} />
		</Paper>
	)
}
