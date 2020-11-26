import React from 'react'
import style from '../style/index.module.scss'
import { Button, Popup, Tabs } from 'sylas-react-ui'
import AppsIcon from 'mdi-react/AppsIcon'
import { useSelector } from 'react-redux'

export default function AppCenter() {
	const theme = useSelector(state => state.setting.theme)
	const [visible, popupRef, { toggle }] = Popup.usePopup()

	return (
		<>
			<Button.Icon className={style.btn} focus={visible} onClick={toggle}>
				<AppsIcon size={20} />
			</Button.Icon>
			<Popup ref={popupRef} className={style.app_center} visible={visible} scaleOrigin="top-right">
				<Tabs bordered={false} color={theme} activeKey="aa">
					<Tabs.Panel className={style.tab} tabKey="aa" title="aaa">
						<h1>aaa</h1>
					</Tabs.Panel>
					<Tabs.Panel className={style.tab} tabKey="bb" title="bbb">
						<h1>bbb</h1>
					</Tabs.Panel>
					<Tabs.Panel className={style.tab} tabKey="cc" title="ccc">
						<h1>ccc</h1>
					</Tabs.Panel>
				</Tabs>
			</Popup>
		</>
	)
}
