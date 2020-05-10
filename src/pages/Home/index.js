import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Container, Paper } from 'ui'
import ArticleCard from 'components/ArticleCard'

const useStyles = makeStyles({
	root: {
		
	},
	paper: {
		overflow: 'hidden',
	},
	grid: {
		display: 'flex',
		flexFlow: 'wrap',
		width: 792,
		marginRight: '-1px',
		marginBottom: '-1px',
	}
})

export default function Home(props) {

	const {

	} = props

	const classes = useStyles()

	return (
		<Container className={classes.root}>
			<Paper className={classes.paper}>
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
		</Container>
	)
}