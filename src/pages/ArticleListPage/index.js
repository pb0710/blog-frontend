import React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as articleApi from 'apis/article'
import ArticleCollection from 'components/ArticleCollection'
import AffixContainer from 'components/AffixContainer'
import Panel from 'components/Panel'
import FlexablePage from 'components/FlexablePage'

const useStyles = makeStyles({
	root: {}
})

export default React.memo(function ArticleListPage(props) {
	const { sort } = props

	const [articleList, setArticleList] = React.useState([])
	const classes = useStyles()

	const getArticleList = async () => {
		try {
			const result = await articleApi.fetchList(sort)
			setArticleList(result)
		} catch (e) {
			console.error(e)
		}
	}

	React.useEffect(() => {
		getArticleList()
	}, [])

	return (
		<FlexablePage className={classes.root}>
			<ArticleCollection articleList={articleList} />
			<AffixContainer>
				<Panel title=""></Panel>
			</AffixContainer>
		</FlexablePage>
	)
})
