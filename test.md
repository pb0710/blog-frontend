# React 虚拟 DOM 的简易实现

## 虚拟 DOM 数据结构

原生 DOM 的`html`标签形式。

```jsx
<ul class="list">
	<li>item 1</li>
	<li>item 2</li>
</ul>
```

用虚拟 DOM 树表示。

```js
{
  tagName: 'ul',
  props: {
    className: 'list'
  },
  children: [
    {
      tagName: 'li',
      props: {},
      children: ['item 1']
    },
    {
      tagName: 'li',
      props: {},
      children: ['item 2']
    }
  ]
}
```

虚拟 DOM 结构中，假定元素节点（Element Node）用 js 对象表示，文本节点（Text Node）用字符串表示。`tagName`表示元素节点类型，`props`表示属性，`children`表示该元素节点下所有子节点。

先封装一下，让结构看起来更清晰

```js
function createVirtualDOM(tagName, props, ...children) {
	return { tagName, props, children }
}

createVirtualDOM('ul', { class: 'list' }, createVirtualDOM('li', {}, 'item1'), createVirtualDOM('li', {}, 'item2'))
```

## 由虚拟 DOM 创建原生 DOM

`createDOM`创建原生 DOM，主要需区分**TextNode**和**Element Node**。

```js
function createDOM(node) {
	if (typeof node === 'string') {
		return document.createTextNode(node)
	} else {
		const $node = document.createElement(node.tagName)
		// 递归插入子节点
		node.children.map(createDOM).forEach(child => $node.appendChild(child))
		return $node
	}
}
```

> 这里约定：$命名的变量为原生 DOM。传入虚拟 DOM，输出原生 DOM

## 新旧虚拟 DOM 树横向对比差异，更新原生 DOM

四种情况及对应处理方式（暂不考虑 props）

1. 旧节点不存在：

   父节点`appendChild`新节点。

   ```js
   function updateDOM($parentNode, newNode, oldNode) {
   	if (!oldNode) {
   		$parentNode.appendChild(createDOM(newNode))
   	}
   }
   ```

2. 新节点不存在：

   父节点`removeChild`旧节点。

   ```js
   function updateDOM($parentNode, newNode, oldNode, currentNodeIndex = 0) {
     // ...
     else if (!newNode) {
       $parentNode.removeChild($parentNode.childNodes[currentNodeIndex]))
     }
   }
   ```

   其中`currentNodeIndex`表示当前节点的索引。

3. 新旧节点不同：

   首先要对新旧节点是否改变做下判断。

   ```js
   function judgeHasDOMDiff(node1, node2) {
   	return typeof node1 !== typeof node2 || typeof node1 === 'string'
   		? node1 !== node2
   		: node1.tagName !== node2.tagName
   }
   ```

   父节点`replaceChild`新旧节点。

   ```js
   function updateDOM($parentNode, newNode, oldNode, currentNodeIndex = 0) {
     // ...
     else if (judgeHasDOMDiff(newNode, oldNode)) {
       $parentNode.replaceChild(
         createDOM(newNode),
         $parentNode.childNodes[currentNodeIndex]
       )
     }
   }
   ```

4. 新旧节点相同：

   递归更新所有子节点。

   首先要确保新旧节点都是元素节点（文本节点不存在子节点）。

   ```js
   function updateDOM($parentNode, newNode, oldNode, currentNodeIndex = 0) {
     // ...
     // else前面已经判断过新旧节点相同，否则得写成 if (newNode.type && oldNode.type)
     else if (newNode.type) {
       for (let i = 0; i < newNode.children.length || oldNode.children.length; i++) {
         updateDOM(
           $parentNode.childNodes[currentNodeIndex],
           newNode.children[i],
           oldNode.children[i],
           i
         )
       }
     }
   }
   ```

用 babel 转译虚拟 DOM。

```jsx
/** @jsx createVirtualDOM */
function createVirtualDOM(tagName, props, ...children) {
	return { tagName, props, children }
}
```

这样就可以用`jsx`表示虚拟 DOM 了。

```jsx
<ul className="list">
	<li>item 1</li>
	<li>item 2</li>
</ul>
```

## 完整代码

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Virtual DOM</title>
	</head>

	<body>
		<div id="root"></div>
		<button id="update">更新dom</button>
		<script src="./index.js"></script>
	</body>
</html>
```

**index.js**

```jsx
/** @jsx createVirtualDOM */
function createVirtualDOM(tagName, props, ...children) {
	return { tagName, props, children }
}

// 虚拟DOM创建原生DOM
function createDOM(node) {
	if (typeof node === 'string') {
		return document.createTextNode(node)
	} else {
		const $node = document.createElement(node.tagName)

		node.children.map(createDOM).forEach(child => $node.appendChild(child))
		return $node
	}
}

// 判断当前DOM是否发生改变
function judgeHasDOMDiff(node1, node2) {
	return typeof node1 !== typeof node2 || typeof node1 === 'string' ? node1 !== node2 : node1.tagName !== node2.tagName
}

/**
 * 更新DOM
 * 需对比前后DOM差异
 * 共有4种结果————新增、删除、替换、递归更新子DOM
 */
function updateDOM($parentNode, newNode, oldNode, currentNodeIndex = 0) {
	if (!oldNode) {
		$parentNode.appendChild(createDOM(newNode))
	} else if (!newNode) {
		$parentNode.removeChild($parentNode.childNodes[currentNodeIndex])
	} else if (judgeHasDOMDiff(newNode, oldNode)) {
		$parentNode.replaceChild(createDOM(newNode), $parentNode.childNodes[currentNodeIndex])
	} else if (newNode.tagName) {
		for (let i = 0; i < newNode.children.length || i < oldNode.children.length; i++) {
			updateDOM($parentNode.childNodes[currentNodeIndex], newNode.children[i], oldNode.children[i], i)
		}
	}
}

// ----------------测试----------------
// 约定$命名的变量代表原生DOM
const $root = document.querySelector('#root')
const $btn = document.querySelector('#btn')

const beforeBabelTransfer = {
	tagName: 'ul',
	props: {
		class: 'list'
	},
	children: [
		{
			tagName: 'li',
			props: {},
			children: ['item 1']
		},
		{
			tagName: 'li',
			props: {},
			children: ['item 2']
		}
	]
}

const beforeUpdate = (
	<ul>
		<h1>test</h1>
		<li>item 2</li>
		<li>item 3</li>
	</ul>
)

const afterUpdate = (
	<ul class="list">
		<li>item 1</li>
		<li>item 2</li>
		<input type="text" />
	</ul>
)

updateDOM($root, beforeUpdate)

$btn.addEventListener('click', () => {
	updateDOM($root, afterUpdate, beforeUpdate)
})
```
