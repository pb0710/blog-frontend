import React from 'react'
import { Button } from 'sylas-react-ui'
import { TableOutlined, CodeOutlined, SendOutlined } from '@ant-design/icons'
import { insertTemp, followScroll, getPosition, setPosition } from '../util'
import style from '../style/index.module.scss'
import Uploader from './Uploader'
import Editor from './Editor'
import Preview from './Preview'
import * as temp from '../temp'
import * as fileApi from '@/apis/file'

const area = {
  EDITOR: 'editor',
  PERVIEW: 'preview'
}

function MarkdownEditor() {
  const [content, setContent] = React.useState('')
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
      const remoteUrls = await fileApi.uploadImage(formData)
      const imgTemp = remoteUrls.map(url => `  \n![](${url})`)
      setContent(content => content + imgTemp.join(''))
    } catch (err) {
      console.error(`图片上传失败——${err}`)
    }
  }

  const handleFilesChange = async formData => {
    if (!formData) return
    // formData.set('userId', userId)
    uploadFiles(formData)
  }

  const handleInsertTable = () => {
    const position = getPosition(editorRef.current)
    const targetPos = position.start + temp.table.length
    console.log('position.start: ', position.start)
    console.log('targetPos: ', targetPos)
    setPosition(editorRef.current, targetPos)
    setContent(prev => insertTemp(prev, position.start, temp.table))
  }

  const handleInsertLink = () => {
    setContent(prev => prev + temp.link)
  }

  const handleInsertCode = () => {
    setContent(prev => prev + temp.codeBlock)
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
            <TableOutlined />
          </Button.Icon>
          <Button.Icon onClick={handleInsertCode}>
            <CodeOutlined />
          </Button.Icon>
        </div>
        <Button className={style.publish} color="primary">
          <SendOutlined />
          <strong>发布</strong>
        </Button>
      </div>
      <section className={style.content}>
        <Editor ref={editorRef} {...editorProps} />
        <Preview ref={previewRef} {...previewProps} />
      </section>
    </div>
  )
}

export default React.memo(MarkdownEditor)
