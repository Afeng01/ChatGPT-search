const fs = require('fs');
const path = require('path');
const sites = require('../config/sites.js');

function updateManifest(manifestPath) {
  const fullPath = path.join(__dirname, '..', manifestPath);
  
  try {
    const manifest = require(fullPath);
    manifest.host_permissions = sites.sites.map(site => site.urlPattern);
    manifest.content_scripts[0].matches = sites.sites.map(site => site.urlPattern);
    fs.writeFileSync(fullPath, JSON.stringify(manifest, null, 2));
  } catch (error) {
    console.error(`处理 ${manifestPath} 时出错:`, error);
  }
}

// 使用相对于scripts目录的路径
updateManifest('./staticCh/manifest.json');
updateManifest('./staticFf/manifest.json'); 