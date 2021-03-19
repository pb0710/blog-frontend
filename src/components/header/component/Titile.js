import React from 'react'
import { useMediaQuery, useScroll } from '@/utils/hooks'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import style from '../style/index.module.scss'
import { useRouteMatch } from 'react-router'
import config from '@/config'

function Title() {
	const isDetailPage = useRouteMatch('/article/:category/detail')
	const { title } = useSelector(state => state.articleDetail)
	const { top } = useScroll(document, { debounceDuration: config.SCROLL_DURATION })
	const isMobile = useMediaQuery('(max-width:600px)')

	const articleTitleCls = clsx({
		[style.show]: top > document.body.clientHeight
	})
	return (
		isMobile ||
		!isDetailPage || (
			<div className={style.article_title}>
				<h2 className={articleTitleCls}>{title}</h2>
			</div>
		)
	)
}

export default Title
