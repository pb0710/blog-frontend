import React from 'react'
import { makeStyles } from '@material-ui/styles'
import FlexablePage from 'components/FlexablePage'
import ArticleDetail from 'components/ArticleDetail'

const useStyles = makeStyles({
	root: {},
	backgroundImageWrapper: {
		width: '100%',
		height: 520,

		'&>img': {
			width: '100%',
			height: '100%',
			maxWidth: '100%',
			maxHeight: '100%',
			objectFit: 'cover',
			verticalAlign: 'text-top'
		}
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
			<div className={classes.backgroundImageWrapper}>
				<img src="http://111.229.246.221/image/book/sy04.jpg" />
			</div>
			<div className={classes.container}>
				<div className={classes.articleWrapper}>
					<ArticleDetail />
				</div>
			</div>
		</FlexablePage>
	)
}
