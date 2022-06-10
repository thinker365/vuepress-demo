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
                    title: '安全测试',
                    children: [
                        ['Awvs破解', 'Awvs'],
                        ['Nessus破解', 'Nessus'],
                        ['Nessus破解', 'Nessus'],

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
            '/tool/selenium/': [
                {
                    title: '基础知识',
                    children: [
                        ['Selenium', 'Selenium'],
                    ]
                },
            ],
            '/tool/Cypress/': [
                {
                    title: '基础知识',
                    children: [
                        ['Cypress', 'Cypress'],
                    ]
                },
            ],
            '/tool/Charles/': [
                {
                    title: '基础知识',
                    children: [
                        ['Charles', 'Charles'],
                    ]
                },
            ],
            '/tool/BurpSuite/': [
                {
                    title: '基础知识',
                    children: [
                        ['BurpSuite', 'BurpSuite'],
                    ]
                },
            ],
            '/tool/Wireshark/': [
                {
                    title: '基础知识',
                    children: [
                        ['Wireshark', 'Wireshark'],
                    ]
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
                    title: '基础知识',
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
                    title: '基础知识',
                    children: [
                        ['Django', 'Django'],
                    ]
                },
            ],
            '/backend/drf/': [
                {
                    title: '基础知识',
                    children: [
                        ['Django REST framework', 'Django REST framework'],
                    ]
                },
            ],
            '/backend/celery/': [
                {
                    title: '基础知识',
                    children: [
                        ['celery', 'Celery'],
                    ]
                },
            ],
            '/db/mysql/': [
                {
                    title: '基础知识',
                    children: [
                        ['Mysql', 'Mysql'],
                    ]
                },
            ],
            '/db/redis/': [
                {
                    title: '基础知识',
                    children: [
                        ['Redis', 'Redis'],
                    ]
                },
            ],
            '/db/elasticsearch/': [
                {
                    title: '基础知识',
                    children: [
                        ['Elasticsearch', 'Elasticsearch'],
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
                    {text: '操作系统', link: '/basics/os/'},
                    {text: 'Linux', link: '/basic/linux/'},
                    {text: '数据结构与算法', link: '/basic/algorithms/'},
                ]
            },
            // {
            //     text: '自动化工具',
            //     ariaLabel: 'Language Menu',
            //     items: [
            //         {text: 'Selenium', link: '/tool/selenium/'},
            //         {text: 'Cypress', link: '/tool/cypress/'},
            //         {text: 'Charles', link: '/tool/charles/'},
            //         {text: 'BurpSuite', link: '/tool/burpsuite/'},
            //         {text: 'Wireshark', link: '/tool/wireshark/'},
            //     ]
            // },
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
                    {text: 'Mysql', link: '/db/mysql/'},
                    {text: 'Redis', link: '/db/redis/'},
                    {text: 'Mongodb', link: '/db/mongodb/'},
                    {text: 'Elasticsearch', link: '/db/elasticsearch/'},
                ]
            },
            {
                text: '开源前哨',
                items: [
                    {text: '思考模型', link: '/softskills/mysql/'},
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
                    {text: '思考模型', link: '/softskills/mind/'},
                ]
            },

        ],
        displayAllHeaders: true,
        activeHeaderLinks: false,
        smoothScroll: true,
    }
}
