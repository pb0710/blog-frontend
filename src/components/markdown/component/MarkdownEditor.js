import React from 'react'
import { Button } from 'sylas-react-ui'
import { insertTemp, followScroll, getPosition, setPosition } from '../util'
import style from '../style/index.module.scss'
import { Uploader } from '@/components/base'
import Editor from './Editor'
import Preview from './Preview'
import * as temp from '../temp'
import * as fileApi from '@/apis/file'
import { useDispatch, useSelector } from 'react-redux'
import * as modalAction from '@/components/global/store/action'
import { ArticleInfo } from '@/views/articleUpload'
import { Code, ViewModuleOutlined } from '@material-ui/icons'
import { message } from '@/components/global'

const area = {
	EDITOR: 'editor',
	PERVIEW: 'preview'
}

function MarkdownEditor() {
	const dispatch = useDispatch()
	const { userId } = useSelector(state => state.userProfile)
	const online = useSelector(state => state.online)

	const [content, setContent] = React.useState(temp.markdownDemo)
	const editorRef = React.useRef()
	const previewRef = React.useRef()
	// 鼠标悬停区域
	let hoverArea = React.useRef(area.EDITOR).current

	const handleInput = e => {
		setContent(e.target.value)
	}

	const handleScrollEditor = () => {
		hoverArea === area.EDITOR && followScroll(editorRef.current, previewRef.current)
	}

	const handleScrollPreview = () => {
		hoverArea === area.PERVIEW && followScroll(previewRef.current, editorRef.current)
	}

	const handleEnterEditor = () => {
		hoverArea = area.EDITOR
	}

	const handleEnterPreview = () => {
		hoverArea = area.PERVIEW
	}

	const handleLeave = () => {
		hoverArea = ''
	}

	const uploadFiles = async formData => {
		try {
			const { message, payload } = await fileApi.uploadImage(formData)
			if (message === 'ok') {
				const toPicTemp = picSrc => `  \n![](${picSrc})`
				const remotePic = Array.isArray(payload) ? payload.map(toPicTemp).join('') : toPicTemp(payload)
				setContent(content => content + remotePic)
			}
		} catch (err) {
			console.error(`图片上传失败——${err}`)
			message.error(err)
		}
	}

	const handleFilesChange = async formData => {
		if (!formData) return
		formData.set('userId', userId)
		uploadFiles(formData)
	}

	const handleInsertTable = () => {
		const position = getPosition(editorRef.current)
		const targetPos = position.start + temp.table.length
		setPosition(editorRef.current, targetPos)
		setContent(prev => insertTemp(prev, position.start, temp.table))
	}

	const handleInsertCode = () => {
		console.log('content', content)
		setContent(prev => prev + temp.codeBlock)
	}

	const handlePublish = () => {
		console.log('content', content)
		if (!content || content.length < 20) {
			alert('文章字数少于20')
			return
		}
		dispatch(modalAction.updateModalContent(<ArticleInfo content={content} />))
		dispatch(modalAction.updateModalVisible(true))
	}

	const editorProps = {
		content,
		handleInput,
		handleScrollEditor,
		handleEnterEditor,
		handleLeave
	}

	const previewProps = {
		content,
		handleScrollPreview,
		handleEnterPreview,
		handleLeave
	}

	return (
		<div className={style.markdown_editor}>
			<div className={style.header_bar}>
				<div className={style.tools}>
					<Button.Icon onClick={handleInsertTable}>
						<ViewModuleOutlined />
					</Button.Icon>
					<Uploader multiple onChange={handleFilesChange} />
					<Button.Icon onClick={handleInsertCode}>
						<Code />
					</Button.Icon>
				</div>
				<div className={style.operation}>
					{online ? (
						<Button className={style.publish} color="primary" onClick={handlePublish}>
							发布
						</Button>
					) : (
						'登录成功后可发布文章...'
					)}
				</div>
			</div>
			<section className={style.content}>
				<Editor ref={editorRef} {...editorProps} />
				<Preview ref={previewRef} {...previewProps} />
			</section>
		</div>
	)
}

export default MarkdownEditor
