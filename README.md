# GPT Search Extension

## 项目简介
GPT Search Extension 是一个浏览器扩展插件，为 ChatGPT 对话界面提供强大的搜索功能。目前支持 ChatGPT.com 和 ChatGPTS.pro 两个平台。

## 主要功能
1. 快速搜索历史对话内容
2. 完美融入 ChatGPT 原生界面
3. 首次缓存后响应极快
4. 支持[高级搜索](./advancedSearch.md)功能

![功能展示](https://github.com/user-attachments/assets/60350b14-d7b8-4f9e-8a3d-9e6816387c0c)

## 用户安装指南

### Chrome/Edge 安装步骤:
1. 下载最新版本的 `.crx` 文件
2. 在浏览器地址栏输入: `chrome://extensions` (Chrome) 或 `edge://extensions` (Edge)
3. 将下载的 `.crx` 文件直接拖拽到扩展页面中
4. 在弹出的确认框中点击"添加扩展程序"

注意：如果遇到"无法添加来自此网站的应用"的提示：
1. 将 `.crx` 文件重命名为 `.zip`
2. 解压到文件夹
3. 开启开发者模式
4. 点击"加载已解压的扩展程序"
5. 选择解压后的文件夹

### Firefox 安装步骤:
1. 下载最新版本的 `.xpi` 文件
2. 在 Firefox 中打开 `about:addons`
3. 点击设置图标(⚙️)，选择"从文件安装附加组件..."
4. 选择下载的 `.xpi` 文件

如果 Firefox 阻止安装：
1. 在地址栏输入 `about:config`
2. 搜索 `xpinstall.signatures.required`
3. 将其设置为 `false`
4. 重新安装 `.xpi` 文件

### 更新方式
1. 下载新版本的安装包
2. 按照上述步骤重新安装
3. 浏览器会自动更新扩展

### 常见问题

#### 安装问题
1. Chrome/Edge提示"无法添加来自此网站的应用"
   - 使用解压方式安装
   - 或在设置中允许来自第三方的扩展

2. Firefox提示"附加组件无法验证"
   - 按照上述Firefox安装说明关闭签名验证
   - 或使用开发者版本Firefox

#### 使用问题
如果插件无法正常工作：
1. 检查浏览器控制台是否有错误信息
2. 确认是否为最新版本
3. 尝试重新安装插件

## 开发者指南

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

4. 打包发布
- Chrome/Edge: 生成 .crx 文件
  1. 打开 Chrome/Edge 扩展管理页面
  2. 开启开发者模式
  3. 点击"打包扩展程序"
  4. 选择 build/unpacked 目录
  5. 生成 .crx 文件和 .pem 密钥文件(请安全保存)

- Firefox: 生成 .xpi 文件
  1. 安装 web-ext 工具: `npm install -g web-ext`
  2. 进入 build/unpacked 目录
  3. 运行: `web-ext build`
  4. 在 web-ext-artifacts 目录找到 .xpi 文件

### 开发注意事项
1. 修改代码后需要重新构建
2. 构建后需要在浏览器扩展页面刷新插件
3. 建议使用开发环境构建(`build:dev`)进行测试
4. 发布前请使用生产环境构建(`build:prod`)

### Windows环境构建问题
如果遇到 'export' 命令不被识别的错误，确保：
1. 使用Git Bash运行命令
2. 已安装cross-env包
3. 已修改package.json中的构建脚本使用cross-env

### 网站配置管理
为了便于添加新的ChatGPT镜像站点支持，本项目使用配置文件管理支持的网站列表。

#### 配置文件结构
1. 在`config/sites.js`中管理支持的网站列表：
```javascript
module.exports = {
  sites: [
    {
      name: "ChatGPT Official",
      domain: "chatgpt.com",
      urlPattern: "https://*.chatgpt.com/*"
    },
    {
      name: "ChatGPTS Pro",
      domain: "chatgpts.pro",
      urlPattern: "https://*.chatgpts.pro/*"
    }
    // 在这里添加新的镜像站点...
  ]
};
```

2. `scripts/updateManifest.js`负责在构建时更新manifest文件：
```javascript
const fs = require('fs');
const sites = require('../config/sites.js');

function updateManifest(manifestPath) {
  const manifest = require(manifestPath);
  manifest.host_permissions = sites.sites.map(site => site.urlPattern);
  manifest.content_scripts[0].matches = sites.sites.map(site => site.urlPattern);
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}

updateManifest('../staticCh/manifest.json');
updateManifest('../staticFf/manifest.json');
```

#### 添加新网站支持
1. 在`config/sites.js`中添加新站点配置：
```javascript
{
  name: "网站名称",
  domain: "example.com",
  urlPattern: "https://*.example.com/*"
}
```

2. 重新构建项目：
```bash
npm run build:dev  # 开发环境
# 或
npm run build:prod # 生产环境
```

构建过程会自动更新manifest文件中的域名权限和内容脚本匹配规则。

#### 配置项说明
- `name`: 网站名称（用于标识）
- `domain`: 网站域名（不含协议和路径）
- `urlPattern`: URL匹配模式（支持通配符）

注意：添加新网站后，请确保：
1. 网站配置格式正确
2. 重新构建项目
3. 测试新添加的网站是否正常工作
4. 更新文档中支持的网站列表

## 更新日志
- 添加对ChatGPTS.pro的支持
- 优化安装方式，提供永久安装包
- 添加打包发布说明
