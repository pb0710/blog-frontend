import React from 'react'
import style from './style/index.module.scss'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FlexiblePage } from '@/components/page'
import { Markdown } from '@/components/markdown'
import * as articleApi from '@/apis/article'
import * as action from './store/action'
import { message } from '@/components/global'
import { Tag } from 'sylas-react-ui'

export default function ArticleDetail() {
	const dispatch = useDispatch()
	const { id } = useParams()

	const [markdown, setMarkdown] = React.useState('')
	const [bgPic, setBgPic] = React.useState('')

	React.useEffect(() => {
		;(async () => {
			try {
				const { payload: detail } = await articleApi.fetchDetail(id)
				setMarkdown(detail.content)
				setBgPic(detail.backgroundImage)
				dispatch(action.setDetail(detail))
			} catch (err) {
				console.error(err)
				message.error(err)
			}
		})()
	}, [dispatch, id])

	return (
		<FlexiblePage className={style.article_detail}>
			<section className={style.article_wrapper}>
				<img className={style.bg_pic} src={bgPic} alt="" />
				<div className={style.info}>
					<div>
						<span>2020年9月23日</span>
						<span>总字数 {markdown.length}</span>
						<span>阅读次数 98</span>
					</div>
					<div className={style.tags_wrapper}>
						<Tag>sdfd</Tag>
						<Tag>xxx</Tag>
						<Tag>前端</Tag>
					</div>
				</div>
				<Markdown>{markdown}</Markdown>
			</section>
		</FlexiblePage>
	)
}
