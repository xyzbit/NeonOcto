# NeonOcto
promtion and rules optimization tools that can be adapted to multiple AI platforms and code platforms, supporting useful functions such as multi-version comparison and feedback mechanisms

# NeonOcto 提示词优化平台

这是一个像素风格的提示词优化平台原型，基于设计文档 `docs/UIUX-desigin-v2.md` 创建。

## 特点

- 像素风格界面设计，具有复古游戏感
- 多平台模型选择支持 (Cursor, 火山引擎等)
- 提示词编辑与优化功能
- 测试用例生成与管理
- 版本历史记录与对比

## 运行方式

直接打开 `index.html` 文件在浏览器中查看原型。

## 交互功能

- 点击平台/模型选择器可以打开下拉菜单
- 点击"🚀 开始优化"按钮会触发闪烁动画并显示对比模态框
- 可以添加/删除测试用例
- 点击历史记录中的版本可以切换当前选中的版本
- 在对比模态框中可以使用 Ctrl+[ 和 Ctrl+] 切换版本(仅UI示意)

## 像素风格资源

项目使用了以下资源：
- Press Start 2P 字体 (来自 Google Fonts)
- 像素化边框和按钮效果
- 动画过渡效果

## 实现技术

- HTML5
- CSS3 (像素风格设计)
- 原生 JavaScript
