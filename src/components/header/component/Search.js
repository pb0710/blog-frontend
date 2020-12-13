import React from 'react'
import style from '../style/index.module.scss'
import { Button, Popup, Input, List, Divider } from 'sylas-react-ui'
import SearchIcon from 'mdi-react/SearchIcon'
import ArrowRightIcon from 'mdi-react/ChevronRightIcon'
import { useSelector } from 'react-redux'
import { search } from '@/apis'
import { debounce } from '@/utils'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import defaultAvatar from '@/assets/images/default_avatar1.jpg'

export default function Search() {
	const { t } = useTranslation()
	const theme = useSelector(state => state.setting.theme)
	const ref = React.useRef()
	const [visible, popupRef, { toggle, hide }] = Popup.usePopup()
	const inputing = React.useRef(false)
	const initialResult = React.useMemo(() => ({ articles: [], users: [] }), [])
	const [result, setResult] = React.useState(initialResult)

	const notResult = !result.articles.length && !result.users.length

	const reset = React.useCallback(() => {
		setResult(initialResult)
	}, [initialResult])

	/**
	 * 使用输入法并且正在输入中时，不搜索
	 * 纯字母和数字例外，因为当使用中文输入法输英文时，onChange会在onCompositionEnd前触发
	 */
	const handleSearch = async keywords => {
		if (!/^[a-z0-9]+$/i.test(keywords) && inputing.current) {
			return
		}
		if (!keywords) return reset()

		try {
			const res = await search(keywords)
			setResult(res)
		} catch (err) {
			console.error('搜索失败', err)
		}
	}

	React.useEffect(() => {
		if (visible) {
			ref.current?.focus?.()
			reset()
		}
	}, [reset, visible])

	const usersElement = result.users?.length > 0 && (
		<>
			<Divider />
			<List>
				<h3>{t('header.user')}</h3>
				{result.users?.map(({ id, avatar, nickname }) => (
					<Link key={id} to="/">
						<List.Item className={style.user_item} hovered ripple onClick={hide}>
							<img alt="" src={avatar || defaultAvatar} />
							<span className={style.text}>{nickname}</span>
						</List.Item>
					</Link>
				))}
			</List>
		</>
	)

	const articlesElement = result.articles?.length > 0 && (
		<>
			<Divider />
			<List>
				<h3>{t('header.article')}</h3>
				{result.articles?.map(({ id, title, category }) => (
					<Link key={id} to={`/article/${category}/detail/${id}`}>
						<List.Item className={style.article_item} hovered ripple onClick={hide}>
							<span className={style.text}>{title}</span>
							<ArrowRightIcon size={18} />
						</List.Item>
					</Link>
				))}
			</List>
		</>
	)

	return (
		<>
			<Button.Icon className={style.btn} focus={visible} onClick={toggle}>
				<SearchIcon size={20} />
			</Button.Icon>
			<Popup ref={popupRef} className={style.search} visible={visible} scaleOrigin="top">
				<div className={style.search_input_box}>
					<Input
						ref={ref}
						color={theme}
						placeholder={t('header.search_placeholder')}
						onValueChange={debounce(handleSearch, 400)}
						onCompositionStart={() => {
							inputing.current = true
						}}
						onCompositionEnd={() => {
							inputing.current = false
						}}
					/>
				</div>
				<div className={style.result_box}>
					{notResult && <h1>{t('header.no_data')}</h1>}
					{usersElement}
					{articlesElement}
				</div>
			</Popup>
		</>
	)
}
