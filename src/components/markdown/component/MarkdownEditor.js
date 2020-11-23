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
import * as modalAction from '@/components/modal/store/action'
import { ArticleInfo } from '@/views/articleUpload'
import ViewModuleOutlineIcon from 'mdi-react/ViewModuleOutlineIcon'
import CodeIcon from 'mdi-react/CodeIcon'
import SendIcon from 'mdi-react/SendIcon'
import { msg } from '@/components/base'

const area = {
	EDITOR: 'editor',
	PERVIEW: 'preview'
}

function MarkdownEditor() {
	const dispatch = useDispatch()
	const userId = useSelector(state => state.userProfile.userId)
	const online = useSelector(state => state.online)
	const theme = useSelector(state => state.setting.theme)
	const useMarkdownGuide = useSelector(state => state.setting.useMarkdownGuide)

	const defaultContent = useMarkdownGuide ? temp.markdownDemo : ''
	const [content, setContent] = React.useState(defaultContent)
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
			const payload = await fileApi.uploadImage(formData)
			const toPicTemp = picSrc => `  \n![](${picSrc})`
			const remotePic = Array.isArray(payload) ? payload.map(toPicTemp).join('') : toPicTemp(payload)
			setContent(content => content + remotePic)
		} catch (err) {
			console.error(`图片上传失败——${err}`)
			msg.error('上传失败')
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
		if (!content || content.length < 20) {
			msg.error('文章长度少于20')
			return
		}
		dispatch(modalAction.updateModal(true, <ArticleInfo content={content} />))
	}

	// 默认focus textarea
	React.useEffect(() => {
		editorRef.current.focus()
	}, [])

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

	const toolsBar = (
		<div className={style.tools}>
			<Button.Icon onClick={handleInsertTable}>
				<ViewModuleOutlineIcon size={20} />
			</Button.Icon>
			<Uploader multiple onChange={handleFilesChange} />
			<Button.Icon onClick={handleInsertCode}>
				<CodeIcon size={20} />
			</Button.Icon>
		</div>
	)

	return (
		<div className={style.markdown_editor}>
			<div className={style.header_bar}>
				{toolsBar}
				<div className={style.operation}>
					{online ? (
						<Button className={style.publish} color={theme} onClick={handlePublish} prefixes={<SendIcon size={20} />}>
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
