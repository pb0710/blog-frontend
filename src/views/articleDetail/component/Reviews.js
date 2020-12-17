import React from 'react'
import { useTranslation } from 'react-i18next'
import { List } from 'sylas-react-ui'
import style from '../style/index.module.scss'
import dayjs from 'dayjs'
import defaultAvatar from '@/assets/images/default_avatar1.jpg'

function Reviews(props) {
	const { sourceData = [] } = props
	const { t } = useTranslation()
	return (
		<div className={style.reviews_wrapper}>
			<h3>{`${t('article_detail.reviews')} (${sourceData.length} ${t('article_detail.reviews_total')})`}</h3>
			<List>
				{sourceData.map(item => {
					const { reviewId, content, creationTime, speaker } = item
					return (
						<List.Item key={reviewId} className={style.review_wrapper}>
							<div className={style.review}>
								<div className={style.user}>
									<img alt="" src={speaker.avatar || defaultAvatar} />
									<strong>{speaker.nickname}</strong>
								</div>
								<span className={style.content}>{content}</span>
								<div className={style.create_time}>
									<span>{dayjs(creationTime).format(`${t('article_detail.create_date')} HH:mm:ss`)}</span>
								</div>
							</div>
						</List.Item>
					)
				})}
			</List>
		</div>
	)
}

export default Reviews
