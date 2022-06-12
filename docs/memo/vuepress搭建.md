[[toc]]
# Vuepress Github Pages 项目搭建
## 快速上手
1. 创建并进入一个新目录
```
创建并进入一个新目录
mkdir vuepress-starter && cd vuepress-starter
```
2. 包管理器进行初始化
```
yarn init -y # npm init
```
3. 将 VuePress 安装为本地依赖，不再推荐全局安装 VuePress
```
yarn add -D vuepress # npm install -D vuepress
```
4. 在 package.json 中添加一些 scripts
```
{
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  }
}
```
5. 在本地启动服务器
```
yarn dev
```
## 目录结构
```
.
├── docs
│   ├── .vuepress (可选的)
│   │   ├── components (可选的)
│   │   ├── theme (可选的)
│   │   │   └── Layout.vue
│   │   ├── public (可选的)
│   │   ├── styles (可选的)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (可选的, 谨慎配置)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (可选的)
│   │   └── enhanceApp.js (可选的)
│   │ 
│   ├── README.md
│   ├── basic
│   │   └── README.md
│   └── config.md
│ 
└── package.json
```
## 导航栏和侧边栏配置
```
# vuepress-demo/docs/.vuepress/config.js

module.exports = {
    title: '怪正经的公民',
    description: 'Just playing around',
    themeConfig: {
        logo: '/assets/img/logo.jpg',
        sidebar: {
            "/basic/": [
                {
                    title: '计算机基础',
                    collapsable: false,
                    sidebarDepth: 5,
                    children: [
                        {
                            title: '计算机网络',
                            path: '/basic/network/test1/',
                            collapsable: false,
                            sidebarDepth: 5,
                            children: [
                                {title: '网络课1', path: '/basic/network/test1/'},
                            ]
                        },
                        {title: '操作系统', path: '/basic/os/'},
                        {title: 'linux', path: '/basic/linux/'},
                    ]
                }
            ]
        },

        nav: [
            {
                text: '首页',
                link: '/'
            },
            {
                text: '计算机基础',
                ariaLabel: 'Language Menu',
                items: [
                    {text: '计算机网络', link: '/basic/network/'},
                    {text: '操作系统', link: '/basic/os/'},
                    {text: 'Linux', link: '/basic/linux/'},
                ]
            }
        ],
        displayAllHeaders: true,
        activeHeaderLinks: false,
    }
}
```
## 部署
###  github创建仓库
1. 新建仓库一：username.github.io（必须为你的github账户的username，而不是昵称啥的）
2. 新建仓库二，名称随意如vuepress-demo
二者的关系是：仓库一负责显示网站内容，我们不需要改动它；日常开发和新增内容，都在仓库二中，并通过 npm run deploy 命令，将代码发布到仓库一
### 关联本地项目与github仓库（vuepress-demo）
```
cd vuepress-demo
git init
git remote add origin https:xxx.git
```
### 新建部署文件
```
# 项目根目录
# 
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m '部署'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
#git push -f https://github.com/thinker365/thinker365.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
git push -f git@github.com:thinker365/thinker365.github.io.git master

cd -
```
### 设置ignore文件，提交代码（vuepress-demo）
```
根目录下添加.gitignore

docs/.vuepress/dist
node_modules
```
### package.json新建deploy指令并执行
```
{
  "name": "vuepress",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "vuepress": "^1.9.7"
  },
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs",
    **"deploy": "bash deploy.sh"**
  }
}
```
yarn deploy
### 成功啦
进到username.github.io仓库，settings-》pages，查看页面
