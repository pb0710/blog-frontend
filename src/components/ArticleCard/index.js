import React, { memo, useMemo } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Divider, Link, Tag } from 'ui'
import { EyesIcon } from 'ui/utils/icons'

const useStyles = makeStyles({
	root: {
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column',
		width: '33%',
		height: 304,
		background: '#fff',
		padding: 16,
		borderRight: '1px solid #f1f1f1',
		borderBottom: '1px solid #f1f1f1',
		transition: 'all 250ms ease-out',

		'&:hover': {
			boxShadow: '0 4px 40px rgba(0,0,0,.04)',
			zIndex: 8,

			'& img': {
				transform: 'scale(1.04)',
				filter: 'brightness(1.04)'
			}
		}
	},
	imgWrapper: {
		width: '100%',
		height: 168,
		overflow: 'hidden',

		'& img': {
			width: '100%',
			height: '100%',
			maxWidth: '100%',
			maxHeight: '100%',
			objectFit: 'cover',
			verticalAlign: 'text-top',
			transition: 'all 200ms ease-out'
		}
	},
	info: {
		width: '100%',

		'& h2': {
			fontStyle: 'inherit',
			fontWeight: 'inherit',
			fontSize: 15,
			height: 42,
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis',
			overflow: 'hidden'
		}
	},
	divider: {
		background: '#f6f6f6'
	},
	infoFooter: {
		display: 'flex',
		alignItems: 'center',
		height: 32
	},
	views: {
		display: 'flex',
		alignItems: 'center',

		'&>span': {
			fontSize: 12,
			marginLeft: 4
		}
	},
	tagsWrapper: {
		display: 'flex',
		flexDirection: 'row-reverse',
		width: '100%',

		'&>div': {
			marginLeft: 8
		}
	}
})

export default memo(function ArticleCard(props) {
	const { id, sort = '', title = '', imageUrl = '', viewsCount = '', tags = [] } = props

	const views = useMemo(
		() => (viewsCount.toString().length > 3 ? `${Number(viewsCount / 1000).toFixed(1)}K` : viewsCount),
		[viewsCount]
	)

	const path = `/article/${sort}/detail/${id}`

	const classes = useStyles()

	return (
		<div className={classes.root}>
			<div className={classes.imgWrapper}>
				<Link to={path}>
					<img src={imageUrl} />
				</Link>
			</div>
			<div className={classes.info}>
				<h2>
					<Link to={path}>{title}</Link>
				</h2>
				<Divider className={classes.divider} />
				<div className={classes.infoFooter}>
					<div className={classes.views}>
						<EyesIcon />
						<span>{views}</span>
					</div>
					<div className={classes.tagsWrapper}>
						{tags.map(tag => (
							<Tag key={tag}>{tag}</Tag>
						))}
					</div>
				</div>
			</div>
		</div>
	)
})
