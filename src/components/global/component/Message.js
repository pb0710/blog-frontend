import React from 'react'
import ReactDOM from 'react-dom'
import style from '../style/index.module.scss'
import { v4 as uuid } from 'uuid'
import clsx from 'clsx'
import { Info, Warning, Error, CheckCircle } from '@material-ui/icons'

// add 方法需要对外暴露
let add

const MessageContainer = () => {
	// { id, content, type, duration }
	const [msgList, setMsgList] = React.useState([])

	const remove = msg => {
		setMsgList(prev => prev.filter(item => item.id !== msg.id))
	}

	add = msg => {
		const newMsg = { ...msg, id: uuid() }
		const duration = msg.duration || 3000
		setMsgList(prev => [...prev, newMsg])
		setTimeout(() => {
			remove(newMsg)
		}, duration)
	}

	return (
		<ul id={style.message_wrapper}>
			{msgList.map((msg, index) => (
				<Message key={msg.id} remove={remove} {...msg} />
			))}
		</ul>
	)
}

const Message = React.memo(props => {
	const { type, content, id, remove } = props
	function render() {
		let messageIcon
		let typeCls
		switch (type) {
			case 'success':
				messageIcon = <CheckCircle />
				typeCls = style.success
				break
			case 'warning':
				messageIcon = <Warning />
				typeCls = style.warning
				break
			case 'error':
				messageIcon = <Error />
				typeCls = style.error
				break

			default:
				messageIcon = <Info />
				typeCls = style.info
				break
		}
		return (
			<li className={clsx(style.message, typeCls)} onClick={() => remove(props)}>
				{messageIcon}
				<span>{content}</span>
			</li>
		)
	}
	return render()
})

// MessageContainer append 到 #root 外，确保唯一且不会触发业务组件树渲染
;(() => {
	let elem = document.querySelector('#extra-container')
	if (!elem) {
		elem = document.createElement('div')
		elem.id = 'extra-container'
		document.body.append(elem)
	}
	ReactDOM.render(<MessageContainer />, elem)
})()

const message = {
	info(content, duration) {
		add({ content, duration, type: 'info' })
	},
	success(content, duration) {
		add({ content, duration, type: 'success' })
	},
	warning(content, duration) {
		add({ content, duration, type: 'warning' })
	},
	error(content, duration) {
		add({ content, duration, type: 'error' })
	}
}

export default message
