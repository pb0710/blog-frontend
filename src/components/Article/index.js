import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import FlexablePage from 'components/FlexablePage'
import ArticleDetail from 'components/ArticleDetail'
import { useParams } from 'react-router-dom'
import * as api from 'apis'

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

export default function Article(props) {
	const {} = props

	const { id } = useParams()
	const [article, setArticle] = useState('')
	const [backgroundImage, setBackgroundImage] = useState('')
	const classes = useStyles()

	const fetchArticleDetail = async () => {
		try {
			const { content, backgroundImage } = await api.fetchArticleContent(id)
			setArticle(content)
			setBackgroundImage(backgroundImage)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		fetchArticleDetail()
	}, [])

	return (
		<FlexablePage className={classes.root}>
			<div className={classes.backgroundImageWrapper}>
				<img src={backgroundImage} />
			</div>
			<div className={classes.container}>
				<div className={classes.articleWrapper}>
					<ArticleDetail content={article} />
				</div>
			</div>
		</FlexablePage>
	)
}
