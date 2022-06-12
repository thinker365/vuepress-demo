# 使用示例

## GitHub 风格的表格
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

## Emoji
:tada: :100:
- 地址：[https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)

## 目录
[[toc]]

## 自定义容器
::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::

## 代码块中的语法高亮
VuePress 使用了 Prism (opens new window)来为 markdown 中的代码块实现语法高亮。Prism 支持大量的编程语言，你需要做的只是在代码块的开始倒勾中附加一个有效的语言别名：
``` js
export default {
  name: 'MyComponent',
  // ...
}
```

## 代码块中的行高亮
``` js {4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
- 除了单行以外，你也可指定多行，行数区间，或是两者都指定。
- 行数区间: 例如 {5-8}, {3-10}, {10-17}
- 多个单行: 例如 {4,7,9}
- 行数区间与多个单行: 例如 {4,7-13,16,23-27,40}

## 行号
module.exports = {
  markdown: {
    lineNumbers: true
  }
}