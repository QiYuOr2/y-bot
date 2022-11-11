const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');

const filePaths = glob.sync('src/**/!(*.ts|js)');

filePaths.forEach(filePath => {
  filePath = path.join(__dirname, '..', filePath);
  if (fs.statSync(filePath).isFile()) {
    const outFilePath = filePath.replace('src', 'dist');
    fs.ensureFileSync(outFilePath);
    fs.writeFileSync(outFilePath, fs.readFileSync(filePath, 'utf-8'));
    console.log(`[${outFilePath}] 创建成功`);
  }
});