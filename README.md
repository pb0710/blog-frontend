## 技术博客

线上地址：[个人技术博客 http://8.129.105.196:3333/blog](http://8.129.105.196:3333/blog)

### 简介

搭建个人博客主要是为了熟悉、打通 web 项目整体流程，了解各端项目分工，实践所学技术、知识。  
亦能作为信息展示平台，记录个人所用所学、所见所闻、所感所想。一举多得。  
毕竟做 web 开发，特别是前端方面的知识体系分散而杂乱，技术推陈出新快。要想提升技术的广度与深度，养成良好的记笔记习惯非常重要。

当前进度：约 `85%`。

前端源码：[https://github.com/pb0710/blog-frontend](https://github.com/pb0710/blog-frontend)
后端源码：[https://github.com/pb0710/blog-backend](https://github.com/pb0710/blog-backend)

支持功能：

- 用户注册、登录 ✅
- 用户个人资料、配置项 编辑、同步 ✅
- markdown 文章展示 ✅
- markdown 编辑器、文章发布 ✅
- 用户详情页
- 关于页 ✅
- 适配移动端响应式 ✅
- 国际化 ✅
- 切换主题 ✅
- 搜索 ✅
- 文档入口 ✅
- 文章阅读数、点赞 ✅
- 文章评论 ✅
- 用户关注订阅

技术栈：

- react（`100%` react hooks、suspense）
- react-router、redux、redux-saga、create-react-app
- 自建 react 基础 ui 组件库 [https://www.npmjs.com/package/sylas-react-ui](https://www.npmjs.com/package/sylas-react-ui)
- sass、axios、i18next、markdown-to-jsx

### 开发

本地运行调试

```shell
yarn start
```

生产版本打包

```shell
yarn build
```

生成 analyze

```shell
yarn analyze
```
