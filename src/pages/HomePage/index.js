import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Paper, Loading } from 'ui'
import * as api from 'apis'
import ArticleCard from 'components/ArticleCard'
import AffixContainer from 'components/AffixContainer'
import Panel from 'components/Panel'
import FlexablePage from 'components/FlexablePage'

const useStyles = makeStyles({
	root: {},
	container: {
		width: 1048,
		height: '100%',
		padding: '0 16px',
		paddingTop: 68,
		paddingBottom: 16,
		margin: 0
	},
	wrapper: {
		// 偏移右下，宽度-1
		width: 791,
		overflow: 'hidden'
	},
	grid: {
		display: 'flex',
		flexFlow: 'wrap',
		width: 800,
		marginRight: '-1px',
		marginBottom: '-1px'
	},
	loadingWrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 'calc(100vh - 84px)'
	}
})

export default function HomePage(props) {
	const {} = props

	const [articleList, setArticleList] = useState([])
	const classes = useStyles()

	const getArticleList = async () => {
		try {
			const result = await api.fetchArticleList()
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
			<div className={classes.container}>
				<Paper className={classes.wrapper}>
					{articleList.length > 0 ? (
						<div className={classes.grid}>
							{articleList.map(({ id, title, backgroundImage, views, tags }) => (
								<ArticleCard
									key={id}
									id={id}
									title={title}
									imageUrl={backgroundImage}
									viewsCount={views}
									tags={tags}
								/>
							))}
						</div>
					) : (
						<div className={classes.loadingWrapper}>
							<Loading color="primary" />
						</div>
					)}
				</Paper>
			</div>
			<AffixContainer>
				<Panel title="一句"></Panel>
			</AffixContainer>
		</FlexablePage>
	)
}
