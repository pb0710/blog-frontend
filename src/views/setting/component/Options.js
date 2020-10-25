import React from 'react'
import style from '../style/index.module.scss'
import { Form, List } from 'sylas-react-ui'
import clsx from 'clsx'

function Options(props) {
	const { opts = [], heading, className } = props
	const containerCls = clsx(style.container, className)

	const renderComponent = c => (typeof c === 'function' ? c() : c)

	const renderOption = opt =>
		opt.name ? (
			<Form.Item className={style.option} name={opt.name} initialValue={opt.initialValue}>
				{renderComponent(opt.component)}
			</Form.Item>
		) : (
			renderComponent(opt.component)
		)

	return (
		<article className={style.options}>
			<h1>{heading}</h1>
			<List className={containerCls}>
				{opts.map((opt, index) => (
					<List.Item key={index} className={opt.itemCls}>
						{opt.icon}
						<span>{opt.title}</span>
						{renderOption(opt)}
					</List.Item>
				))}
			</List>
		</article>
	)
}

export default React.memo(Options)
