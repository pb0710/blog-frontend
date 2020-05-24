import React, { memo, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import * as api from 'apis'
import ArticleCollection from 'components/ArticleCollection'
import AffixContainer from 'components/AffixContainer'
import Panel from 'components/Panel'
import FlexablePage from 'components/FlexablePage'

const useStyles = makeStyles({
	root: {}
})

export default memo(function ArticleListPage(props) {
	const { sort } = props

	const [articleList, setArticleList] = useState([])
	const classes = useStyles()

	const getArticleList = async () => {
		try {
			const result = await api.fetchArticleList(sort)
			setArticleList(result)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
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
