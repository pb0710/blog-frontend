export const test = `
# Welcome to React Showdown :+1:
 
To get started, edit the markdown in \`example/src/App.tsx\`.
 
| Column 1 | Column 2 |
|----------|----------|
| A1       | B1       |
| A2       | B2       |

\`\`\`javascript
  const a = [1,2,3];
\`\`\`

\`\`\`sh
TAG_NAME="v1.12.1.xinhua.final"

if [[ $TAG_NAME =~ ^v0 ]] 
then
	echo "v0"
elif [[ $TAG_NAME =~ ^v1 ]] 
then
	echo "v1"
else 
	echo "not match"
fi
\`\`\`

\`\`\`
<ul>
  <li>12</li>
  <li>3</li>
  <li>4</li>
</ul>
\`\`\`

\`\`\`
create table tab_new as select col1,col2… from tab_old definition only
\`\`\`

\`\`\`sh
curl -v -F r=releases -F hasPom=false -F e=zip -F g=com.easemob.kefu.fe.private -F a=kefu-policy-private -F v=\${TRAVIS_TAG} -F p=zip -F file=./kefu-policy-private-build.zip -u ci-deploy:Xyc-R5c-SdS-2Qr https://hk.nexus.op.easemob.com/nexus/service/local/artifact/maven/content
\`\`\`
\`\`\`
function getlang(str) {
  if (typeof str != 'string') return
  const [prefix, lang] = str.split('-')
  return lang
}

const code = props => {
  console.log('props: ', props)
  const { children, className } = props
  const language = getlang(className)
  console.log('language: ', language)
  return (
    <SyntaxHighlighter PreTag={F} languages={language} style={scchoolbook1}>
      {children}
    </SyntaxHighlighter>
  )
}
\`\`\`
`

export const table = `
|       |       |       |
| :-- | :-- | :-- |
|       |       |       |
|       |       |       |
`

export const link = `[  ](  )`

export const codeBlock = `
\`\`\` 

\`\`\`
`

export const markdownDemo = `
# 使用Markdown

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

* 无序列表
* 无序列表
* 无序列表

[链接](https://www.baidu.com)

> 这是一段引用的文字  

1. 有序列表
2. 有序列表
3. 有序列表

*斜体*

**粗体**

~下划线~

~~删除线~~

- [ ] 待办事项
- [x] 待办事项

\`单行代码块\`

\`\`\`多行代码块
多行代码块
多行代码块
多行代码块
\`\`\`

| 序号 | 姓名 | 性别 |
| :--- | :--- | :--- |
| 01   | 张三 | 男   |
| 02   | 李四 | 女   |
| 03   | 王五 | 男   |



`
