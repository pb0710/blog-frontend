import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button, Divider, Input } from 'sylas-react-ui'
import style from '../style/index.module.scss'
import { msg } from '@/components/base'
import Reviews from './Reviews'
import * as articleApi from '@/apis/article'
import { useFetch } from '@/utils/hooks'
import store from '@/store'
import { updateArticleDetail } from '../store/action'
import { Login } from '@/components/modal'
import { updateModal } from '@/components/modal/store/action'

function AddComment(props) {
	const { setState } = props
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const { id: articleId } = useParams()
	const theme = useSelector(state => state.setting.theme)
	const online = useSelector(state => state.online)
	const { userId } = useSelector(state => state.userProfile)
	const [content, setContent] = React.useState('')

	const handleComment = async () => {
		if (content.length < 8) {
			msg.error(t('article_detail.rule.content_length_limit'))
			return
		}
		try {
			const payload = await articleApi.comment({ userId, articleId, content })
			setState(oldState => [payload, ...oldState])
			msg.success(t('success.comment'))
		} catch (err) {
			msg.error(t('error.comment'))
		}
	}

	const handleGoLogin = () => {
		dispatch(updateModal(true, <Login />))
	}

	return (
		<div className={style.add_review_wrapper}>
			<h3>{t('article_detail.add_review')}</h3>
			<Input.Textarea color={theme} value={content} onValueChange={setContent} />
			<div className={style.footer}>
				{online ? (
					<Button color={theme} onClick={handleComment}>
						{t('article_detail.add')}
					</Button>
				) : (
					<span className={style[`go_login_${theme}`]} onClick={handleGoLogin}>
						{t('article_detail.after_login')}
					</span>
				)}
			</div>
		</div>
	)
}

function Comments() {
	const dispatch = useDispatch()
	const { id: articleId } = useParams()

	const { data } = useFetch(articleApi.fetchReviewList, {
		initialData: [],
		params: [articleId],
		refreshDeps: [articleId]
	})
	const [state, setState] = React.useState(data)
	React.useEffect(() => {
		setState(data)
	}, [data])

	React.useEffect(() => {
		dispatch(
			updateArticleDetail({
				// 防止重渲染，不用useSelector，直接getState取最新值
				...store.getState().articleDetail,
				reviews: state
			})
		)
	}, [dispatch, state])

	return (
		<div className={style.comments_wrapper}>
			<AddComment setState={setState} />
			<Divider />
			<Reviews sourceData={state} />
		</div>
	)
}

export default Comments
