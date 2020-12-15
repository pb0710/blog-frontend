## 技术博客

线上地址：[个人技术博客 http://8.129.105.196:3333/blog](http://8.129.105.196:3333/blog)

### 简介

该博客是一个较为完整的个人项目。
开发、搭建个人博客主要是为了熟悉 web 项目整体流程，了解各端项目分工，实践所学技术、知识。
而且网站搭建完成后，也能作为信息展示平台，用来记录个人所用所学、所见所闻、所感所想。一举多得。

当前进度：约 `75%`。

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
- 用户评论

技术栈：

- react（`100%` react hooks、suspense）
- react-router、redux、redux-saga、create-react-app
- 自建 react 基础 ui 组件库 [https://www.npmjs.com/package/sylas-react-ui](https://www.npmjs.com/package/sylas-react-ui)
- sass、axios、i18next

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
