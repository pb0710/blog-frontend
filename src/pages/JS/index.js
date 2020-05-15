import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Container } from 'ui'
import FlexablePage from 'components/FlexablePage'
import ArticleDetail from 'components/ArticleDetail'

const useStyles = makeStyles({
	root: {

	},
	articleWrapper: {
		width: 792
	}
})

export default function JS(props) {

	const {

	} = props

	const classes = useStyles()

	return (
		<FlexablePage className={classes.root}>
			<div className={classes.articleWrapper}>
				<ArticleDetail />
			</div>
		</FlexablePage>
	)
}