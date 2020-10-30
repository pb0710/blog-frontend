import React from 'react'
import style from './style/index.module.scss'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FlexiblePage } from '@/components/page'
import { Markdown } from '@/components/markdown'
import * as articleApi from '@/apis/article'
import * as action from './store/action'
import { msg } from '@/components/base'
import { Tag } from 'sylas-react-ui'
import { useFetch } from '@/utils/hooks'

export default function ArticleDetail() {
	const dispatch = useDispatch()
	const { id } = useParams()

	const { data, error, loading } = useFetch(articleApi.fetchDetail, {
		initData: {
			content: '',
			backgroundImage: ''
		},
		immutable: false,
		defaultParams: [id]
	})

	React.useEffect(() => {
		if (data.content || data.backgroundImage) {
			dispatch(action.setDetail(data))
		}
		if (error) {
			msg.error(error)
		}
	}, [data, dispatch, error])

	return (
		<FlexiblePage className={style.article_detail}>
			<section className={style.article_wrapper}>
				{loading ? (
					<div className={style.bg_skeleton}></div>
				) : (
					<img className={style.bg_pic} src={data.backgroundImage} alt="" />
				)}
				<div className={style.info}>
					<div>
						<span>2020年9月23日</span>
						<span>总字数 {data.content.length}</span>
						<span>阅读次数 98</span>
					</div>
					<div className={style.tags_wrapper}>
						<Tag>sdfd</Tag>
						<Tag>xxx</Tag>
						<Tag>前端</Tag>
					</div>
				</div>
				<Markdown>{data.content}</Markdown>
			</section>
		</FlexiblePage>
	)
}
