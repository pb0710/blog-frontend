import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Container, Paper } from 'ui'
import ArticleCard from 'components/ArticleCard'
import AffixContainer from 'components/AffixContainer'

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
	},
	baseInfo: {
		width: '100%',
		height: 240,
		marginBottom: 16,
	},
	oneSentence: {
		width: '100%',
		height: 104,
	}
})

export default function Home(props) {

	const {

	} = props

	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Container>
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

			<AffixContainer>
				<Paper className={classes.baseInfo}>

				</Paper>
				<Paper className={classes.oneSentence}>
					
				</Paper>
			</AffixContainer>
		</div>
	)
}