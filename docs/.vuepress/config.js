module.exports = {
    title: '天天UP ↑',
    configureWebpack: {
        resolve: {
            alias: {
                '@img': '/docs/.vuepress/public/assets/img/'
            }
        }
    },
    themeConfig: {
        logo: '/assets/img/logo.png',
        sidebar: {
            '/qa/basics/': [
                {
                    title: '基础知识',
                    children: [
                        ['测试体系概览', '测试体系概览'], //左边文档，右边菜单名称
                        ['测试的生命周期', '测试的生命周期'],
                    ]
                },
            ],
            '/qa/view/': [
                {
                    title: '测试视角',
                    children: [
                        ['不同视角看测试', '不同视角看测试'],
                    ]
                },
            ],
            '/qa/automatic/': [
                {
                    title: '自动化测试',
                    children: [
                        ['自动化测试需要知道的事', '自动化测试需要知道的事'],
                        ['Selenium', 'Selenium'],
                        ['Cypress', 'Cypress'],
                        ['Playwright', 'Playwright'],
                    ]
                },
            ],
            '/qa/performance/': [
                {
                    title: '性能测试',
                    children: [
                        ['TPS、并发数、线程数', '性能测试重要的概念'],
                        ['构建性能测试体系', '构建性能测试体系'],
                        ['Jmeter', 'Jmeter'],
                        ['Locust', 'Locust'],
                    ]
                },
            ],
            '/qa/security/': [
                {
                    title: '安全测试工具',
                    children: [
                        ['Awvs破解', 'Awvs'],
                        ['Nessus破解', 'Nessus'],
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
                                ['WEB SERVER配置安全', 'WEB SERVER配置安全'],
                                ['WEB框架漏洞', 'WEB框架漏洞'],
                                ['访问控制', '访问控制'],
                                ['加密算法安全', '加密算法安全'],
                                ['拒绝服务攻击', '拒绝服务攻击'],
                                ['开发语言安全', '开发语言安全'],
                                ['认证与会话管理', '认证与会话管理'],
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
                    title: '测试工具',
                    children: [
                        ['Docker', 'Docker'],
                        ['Charles', 'Charles'],
                        ['Git', 'Git'],
                        ['BurpSuite', 'BurpSuite'],
                        ['Wireshark', 'Wireshark'],
                    ]
                },
                {
                    title: 'DevOps',
                    children: [
                        ['代码预检查', '代码预检查'],
                    ]
                },
            ],
            '/qa/framework/': [
                {
                    title: '测试框架',
                    children: [
                        ['Pytest', 'Pytest'],
                        ['Unittest', 'Unittest'],
                    ]
                },
            ],

            '/basic/network/': [
                {
                    title: '基础知识',
                    children: [
                        ['计算机网络核心概念', '计算机网络核心概念'],
                        ['HTTP、HTTPS协议', 'HTTP、HTTPS协议'],
                        ['Cookie、Session、Token、JWT', 'Cookie、Session、Token、JWT'],
                    ]
                },
            ],
            '/basic/os/': [
                {
                    title: '操作系统',
                    children: [
                        ['', '占位']
                    ]
                },
            ],
            '/basic/linux/': [
                {
                    title: '基础',
                    children: [
                        ['', '我是标题'],
                        ['Linux快捷键', 'Linux快捷键'],
                        ['Linux环境变量配置', 'Linux环境变量配置'],
                        ['Linux三剑客', 'Linux三剑客'],
                        ['交换机流量镜像', '交换机流量镜像'],
                        ['虚拟机网络连接介绍', '虚拟机网络连接介绍']
                    ]
                },
                {
                    title: '资料',
                    children: ['Linux快捷键']
                },
            ],
            '/basic/algorithms/': [
                {
                    title: '数据结构与算法',
                    children: []
                },
            ],

            '/frontend/vue/': [
                {
                    title: '基础知识',
                    children: [
                        ['Vue基础知识点', 'Vue基础知识点'],
                        ['Vue组件通信', 'Vue组件通信'],
                    ]
                },
            ],
            '/frontend/css/': [
                {
                    title: '基础知识',
                    children: [
                        ['CSS布局技巧', 'CSS布局技巧'],
                        ['flex布局之美', 'flex布局之美'],
                    ]
                },
            ],
            '/backend/python/': [
                {
                    title: 'Python特性',
                    children: [
                        ['90条Python编程建议', '90条Python编程建议'],
                        ['Python优化技巧', 'Python优化技巧'],
                        ['Python实用技巧', 'Python实用技巧'],
                        ['Python并发编程', 'Python并发编程'],
                        ['Python标准库', 'Python标准库'],
                        ['Python正则表达式', 'Python正则表达式'],
                        ['很nice的三方库', '很nice的三方库'],
                        ['深入理解python特性', '深入理解python特性'],
                        ['超全内置函数', '超全内置函数'],
                        ['超全内置函数', '超全内置函数'],
                        ['闭包替换递归', '闭包替换递归'],
                    ]
                },
            ],
            '/backend/django/': [
                {
                    title: 'Django基础知识',
                    children: [
                        ['Django', 'Django'],
                    ]
                },
            ],
            '/backend/drf/': [
                {
                    title: 'Drf基础知识',
                    children: [
                        ['Django REST framework', 'Django REST framework'],
                    ]
                },
            ],
            '/backend/celery/': [
                {
                    title: 'Celery基础知识',
                    children: [
                        ['celery', 'Celery'],
                    ]
                },
            ],
            '/database/mysql/': [
                {
                    title: '基础知识',
                    children: [
                        ['Mysql', 'Mysql'],
                    ]
                },
            ],
            '/database/redis/': [
                {
                    title: '基础知识',
                    children: [
                        ['Redis', 'Redis'],
                    ]
                },
            ],
            '/database/elasticsearch/': [
                {
                    title: '基础知识',
                    children: [
                        ['Elasticsearch', 'Elasticsearch'],
                    ]
                },
            ],
            '/database/mongodb/': [
                {
                    title: '基础知识',
                    children: [
                        ['Elasticsearch', 'Elasticsearch'],
                    ]
                },
            ],
            '/opensource/': [
                {
                    title: '项目参考',
                    children: [
                        ['project', '项目列表'],
                    ]
                },
            ],
            '/softskills/mind/': [
                {
                    title: '思考模型',
                    children: [
                        ['阿里工程师的自我修养', '阿里工程师的自我修养'],
                    ]
                },
                {
                    title: '沟通能力',
                    children: [
                        ['沟通训练营', '沟通训练'],
                    ]
                },
            ],
            '/softskills/communication/': [
                {
                    title: '思考模型',
                    children: [
                        ['阿里工程师的自我修养', '阿里工程师的自我修养'],
                    ]
                },
                {
                    title: '沟通能力',
                    children: [
                        ['沟通训练营', '沟通训练'],
                    ]
                },
            ],
            '/memo/': [
                {
                    title: '备忘录',
                    children: [
                        ['令人惊艳的链接备忘录', '令人惊艳的链接备忘录'],
                    ]
                },
            ]


        },
        nav: [
            {
                text: '首页',
                link: '/'
            },
            {
                text: '软件测试体系',
                items: [
                    {text: '测试基础知识', link: '/qa/basics/'},
                    {text: '自动化测试', link: '/qa/automatic/'},
                    {text: '性能测试', link: '/qa/performance/'},
                    {text: '安全测试', link: '/qa/security/'},
                    {text: '测试工具', link: '/qa/tool/'},
                    {text: '测试框架', link: '/qa/framework/'},
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
                    {text: 'Vue', link: '/frontend/vue/'},
                    {text: 'Css', link: '/frontend/css/'}
                ]
            },
            {
                text: '后端训练场',
                ariaLabel: 'Language Menu',
                items: [
                    {text: 'Python', link: '/backend/python/'},
                    {text: 'Django', link: '/backend/django/'},
                    {text: 'Django REST Framework', link: '/backend/drf/'},
                    {text: 'Celery', link: '/backend/celery/'},
                ]
            },
            {
                text: '数据库',
                ariaLabel: 'Language Menu',
                items: [
                    {text: 'Mysql', link: '/database/mysql/'},
                    {text: 'Redis', link: '/database/redis/'},
                    {text: 'Mongodb', link: '/database/mongodb/'},
                    {text: 'Elasticsearch', link: '/database/elasticsearch/'},
                ]
            },
            {
                text: '开源前哨',
                items: [
                    {text: '项目参考', link: '/opensource/'},
                ]
            },
            {
                text: '软能力',
                items: [
                    {text: '思考模型', link: '/softskills/mind/'},
                    {text: '不咋会沟通', link: '/softskills/communication/'},
                ]
            },
            {
                text: '备忘录',
                items: [
                    {text: '有趣的链接', link: '/memo/'},
                ]
            },

        ],
        displayAllHeaders: true,
        activeHeaderLinks: false,
        smoothScroll: true,
    }
}
