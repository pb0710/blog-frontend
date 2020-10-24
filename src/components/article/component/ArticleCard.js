import React from 'react'
import { Link } from 'react-router-dom'
import style from '../style/index.module.scss'
import { AspectRatio } from '@/components/base'

export default function ArticleCard(props) {
	const { id, author, sort, title, backgroundImage = 'https://iph.href.lu/200x200', views, tags = [] } = props

	const aritcleLink = `/detail/${id}`
	const authorLink = `/user/${1}`

	return (
		<div className={style.article_card_wrapper}>
			<div className={style.article_card}>
				<AspectRatio aspectRatio={4 / 3}>
					<Link to={aritcleLink}>
						<div className={style.cover}>
							<img src={backgroundImage} alt="cover_pic" />
						</div>
					</Link>
					<div className={style.bottom}>
						<Link className={style.title} to={aritcleLink}>
							<h3>{title}</h3>
						</Link>
						<Link className={style.author} to={authorLink}>
							{author}
						</Link>
					</div>
				</AspectRatio>
			</div>
		</div>
	)
}
