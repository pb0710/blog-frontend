import React, { useEffect, useRef } from 'react'
import style from '../style/index.module.scss'
import { AspectRatio, Button, Loading, Popup, Tabs, TouchRipple } from 'sylas-react-ui'
import AppsIcon from 'mdi-react/AppsIcon'
import { useSelector } from 'react-redux'
import { useFetch } from '@/utils/hooks'
import * as commonApi from '@/apis'
import config from '@/config'
import { useTranslation } from 'react-i18next'

/**
 * 导航卡片
 * 主要用于一些外链展示
 * @param {{
 * 	title: string,
 * 	url: string,
 * 	pic: string,
 * 	hide: boolean
 * }} props
 * @returns
 */
function LinkCard({ title, url, pic, hide }) {
	const [rippleRef, controlProps] = TouchRipple.useRipple()
	const handleOpen = () => {
		setTimeout(() => {
			hide()
			window.open(url)
		}, config.CLICK_DELAY)
	}
	return (
		<div className={style.outer} title={url}>
			<AspectRatio aspectRatio={1}>
				<div className={style.card_wrapper} {...controlProps} onClick={handleOpen}>
					<div className={style.inner}>
						<img alt="" src={pic} />
						<span>{title}</span>
					</div>
					<TouchRipple ref={rippleRef} />
				</div>
			</AspectRatio>
		</div>
	)
}

export default function AppCenter() {
	const { t } = useTranslation()
	const theme = useSelector(state => state.setting.theme)
	const [visible, popupRef, { toggle, hide }] = Popup.usePopup()

	const fetched = useRef(false)
	const { data, loading, run: doFetch } = useFetch(commonApi.fetchUrls, {
		initialData: { docs: [], tools: [], langs: [] },
		loadingDelay: config.LOADING_DELAY,
		manual: true
	})

	useEffect(
		// 该接口自始自终仅调取一次
		() => {
			if (visible && !fetched.current) {
				fetched.current = true
				doFetch()
			}
		},
		[doFetch, visible]
	)

	const renderCards = cards =>
		loading ? (
			<div className={style.loading_wrapper}>
				<Loading.Line color={theme} />
			</div>
		) : (
			cards.map(card => <LinkCard key={card.title} hide={hide} {...card} />)
		)

	return (
		<>
			<Button.Icon className={style.btn} focus={visible} onClick={toggle}>
				<AppsIcon size={20} />
			</Button.Icon>
			<Popup ref={popupRef} className={style.app_center} visible={visible} scaleOrigin="top-right">
				<Tabs bordered={false} color={theme} activeKey="docs">
					<Tabs.Panel className={style.tab} tabKey="docs" title={t('header.libary')}>
						{renderCards(data.docs)}
					</Tabs.Panel>
					<Tabs.Panel className={style.tab} tabKey="langs" title={t('header.lang')}>
						{renderCards(data.langs)}
					</Tabs.Panel>
					<Tabs.Panel className={style.tab} tabKey="tools" title={t('header.tool')}>
						{renderCards(data.tools)}
					</Tabs.Panel>
				</Tabs>
			</Popup>
		</>
	)
}
