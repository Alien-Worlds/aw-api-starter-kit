const { camelCase } = require("./change-case/camel-case");
const { paramCase } = require("./change-case/param-case");
const { constantCase } = require("./change-case/constant-case");
const { pascalCase } = require("./change-case/pascal-case");

const fs = require('fs');
const path = require('path');

const replaceApiTags = (folderPath, newName) => {
  const psCase = pascalCase(newName);
  const pmCase = paramCase(newName);
  const cmCase = camelCase(newName);
  const cnCase = constantCase(newName);

  const files = getFiles(folderPath);

  files.forEach(file => {
    const filePath = path.join(folderPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    let replacedContent = content.replace(/PMC_API_/g, pmCase);
    replacedContent = replacedContent.replace(/PSC_API_/g, psCase);
    replacedContent = replacedContent.replace(/CNC_API_/g, cnCase);
    const finalContent = replacedContent.replace(/CC_API_/g, cmCase);

    fs.writeFileSync(filePath, finalContent, 'utf8');
  });

  console.log('API name replacements completed.');
}

const getFiles = (folderPath) => {
  let files = [];

  const contents = fs.readdirSync(folderPath);
  contents.forEach(item => {
    const itemPath = path.join(folderPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isFile()) {
      files.push(item);
    }

    else if (stat.isDirectory()) {
      const subFiles = getFiles(itemPath);
      files = files.concat(subFiles.map(subFile => path.join(item, subFile)));
    }
  });

  return files;
}

const newName = process.argv[2];

if (!newName) {
  console.error('Please provide new API name as command line argument.');
} else {
  replaceApiTags(path.join(__dirname, '../src'), newName);
}
