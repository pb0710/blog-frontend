import React, { memo } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Paper, Loading } from 'ui'
import ArticleCard from 'components/ArticleCard'

const useStyles = makeStyles({
	root: {
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
		height: 'calc(100vh - 88px)'
	}
})

export default memo(function ArticleCollection(props) {
	const { articleList } = props

	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Paper className={classes.wrapper}>
				{articleList.length > 0 ? (
					<div className={classes.grid}>
						{articleList.map(({ id, sort, title, backgroundImage, views, tags }, index) => (
							<ArticleCard
								key={index}
								id={id}
								sort={sort}
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
	)
})
