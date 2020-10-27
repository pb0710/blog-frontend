import React from 'react'
import { Header } from '@/components/header'
import { Sider } from '@/components/sider'
import { RightSider } from '@/components/rightSider'
import { Content } from '@/components/content'
import { Modal } from '@/components/modal'

export default function App() {
	return (
		<div className="app">
			<Modal />
			<Header />
			<Sider />
			<Content />
			<RightSider />
		</div>
	)
}
