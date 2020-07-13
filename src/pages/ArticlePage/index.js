import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useParams } from 'react-router-dom'
import FlexablePage from 'components/FlexablePage'
import ArticleDetail from 'components/ArticleDetail'
import * as articleApi from 'apis/article'
import { Paper } from 'sylas-react-ui'

const useStyles = makeStyles({
	root: {},
	container: {
		width: 1048,
		padding: '0 16px',
		margin: 0
	},
	banner: {
		width: '100%',

		'&>img': {
			width: '100%',
			height: '100%',
			maxWidth: '100%',
			maxHeight: '100%',
			objectFit: 'cover',
			verticalAlign: 'text-top'
		}
	},
	articleWrapper: {
		width: 792,
		marginBottom: 16
	}
})

export default function ArticlePage(props) {
	const {} = props
	const { id } = useParams()
	const [article, setArticle] = React.useState('')
	const [backgroundImage, setBackgroundImage] = React.useState('')
	const classes = useStyles()

	const fetchArticleDetail = async () => {
		try {
			const { content, backgroundImage } = await articleApi.fetchDetail(id)
			setArticle(content)
			setBackgroundImage(backgroundImage)
		} catch (e) {
			console.error(e)
		}
	}

	React.useEffect(() => {
		fetchArticleDetail()
	}, [])

	return (
		<FlexablePage className={classes.root}>
			<div className={classes.container}>
				<Paper className={classes.articleWrapper}>
					<div className={classes.banner}>
						<img src={backgroundImage} />
					</div>
					<ArticleDetail content={article} />
				</Paper>
			</div>
		</FlexablePage>
	)
}
