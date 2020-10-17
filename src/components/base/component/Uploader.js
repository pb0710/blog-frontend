import React from 'react'
import style from '../style/index.module.scss'
import { Button } from 'sylas-react-ui'
import { PictureOutlined } from '@ant-design/icons'
import { readFile } from '../util'

const dataFormat = {
	BASE_64: 'base64',
	FORM_DATA: 'formdata'
}

function Uploader(props) {
	const {
		classes,
		children = (
			<Button.Icon>
				<PictureOutlined />
			</Button.Icon>
		),
		format = dataFormat.BASE_64,
		onChange,
		...rest
	} = props

	const fileInputRef = React.useRef()

	const handleSelect = () => {
		fileInputRef.current.click()
	}

	const handleChange = e => {
		const files = e.target.files

		if (format === dataFormat.BASE_64) {
			const fileList = Array.prototype.map.call(files, readFile)
			Promise.all(fileList).then(results => {
				onChange && onChange(results)
			})
		} else {
			const formData = new FormData()
			Array.prototype.forEach.call(files, file => {
				formData.append('image', file)
			})
			onChange && onChange(formData)
		}
	}

	return (
		<div className={style.uploader}>
			{React.cloneElement(children, { onClick: handleSelect })}
			<input ref={fileInputRef} type="file" multiple={false} accept="image/*" {...rest} onChange={handleChange} />
		</div>
	)
}

export default Uploader
