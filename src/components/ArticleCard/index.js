import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Divider, Link, Tag } from 'ui'
import { EyesIcon } from 'ui/utils/icons'

const useStyles = makeStyles({
	root: {
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column',
		width: 264,
		height: 304,
		background: '#fff',
		padding: 16,
		borderRight: '1px solid #f1f1f1',
		borderBottom: '1px solid #f1f1f1',
		transition: 'all 250ms ease-out',

		'&:hover': {
			boxShadow: '0 4px 40px rgba(0,0,0,.08)',
			zIndex: 8,

			'& img': {
				transform: 'scale(1.1)',
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
			transition: 'transform 250ms ease-out',
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
			overflow: 'hidden',
		}
	},
	divider: {
		background: '#f6f6f6',
	},
	infoFooter: {
		display: 'flex',
		alignItems: 'center',
		height: 32,
	},
	views: {
		display: 'flex',
		alignItems: 'center',

		'&>span': {
			fontSize: 12,
			marginLeft: 4,
		}
	},
	tagsWrapper: {
		display: 'flex',
		flexDirection: 'row-reverse',
		width: '100%',

		'&>div': {
			marginLeft: 8,
		}
	}
})

export default function ArticleCard(props) {

	const {
		id,
		title = 'Linux操作系统',
		imageUrl = "https://iph.href.lu/300x200?fg=ffffff&bg=43ad7f",
		viewsCount = '3000',
		tags = [],
	} = props

	const views = useMemo(
		() => viewsCount.toString().length > 3
			? `${Number(viewsCount / 1000).toFixed(1)}K`
			: viewsCount,
		[viewsCount]
	)

	const classes = useStyles()

	return (
		<div className={classes.root}>
			<div className={classes.imgWrapper}>
				<Link>
					<img src={imageUrl} />
				</Link>
			</div>
			<div className={classes.info}>
				<h2>
					<Link>
						{title}
					</Link>
				</h2>
				<Divider className={classes.divider} />
				<div className={classes.infoFooter}>
					<div className={classes.views}>
						<EyesIcon />
						<span>{views}</span>
					</div>
					<div className={classes.tagsWrapper}>
						<Tag>JavaScript</Tag>
						<Tag>前端</Tag>
					</div>
				</div>
			</div>
		</div>
	)
}