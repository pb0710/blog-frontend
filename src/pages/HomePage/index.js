import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Container, Paper, Button, List, ListItem } from 'ui'
import ArticleCard from 'components/ArticleCard'
import AffixContainer from 'components/AffixContainer'
import Panel from 'components/Panel'
import FlexablePage from 'components/FlexablePage'

const useStyles = makeStyles({
	root: {
		
	},
	wrapper: {
		// 偏移右下，宽度-1
		width: 791,
		overflow: 'hidden',
	},
	grid: {
		display: 'flex',
		flexFlow: 'wrap',
		width: 800,
		marginRight: '-1px',
		marginBottom: '-1px',
	},
})

export default function HomePage(props) {

	const {

	} = props

	const classes = useStyles()

	return (
		<FlexablePage className={classes.root}>
			<Paper className={classes.wrapper}>
				<div className={classes.grid}>
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
					<ArticleCard />
				</div>
			</Paper>

			<AffixContainer>
				<Panel title="一句">


				</Panel>
			</AffixContainer>
		</FlexablePage>
	)
}