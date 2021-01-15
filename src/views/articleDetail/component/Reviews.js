import React from 'react'
import { useTranslation } from 'react-i18next'
import { List } from 'sylas-react-ui'
import style from '../style/index.module.scss'
import dayjs from 'dayjs'
import defaultAvatar from '@/assets/images/default_avatar.jpg'

function Reviews(props) {
	const { sourceData = [], handleQuote } = props
	const { t } = useTranslation()
	return (
		<div className={style.reviews_wrapper}>
			<h3>{`${sourceData.length} ${t('article_detail.reviews_total')}`}</h3>
			<List>
				{sourceData.map((item, index) => {
					const { reviewId, content, creationTime, speaker } = item
					const layerNum = sourceData.length - index
					return (
						<List.Item key={reviewId} className={style.review_wrapper}>
							<div className={style.review}>
								<div className={style.user}>
									<img alt="" src={speaker.avatar || defaultAvatar} />
									<strong>{speaker.nickname || t('article_detail.anonymous_user')}</strong>
								</div>
								<pre className={style.content}>
									<span>{content}</span>
								</pre>
								<div className={style.footer}>
									<span>{dayjs(creationTime).format(`${t('article_detail.create_date')} HH:mm:ss`)}</span>
									<span>#{layerNum}</span>
									<span onClick={() => handleQuote(item)}>{t('article_detail.quote')}</span>
								</div>
							</div>
						</List.Item>
					)
				})}
			</List>
		</div>
	)
}

export default React.memo(Reviews)
