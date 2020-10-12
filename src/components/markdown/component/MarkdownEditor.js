import React from 'react'
import { Button } from 'sylas-react-ui'
import { NumberOutlined, EditOutlined, SendOutlined } from '@ant-design/icons'
import { insertTemp, followScroll, getPosition, setPosition } from '../util'
import style from '../style/index.module.scss'
import Uploader from './Uploader'
import Editor from './Editor'
import Preview from './Preview'
import * as temp from '../temp'
import * as fileApi from '@/apis/file'
import { useDispatch, useSelector } from 'react-redux'
import * as modalAction from '@/components/modal/store/action'
import { ArticleInfo } from '@/pages/articleUpload'

const area = {
  EDITOR: 'editor',
  PERVIEW: 'preview'
}

function MarkdownEditor() {
  const dispatch = useDispatch()
  const {
    userProfile: { userId }
  } = useSelector(state => state)
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
      const { message, payload: remotePicUrls } = await fileApi.uploadImage(formData)
      if (message === 'ok') {
        const imgTemp = remotePicUrls.map(url => `  \n![](${url})`).join('')
        setContent(content => content + imgTemp)
      }
    } catch (err) {
      console.error(`图片上传失败——${err}`)
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
          <Uploader format="formdata" onChange={handleFilesChange} />
          <Button.Icon onClick={handleInsertTable}>
            <NumberOutlined />
          </Button.Icon>
          <Button.Icon onClick={handleInsertCode}>
            <EditOutlined />
          </Button.Icon>
        </div>
        <div className={style.operation}>
          {online ? (
            <Button className={style.publish} color="primary" onClick={handlePublish}>
              发布
            </Button>
          ) : (
            '登录账号即可发布文章...'
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
