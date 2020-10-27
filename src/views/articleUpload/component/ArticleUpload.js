import React from 'react'
import style from '../style/index.module.scss'
import { MarkdownEditor } from '@/components/markdown'
import { FlexiblePage } from '@/components/page'

export default function ArticleUpload() {
	return (
		<FlexiblePage className={style.article_upload_page} fullWidth>
			<MarkdownEditor />
		</FlexiblePage>
	)
}
