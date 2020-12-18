import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'sylas-react-ui'
import { insertTemp, followScroll, getPosition, setPosition } from '../util'
import style from '../style/index.module.scss'
import { Uploader } from '@/components/base'
import Editor from './Editor'
import Preview from './Preview'
import * as temp from '../temp'
import * as fileApi from '@/apis/file'
import { useDispatch, useSelector } from 'react-redux'
import { updateModal } from '@/components/modal/store/action'
import { ArticleInfo } from '@/views/articleUpload'
import ViewModuleOutlineIcon from 'mdi-react/ViewModuleOutlineIcon'
import CodeIcon from 'mdi-react/CodeIcon'
import EyeOutlineIcon from 'mdi-react/EyeOutlineIcon'
import EyeIcon from 'mdi-react/EyeIcon'
import SendIcon from 'mdi-react/SendIcon'
import { msg } from '@/components/base'
import { useTranslation } from 'react-i18next'
import { useMediaQuery, useBoolean } from '@/utils/hooks'

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

	const [previewing, { toggle: togglePreview, setTrue }] = useBoolean(false)
	const [content, setContent] = useState('')
	useEffect(() => {
		setContent(useMarkdownGuide ? temp.markdownDemo : '')
	}, [useMarkdownGuide])

	const editorRef = useRef()
	const previewRef = useRef()
	// 鼠标悬停区域
	let hoverArea = useRef(area.EDITOR).current

	const handleInput = event => {
		setContent(event.target.value)
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

	const insert = (targetString, offset = 0) => {
		if (typeof targetString !== 'string') return

		setContent(oldContent => {
			const position = getPosition(editorRef.current)
			const targetPos = position.start + offset
			setPosition(editorRef.current, targetPos)
			return insertTemp(oldContent, position.start, targetString)
		})
	}

	const handleInsertTable = () => {
		insert(temp.table, 4)
	}

	const handleInsertCode = () => {
		insert(temp.codeBlock, 5)
	}

	const uploadFiles = async formData => {
		const urlToPicTemp = picSrc => `  \n![](${picSrc})`
		try {
			const res = await fileApi.uploadImage(formData)
			const remotePic = Array.isArray(res) ? res.map(urlToPicTemp).join('') : urlToPicTemp(res)
			insert(remotePic, remotePic.length)
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

	const handlePublish = () => {
		if (!content || content.length < 150) {
			msg.error(t('article_publish.rule.content_length_limit'))
			return
		}
		dispatch(updateModal(true, <ArticleInfo content={content} />))
	}

	// 默认focus textarea
	useEffect(() => {
		editorRef.current.focus()
	}, [])

	useEffect(() => {
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
				<Button.Icon onClick={togglePreview}>
					{previewing ? <EyeIcon size={20} /> : <EyeOutlineIcon size={20} />}
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

	const contentElement = (
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
	)

	return (
		<div className={style.markdown_editor}>
			<div className={style.header_bar}>
				{toolsBarElement}
				{operationElement}
			</div>
			{contentElement}
		</div>
	)
}

export default MarkdownEditor
