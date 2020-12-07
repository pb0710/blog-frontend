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
import EyeOutlineIcon from 'mdi-react/EyeOutlineIcon'
import SendIcon from 'mdi-react/SendIcon'
import { msg } from '@/components/base'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from '@/utils/hooks/ui'
import { useBoolean } from '@/utils/hooks'

const area = {
	EDITOR: 'editor',
	PERVIEW: 'preview'
}

function MarkdownEditor() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const userId = useSelector(state => state.userProfile.userId)
	const online = useSelector(state => state.online)
	const theme = useSelector(state => state.setting.theme)
	const useMarkdownGuide = useSelector(state => state.setting.useMarkdownGuide)
	const isMobile = useMediaQuery('(max-width:600px)')

	const [previewing, { setToggle: togglePreview, setTrue }] = useBoolean(false)
	const [content, setContent] = React.useState('')
	React.useEffect(() => {
		setContent(useMarkdownGuide ? temp.markdownDemo : '')
	}, [useMarkdownGuide])

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
			console.error(`${t('error.upload')} ${err}`)
			msg.error(t('error.upload'))
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
		setContent(prev => prev + temp.codeBlock)
	}

	const handlePublish = () => {
		if (!content || content.length < 20) {
			msg.error(t('article_publish.rule.content_length_limit'))
			return
		}
		dispatch(modalAction.updateModal(true, <ArticleInfo content={content} />))
	}

	// 默认focus textarea
	React.useEffect(() => {
		editorRef.current.focus()
	}, [])

	React.useEffect(() => {
		if (!isMobile) {
			setTrue()
		}
	}, [isMobile, setTrue])

	const editorProps = {
		content,
		setContent,
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

	const toolsBarElement = (
		<div className={style.tools}>
			<Button.Icon onClick={handleInsertTable}>
				<ViewModuleOutlineIcon size={20} />
			</Button.Icon>
			<Uploader multiple={false} onChange={handleFilesChange} />
			<Button.Icon onClick={handleInsertCode}>
				<CodeIcon size={20} />
			</Button.Icon>
		</div>
	)

	const operationElement = (
		<div className={style.operation}>
			{isMobile && (
				<Button.Icon focus={previewing} onClick={togglePreview}>
					<EyeOutlineIcon size={20} />
				</Button.Icon>
			)}
			{online ? (
				<Button className={style.publish} color={theme} onClick={handlePublish} prefixes={<SendIcon size={20} />}>
					{t('article_publish.to_publish')}
				</Button>
			) : (
				<span>{t('article_publish.publish_prompt')}</span>
			)}
		</div>
	)

	return (
		<div className={style.markdown_editor}>
			<div className={style.header_bar}>
				{toolsBarElement}
				{operationElement}
			</div>
			<section className={style.content}>
				{isMobile ? (
					previewing ? (
						<Preview ref={previewRef} {...previewProps} />
					) : (
						<Editor ref={editorRef} {...editorProps} />
					)
				) : (
					<>
						<Editor ref={editorRef} {...editorProps} />
						<Preview ref={previewRef} {...previewProps} />
					</>
				)}
			</section>
		</div>
	)
}

export default MarkdownEditor
