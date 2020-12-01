import React from 'react'
import style from '../style/index.module.scss'
import { FlexiblePage } from '@/components/page'

export function useVisible(defaultValue) {
	const [visible, setVisible] = React.useState(defaultValue)
	const toggle = React.useCallback(() => {
		setVisible(oldVisible => !oldVisible)
	}, [])
	return [visible, toggle]
}

export default function Home() {
	return (
		<FlexiblePage className={style.home_page}>
			<h1>home</h1>
		</FlexiblePage>
	)
}
