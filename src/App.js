import React from 'react'
import { Header } from '@/components/header'
import { Sider } from '@/components/sider'
import { RightSider } from '@/components/rightSider'
import { Content } from '@/components/content'
import { Modal, Prompt } from '@/components/global'

export default function App() {
	return (
		<div className="app">
			<Modal />
			<Prompt />
			<Header />
			<Sider />
			<Content />
			<RightSider />
		</div>
	)
}
