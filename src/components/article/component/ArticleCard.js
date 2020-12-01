import React from 'react'
import { Link } from 'react-router-dom'
import style from '../style/index.module.scss'
import { AspectRatio } from 'sylas-react-ui'
import { useSelector } from 'react-redux'

export default function ArticleCard(props) {
	const { id, author, category, title, backgroundImage } = props
	const theme = useSelector(state => state.setting.theme)

	const aritcleLink = `/article/${category}/detail/${id}`
	const authorLink = `/user/${1}`

	return (
		<div className={style.article_card_wrapper}>
			<div className={style[`article_card_${theme}`]}>
				<AspectRatio aspectRatio={4 / 3}>
					<Link to={aritcleLink}>
						<div className={style.cover}>
							<img src={backgroundImage} alt="" />
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
