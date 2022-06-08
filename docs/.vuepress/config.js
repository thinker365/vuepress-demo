module.exports = {
    title: '怪正经的公民',//网站名
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
            // {
            //     text: '软件测试体系',
            //     ariaLabel: 'Language Menu',
            //     items: [
            //         {text: 'Chinese', link: '/language/chinese/'},
            //         {text: 'Japanese', link: '/language/japanese/'}
            //     ]
            // },
            {
                text: '计算机基础',
                ariaLabel: 'Language Menu',
                items: [
                    {text: '计算机网络', link: '/basic/network/'},
                    {text: '操作系统', link: '/basic/os/'},
                    {text: 'Linux', link: '/basic/linux/'},
                ]
            },
            //     {
            //         text: '自动化工具',
            //         ariaLabel: 'Language Menu',
            //         items: [
            //             {text: 'Selenium', link: '/language/chinese/'},
            //             {text: 'Cypress', link: '/language/japanese/'},
            //             {text: 'Charles', link: '/language/japanese/'},
            //             {text: 'BurpSuite', link: '/language/japanese/'},
            //             {text: 'Wireshark', link: '/language/japanese/'},
            //         ]
            //     },
            //     {
            //         text: '前端游乐场',
            //         ariaLabel: 'Language Menu',
            //         items: [
            //             {text: 'Vue', link: '/language/chinese/'},
            //             {text: 'CSS', link: '/language/japanese/'}
            //         ]
            //     },
            //     {
            //         text: '后端训练场',
            //         ariaLabel: 'Language Menu',
            //         items: [
            //             {text: 'Python', link: '/language/chinese/'},
            //             {text: 'Django', link: '/language/japanese/'},
            //             {text: 'Django REST Framework', link: '/language/japanese/'},
            //         ]
            //     },
            //     {
            //         text: '数据库',
            //         ariaLabel: 'Language Menu',
            //         items: [
            //             {text: 'Mysql', link: '/language/chinese/'},
            //             {text: 'Redis', link: '/language/japanese/'},
            //             {text: 'MongoDB', link: '/language/japanese/'},
            //             {text: 'Elasticsearch', link: '/language/japanese/'},
            //         ]
            //     },
            //     {
            //         text: '开源前哨',
            //         link: '/'
            //     },
            //
        ],
        displayAllHeaders: true,
        activeHeaderLinks: false,
    }
}
