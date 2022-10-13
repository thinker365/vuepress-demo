module.exports = {
    title: '杏壳儿',
    configureWebpack: {
        resolve: {
            alias: {
                '@img': '/docs/.vuepress/public/assets/img',
                '@file': '/docs/.vuepress/public/assets/document',
            }
        }
    },
    themeConfig: {
        logo: '/assets/img/开心果.png',
        sidebar: {
            '/qa/basics/': [
                {
                    title: '目录',
                    children: [
                        ['', '测试体系概览'], //左边文档，右边菜单名称
                        ['测试的生命周期', '测试的生命周期'],
                        ['不同视角看测试', '不同视角看测试'],
						['快速熟悉业务', '快速熟悉业务'],
						['缺陷分析', '缺陷分析'],
                    ]
                },
            ],
            '/qa/view/': [
                {
                    title: '目录',
                    children: [
                        ['', '不同视角看测试'],
                        ['敏捷测试', '敏捷测试'],
                    ]
                },
            ],
            '/qa/automatic/': [
                {
                    title: '目录',
                    children: [
                        ['', '基本概念'],
                        ['Selenium', 'Selenium'],
                        ['Cypress', 'Cypress'],
                        ['Playwright', 'Playwright'],
                        ['Appium', 'Appium'],
                        ['Mock', 'Mock'],
						['Pact', 'Pact契约测试'],
						['框架命令行参数定制化', '框架命令行参数定制化'],
						
                    ]
                },
            ],
            '/qa/performance/': [
                {
                    title: '目录',
                    children: [
                        ['', '构建性能测试体系'],
                        ['TPS、并发数、线程数', '关于TPS、并发数、线程数'],
                        ['Jmeter', 'Jmeter'],
                        ['Locust', 'Locust'],
                        ['说透性能测试', '说透性能测试'],
                        ['性能指标监控', '性能指标监控'],
                        ['NetData', 'NetData性能监控'],
                        ['Prometheus入门到实战', 'Prometheus入门到实战'],
                    ]
                },
            ],
			'/qa/special/': [
			    {
			        title: '目录',
			        children: [
						['大数据测试', '大数据测试基础'],
			        ]
			    },
			],
            '/qa/security/': [
				{
				    title: '安全测试流程',
				    children: [
				        ['安全测试流程', '安全测试流程'],
				    ]
				},
                {
                    title: '安全测试工具',
                    children: [
                        ['', 'Nessus破解'],
                        ['Awvs破解', 'Awvs破解'],
                    ]
                },
                {
                    title: '常见漏洞攻防',
                    children: [
                        {
                            title: '客户端脚本安全',
                            children: [
                                ['', '浏览器安全'],
                                ['跨站脚本XSS', '跨站脚本XSS'],
                                ['跨站请求伪造CSRF', '跨站请求伪造CSRF'],
                                ['', '点击劫持'],
                                ['', '网页钓鱼'],
                            ]
                        },
                        {
                            title: '服务端应用安全',
                            children: [
                                ['SQL注入', 'SQL注入'],
                                ['文件上传', '文件上传'],
                                ['服务端请求伪造SSRF', '服务端请求伪造SSRF'],
                                ['反序列化漏洞', '反序列化漏洞'],
                                ['', 'WEB SERVER配置安全'],
                                ['', 'WEB框架漏洞'],
                                ['', '访问控制'],
                                ['', '加密算法安全'],
                                ['', '拒绝服务攻击'],
                                ['', '开发语言安全'],
                                ['', '认证与会话管理'],
                            ]
                        },
                        {
                            title: '业务逻辑安全',
                            children: []
                        },
                    ],
                },
            ],
            '/qa/tool/': [
                {
                    title: '目录',
                    children: [
                        ['', 'Charles'],
                        ['BurpSuite', 'BurpSuite'],
                        ['Wireshark', 'Wireshark'],
						//['SQLMAP实战','SQLMAP实战']
                        ['XSStrike实战', 'XSStrike实战'],
                        ['Fapro', 'Fapro网络协议服务端模拟器'],
                        ['Vim编辑器', 'Vim编辑器'],
                    ]
                },
            ],
            '/qa/framework/': [
                {
                    title: '目录',
                    children: [
                        ['', 'Unittest'],
                        ['Pytest', 'Pytest'],
                    ]
                },
            ],

            '/basic/network/': [
                {
                    title: '目录',
                    children: [
                        ['', '计算机网络核心概念'],
                        ['HTTP、HTTPS协议', 'HTTP、HTTPS协议'],
                        ['Cookie、Session、Token、JWT', 'Cookie、Session、Token、JWT'],
                        ['pdf', 'PDF测试'],
                        ['HTTP、RPC', '关于HTTP和RPC'],
                        ['WebSocket', 'WebSocket'],
                    ]
                },
            ],
            '/basic/os/': [
                {
                    title: '目录',
                    children: [
                        ['进程间的通信', '进程间的通信方式']
                    ]
                },
            ],
            '/basic/linux/': [
                {
                    title: '目录',
                    children: [
                        ['', 'Linux快捷高效用法'],
                        ['Linux常用命令', 'Linux常用命令'],
                        ['Linux环境变量配置', 'Linux环境变量配置'],
                        ['Linux三剑客', 'Linux三剑客'],
						['Shell专题', 'Shell专题'],
                        ['交换机流量镜像', '交换机流量镜像'],
                        ['虚拟机网络连接介绍', '虚拟机网络连接介绍'],
                    ]
                },
            ],
            '/basic/algorithms/': [
                {
                    title: '目录',
                    children: [
                        ['', '二叉树'],
                    ]
                },
            ],

            '/frontend/vue/': [
                {
                    title: '目录',
                    children: [
                        ['', 'Vue基础知识点'],
                        ['Vue组件通信', 'Vue组件通信'],
                        ['Vuex入门到实战', 'Vuex入门到实战'],
                        ['Axios核心技术', 'Axios核心技术'],
                    ]
                },
            ],
            '/frontend/css/': [
                {
                    title: '目录',
                    children: [
                        ['', 'CSS布局技巧'],
                        ['flex布局之美', 'FLEX布局之美'],
                    ]
                },
            ],

            '/backend/python/': [
                {
                    title: '目录',
                    collapsable: false,
                    children: [
                        ['', '90条Python编程建议'],
                        ['Python优化技巧', 'Python优化技巧'],
                        ['Python实用技巧', 'Python实用技巧'],
                        ['Python并发编程', 'Python并发编程'],
                        ['Python标准库', 'Python标准库'],
                        ['Python正则表达式', 'Python正则表达式'],
                        ['很nice的三方库', '很nice的三方库'],
                        ['深入理解python特性', '深入理解python特性'],
                        ['超全内置函数', '超全内置函数'],
                        ['7个高质量学习Python的开源库', '7个高质量学习Python的开源库'],
                        ['闭包替换递归', '闭包替换递归'],
                        ['Python Cookbook', 'Python Cookbook'],
                        ['Python5大常用魔术方法', 'Python5大常用魔术方法'],
                        ['优雅的代码片段', '优雅的代码片段'],
                        ['Python实现设计模式', 'Python实现设计模式'],
                        ['异常', '异常'],
						['Python字典高效使用','Python字典高效使用']
                    ]
                },
            ],
            '/backend/java/': [
                {
                    title: '目录',
                    children: [
                        ['', 'Java核心知识点'],
                    ]
                },
            ],
            '/backend/django/': [
                {
                    title: '目录',
                    children: [
                        ['', 'Django基础知识'],
                    ]
                },
            ],
            '/backend/drf/': [
                {
                    title: '目录',
                    children: [
                        ['', 'DRF必会知识点'],
                        ['Drf使用梳理', 'DRF使用梳理'],
                    ]
                },
            ],
            '/backend/celery/': [
                {
                    title: '目录',
                    children: [
                        ['', 'Celery基础操作'],
                    ]
                },
            ],
            '/backend/mysql/': [
                {
                    title: '目录',
                    children: [
                        ['', 'Mysql'],
                        ['Mysql基本操作', 'Mysql基本操作'],
                        ['三范式', '三范式'],
                        ['数据备份', '数据备份'],
                    ]
                },
            ],
            '/backend/redis/': [
                {
                    title: '目录',
                    children: [
                        ['', 'Redis基础知识'],
                        ['Redis架构演化之路', 'Redis架构演化之路'],
                    ]
                },
            ],
            '/backend/elasticsearch/': [
                {
                    title: '目录',
                    children: [
                        ['', 'Elasticsearch基础知识'],
                        ['ES基本操作', 'ES基本操作'],
                    ]
                },
            ],
            '/backend/mongodb/': [
                {
                    title: '目录',
                    children: [
						['','todo'],
						['MongoDB基本操作','MongoDB基本操作'],
					]
                },
            ],
            '/backend/uwsgi/': [
                {
                    title: '目录',
                    children: [
                        ['', '说明'],
                    ]
                },
            ],
            '/backend/gunicorn/': [
                {
                    title: '目录',
                    children: [
                        ['', '说明'],
                    ]
                },
            ],

            '/devops/docker/': [
                {
                    title: '目录',
                    children: [
                        ['', 'Docker基础知识点'],
                        ['k8s基础', 'k8s基础'],
                    ]
                },
            ],
            '/devops/git/': [
                {
                    title: '目录',
                    children: [
                        ['', 'Git基础知识点'],
                    ]
                },
            ],
			'/devops/jenkins/': [
			    {
			        title: '目录',
			        children: [
			            ['Jenkins专题', 'Jenkins专题'],
			        ]
			    },
			],
            '/devops/notes/': [
                {
                    title: '目录',
                    children: [
                        ['', '代码预检查'],
                    ]
                },
            ],
            '/devops/efficiency/': [
                {
                    title: '目录',
                    children: [
                        ['', '研发效能负面清单'],
                    ]
                },
            ],


            '/softskills/mind/': [
                {
                    title: '目录',
                    children: [
                        ['', '阿里工程师的自我修养'],
                        ['可借鉴的方法论', '可借鉴的方法论'],
                    ]
                },
            ],
            '/softskills/communication/': [
                {
                    title: '目录',
                    children: [
                        ['', '沟通训练'],
                    ]
                },
            ],

            '/opensource/': [
                {
                    title: '目录',
                    children: [
                        ['', '项目列表'],
                    ]
                },
            ],

            '/memo/': [
                {
                    title: '目录',
                    children: [
                        ['', '令人惊艳的链接'],
                        ['help', 'MarkDown文档使用示例'],
                        ['vuepress搭建', 'Vuepress搭建步骤'],
                        ['todo', '待办事项'],
                    ]
                },
            ],
            '/interview/': [
                {
                    title: '目录',
                    children: [
                        ['', '自我介绍'],
                        ['技术面试', '技术面试'],
                        ['HR面试', 'HR面试'],
                        ['简历制作', '简历制作'],
                    ]
                },
            ],


        },
        nav: [
            {
                text: '首页',
                link: '/'
            },
            {
                text: '软件测试体系',
                items: [
                    {text: '测试基础', link: '/qa/basics/'},
                    {text: '自动测试', link: '/qa/automatic/'},
                    {text: '性能测试', link: '/qa/performance/'},
                    {text: '专项测试', link: '/qa/special/'},
                    {text: '安全测试', link: '/qa/security/'},
                    {text: '测试工具', link: '/qa/tool/'},
                    {text: '测试框架', link: '/qa/framework/'},
                    {text: '测试思考', link: '/qa/view/'},
                ]
            },
            {
                text: '计算机基础',
                items: [
                    {text: '计算机网络', link: '/basic/network/'},
                    {text: '操作系统', link: '/basic/os/'},
                    {text: 'Linux', link: '/basic/linux/'},
                    {text: '数据结构与算法', link: '/basic/algorithms/'},
                ]
            },
            {
                text: '前端游乐场',
                ariaLabel: 'Language Menu',
                items: [
                    {text: 'VUE', link: '/frontend/vue/'},
                    {text: 'CSS', link: '/frontend/css/'}
                ]
            },
            {
                text: '后端训练场',
                smoothScroll: true,
                items: [


                    {
                        text: '编程语言', items: [
                            {text: 'Python', link: '/backend/python/'},
                            {text: 'Java', link: '/backend/java/'},
                        ]
                    },
                    {
                        text: 'WEB框架', items: [{text: 'Django', link: '/backend/django/'},
                            {text: 'Django REST Framework', link: '/backend/drf/'},]
                    },
                    {
                        text: '中间件', items: [{text: 'Celery', link: '/backend/celery/'},
                        ]
                    },
                    {
                        text: '数据库', items: [
							{text: 'Mysql', link: '/backend/mysql/'},
                            {text: 'Redis', link: '/backend/redis/'},
                            {text: 'Mongodb', link: '/backend/mongodb/'},
                            {text: 'Elasticsearch', link: '/backend/elasticsearch/'},
							]
                    },
                    {
                        text: '部署', items: [
                            {text: 'Uwsgi', link: '/backend/uwsgi/'},
                            {text: 'Gunicorn', link: '/backend/gunicorn/'},
                        ]
                    },
                ]
            },
            {
                text: 'DevOps',
                items: [
                    {text: 'Docker', link: '/devops/docker/'},
                    {text: 'Git', link: '/devops/git/'},
                    {text: 'DevOps笔记', link: '/devops/notes/'},
                    {text: '研发效能', link: '/devops/efficiency/'},
                ]
            },
            {
                text: '软能力',
                items: [
                    {text: '思考模型', link: '/softskills/mind/'},
                    {text: '沟通能力', link: '/softskills/communication/'},
                ]
            },
            {text: '开源前哨', link: '/opensource/', target: '_self'},
            {text: '备忘录', link: '/memo/', target: '_self'},
            {text: '面试指南', link: '/interview/', target: '_self'}
        ],
        activeHeaderLinks: false,
        smoothScroll: true,
        lastUpdated: '上一次更新',
    },
    plugins: [
        '@vuepress/back-to-top',
        {
            dateOptions: {
                hour24: true
            },
            transformer: (timestamp, lang) => {
                // 不要忘了安装 moment
                const moment = require('moment')
                moment.locale(lang)
                return moment(timestamp).fromNow()
            }
        },
        '@vuepress/active-header-links',
        {
            sidebarLinkSelector: '.sidebar-link',
            headerAnchorSelector: '.header-anchor'
        },
        '@vuepress/nprogress'
    ],
    markdown: {lineNumbers: true}
}
