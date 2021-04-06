import React from 'react'
import { Button } from 'sylas-react-ui'
import style from '../style/index.module.scss'
import useClipboard from 'use-clipboard-hook'
import { msg } from '@/components/base'
import { useTranslation } from 'react-i18next'

/**
 * 联系方式
 * @param {{
 *	link: string
 * }} props
 * @returns
 */
function Contact(props) {
	const { children, link } = props
	const { t } = useTranslation()
	const { ref, copy } = useClipboard({
		onSuccess(text) {
			if (text) {
				msg.info(`${t('info.copy_link_to_clipboard')} - ${text} `)
			}
		}
	})
	return (
		<Button.Icon ref={ref} onClick={copy} title={link}>
			{link && <span className={style.contact_link}>{link}</span>}
			{children}
		</Button.Icon>
	)
}

export default React.memo(Contact)
