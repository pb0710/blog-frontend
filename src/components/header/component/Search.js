import React, { useEffect, useRef } from 'react'
import style from '../style/index.module.scss'
import { Button, Popup, Input, List, Divider, Loading } from 'sylas-react-ui'
import SearchIcon from 'mdi-react/SearchIcon'
import ArrowRightIcon from 'mdi-react/ChevronRightIcon'
import { useSelector } from 'react-redux'
import { debounce } from '@/utils'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import defaultAvatar from '@/assets/images/default_avatar1.jpg'
import { useFetch } from '@/utils/hooks'
import * as commonApi from '@/apis'
import config from '@/config'

export default function Search() {
	const { t } = useTranslation()
	const theme = useSelector(state => state.setting.theme)
	const ref = useRef()
	const [visible, popupRef, { toggle, hide }] = Popup.usePopup()
	const inputing = useRef(false)
	const initialData = useRef({ users: [], articles: [] }).current
	const { data, loading, run: doSearch, mutate } = useFetch(commonApi.search, {
		initialData,
		manual: true,
		loadingDelay: config.LOADING_DELAY
	})
	const notResult = data.articles.length === 0 && data.users.length === 0

	/**
	 * 使用输入法并且正在输入中时，不搜索
	 * 纯字母和数字例外，因为当使用中文输入法输英文时，onChange会在onCompositionEnd前触发
	 */
	const handleSearch = async keywords => {
		if (!/^[a-z0-9]+$/i.test(keywords) && inputing.current) {
			return
		}
		if (!keywords) {
			mutate(initialData)
			return
		}
		doSearch(keywords)
	}

	useEffect(() => {
		if (visible) {
			ref.current?.focus?.()
			mutate(initialData)
		}
	}, [initialData, mutate, visible])

	const searchInputElement = (
		<div className={style.search_input_wrapper}>
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
	)

	const usersElement = data.users.length > 0 && (
		<>
			<Divider />
			<List>
				<h3>{t('header.user')}</h3>
				{data.users.map(({ id, avatar, nickname }) => (
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

	const articlesElement = data.articles.length > 0 && (
		<>
			<Divider />
			<List>
				<h3>{t('header.article')}</h3>
				{data.articles.map(({ id, title, category }) => (
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
				{searchInputElement}
				{loading ? (
					<div className={style.loading_wrapper}>
						<Loading color={theme} />
					</div>
				) : (
					<div className={style.result_wrapper}>
						{notResult && <h1>{t('header.no_data')}</h1>}
						{usersElement}
						{articlesElement}
					</div>
				)}
			</Popup>
		</>
	)
}
