import React from 'react'
import style from '../style/index.module.scss'
import { FlexiblePage } from '@/components/page'
import { Markdown } from '@/components/markdown'

const content = `
# 关于
**Hello**，我是一名web前端开发者。该博客是本人一个较为完整的个人项目。

搭建个人博客主要是为了熟悉、打通 web 项目整体流程，了解各端项目分工，实践所学技术、知识。  
而且网站搭建完成后，也能作为信息展示平台，用来记录个人所用所学、所见所闻、所感所想。一举多得。  
毕竟 web 开发，特别是前端方面的知识体系分散而杂乱，技术推陈出新快。要想提升技术的广度与深度，养成良好的记笔记习惯非常重要。

当前开发进度：约 \`75%\`。

支持功能：

- 用户注册、登录 ✅
- 用户个人资料、配置项 编辑、同步 ✅
- markdown 文章展示、编辑、发布 ✅
- 用户个人详情页
- 关于页 ✅
- 适配移动端响应式 ✅
- 国际化 ✅
- 切换主题 ✅
- 搜索 ✅
- 用户阅读、点赞 ✅
- 用户评论、收藏

[前端部分](https://github.com/pb0710/blog-frontend)：

- react（\`100%\` react hooks、suspense）
- react-router、redux、redux-saga、create-react-app
- 自建 [react 基础 ui 组件库](https://www.npmjs.com/package/sylas-react-ui)
- sass、axios、i18next

[后端部分](https://github.com/pb0710/blog-backend)：

- nodejs
- koa、koa-router、koa-swagger-decorator、koa-session、koa-static
- \`100%\`typescript 编写
- mysql
`

export default function About() {
	return (
		<FlexiblePage className={style.about_page}>
			<article className={style.about_wrapper}>
				<Markdown>{content}</Markdown>
			</article>
		</FlexiblePage>
	)
}
