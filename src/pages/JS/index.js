import React from 'react'
import { makeStyles } from '@material-ui/styles'
import FlexablePage from 'components/FlexablePage'
import ArticleDetail from 'components/ArticleDetail'

const useStyles = makeStyles({
	root: {},
	backgroundImage: {
		width: '100%',
		height: 480,
		background: 'skyblue'
	},
	container: {
		width: 1048,
		height: '100%',
		padding: '0 16px',
		margin: 0,
		position: 'absolute',
		top: 320
	},
	articleWrapper: {
		width: 792,
		marginBottom: 16
	}
})

export default function JS(props) {
	const {} = props

	const classes = useStyles()

	return (
		<FlexablePage className={classes.root}>
			<div className={classes.backgroundImage}></div>
			<div className={classes.container}>
				<div className={classes.articleWrapper}>
					<ArticleDetail />
				</div>
			</div>
		</FlexablePage>
	)
}
