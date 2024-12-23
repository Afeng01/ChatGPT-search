const fs = require('fs');
const sites = require('../config/sites.js');

function updateManifest(manifestPath) {
  const manifest = require(manifestPath);
  
  // 更新host_permissions
  manifest.host_permissions = sites.sites.map(site => site.urlPattern);
  
  // 更新content_scripts matches
  manifest.content_scripts[0].matches = sites.sites.map(site => site.urlPattern);
  
  // 写入更新后的manifest
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}

// 更新Chrome和Firefox的manifest
updateManifest('../staticCh/manifest.json');
updateManifest('../staticFf/manifest.json'); 