import React from 'react'
import { Header } from '@/components/header'
import { Sider } from '@/components/sider'
import { RightSider } from '@/components/rightSider'
import { Content } from '@/components/content'
import { Modal } from '@/components/modal'
import { useMediaQuery } from '@/utils/hooks'

export default function App() {
	const isMobile = useMediaQuery('(max-width:600px)')
	return (
		<div className="app">
			<Modal />
			<Header />
			<Sider />
			<Content />
			{isMobile || <RightSider />}
		</div>
	)
}
