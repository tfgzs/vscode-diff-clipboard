const esbuild = require('esbuild');
const glob = require('glob');
const fs = require('fs-extra');

// 清理上次编译留下的out目录
fs.removeSync('out');

// 获取所有的.js文件
const files = glob.sync('src/**/*.js');

const buildOptions = {
  entryPoints: files,
  bundle: true,
  platform: 'node',
  target: 'node14',
  outdir: 'out',
  format: 'cjs',
  sourcemap: true,
  minify: true, // 启用压缩
  treeShaking: true, // 启用tree shaking
  external: ['vscode'] // 将vscode模块标记为外部依赖
}

esbuild.build(buildOptions)
  .then(() => {
  })
  .catch(() => process.exit(1));