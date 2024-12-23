# GPT Search Extension

## 项目简介
GPT Search Extension 是一个浏览器扩展插件，为 ChatGPT 对话界面提供强大的搜索功能。目前支持 ChatGPT.com 和 ChatGPTS.pro 两个平台。

## 主要功能
1. 快速搜索历史对话内容
2. 完美融入 ChatGPT 原生界面
3. 首次缓存后响应极快
4. 支持[高级搜索](./advancedSearch.md)功能

![功能展示](https://github.com/user-attachments/assets/60350b14-d7b8-4f9e-8a3d-9e6816387c0c)

## 安装方式
- [Chrome商店](https://chromewebstore.google.com/detail/gpt-search/glhkbfoibolghhfikadjikgfmaknpelb)
- [Firefox商店](https://addons.mozilla.org/en-US/firefox/addon/gpt-search)
- [Edge商店](https://microsoftedge.microsoft.com/addons/detail/gpt-search/hcnfioacjbamffbgigbjpdlflnlpaole)

## 开发指南

### 环境要求
- Node.js
- npm
- Git (Windows用户需要Git Bash)
- Chrome/Edge/Firefox浏览器(用于开发测试)

### 项目结构
| 目录 | 说明 |
|------|------|
| src/ | 源代码目录 |
| ├── background/ | 背景脚本 |
| ├── common/ | 公共组件 |
| ├── comps/ | UI组件 |
| static/ | 静态资源 |
| staticCh/ | Chrome版本配置 |
| staticFf/ | Firefox版本配置 |
| build/ | 构建输出目录 |

### 构建步骤

1. 安装依赖
```bash
# 安装项目依赖
npm install

# Windows用户需要安装cross-env
npm install --save-dev cross-env
```

2. 修改配置文件
需要在 `staticCh/manifest.json` 和 `staticFf/manifest.json` 中添加域名支持：

```json
{
  "host_permissions": [
    "https://*.chatgpt.com/",
    "https://*.chatgpts.pro/"
  ],
  "content_scripts": [{
    "matches": [
      "https://chatgpt.com/*",
      "https://chatgpts.pro/*"
    ]
  }]
}
```

3. 构建项目
```bash
# 开发环境构建
npm run build:dev

# 生产环境构建
npm run build:prod
```

4. 浏览器加载插件
- 打开浏览器扩展管理页面 (`edge://extensions/` 或 `chrome://extensions/`)
- 开启"开发者模式"
- 点击"加载已解压的扩展程序"
- 选择 `build/unpacked` 目录

## 常见问题

### Windows环境构建问题
如果遇到 'export' 命令不被识别的错误，确保：
1. 使用Git Bash运行命令
2. 已安装cross-env包
3. 已修改package.json中的构建脚本使用cross-env

### 插件加载问题
如果插件无法正常工作：
1. 检查浏览器控制台是否有错误信息
2. 确认manifest.json中的域名配置是否正确
3. 尝试重新加载插件

## 开发注意事项
1. 修改代码后需要重新构建
2. 构建后需要在浏览器扩展页面刷新插件
3. 建使用开发环境构建(`build:dev`)进行测试

## 更新日志
- 添加对ChatGPTS.pro的支持
- 修复Windows环境下的构建问题
