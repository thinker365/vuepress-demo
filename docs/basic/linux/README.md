[[toc]]
## 方向键或者ctrl+p、ctrl+n
1. 当你看到你想使用的命令时，按 [Enter] 键选中执行。
2. ↑(Ctrl+p) 显示上一条命令
3. ↓(Ctrl+n) 显示下一条命令
## ctrl+u
1. 清除光标之前的内容，在vim和命令行中都适用，不要再一个字符一个字符退格删了，极力推荐使用
2. 在vim中ctrl+u还有复制的作用，一般搭配ctrl+y使用
## ctrl+l
快速清屏，别再clear了
## ctrl+r
在历史命令中查找，比history更高效，根据输入的字符模糊匹配。继续按Ctrl+r，切换匹配的多个结果
## 快速移动光标
1. 快速移动到命令行首：ctrl+a
2. 快速移动到命令行尾：ctrl+e
## 命令行下的复制粘贴
1. 复制：ctrl+insert
2. 粘贴：shift+insert
## 文件以单位显示大小--block-size（K、M、G）
ls -l nginx-access.log --block-size=M
ls -lh

