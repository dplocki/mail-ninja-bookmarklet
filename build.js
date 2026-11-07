const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const packageJson = require('./package.json');

async function build() {
  const result = await esbuild.build({
    entryPoints: ['src/code.ts'],
    bundle: true,
    minify: true,
    write: false,
    format: 'iife',
  });

  const jsCode = result.outputFiles[0].text;
  const templatePath = path.join(__dirname, 'src/index.html');
  const html = fs.readFileSync(templatePath, 'utf-8')
    .replace('<%= content %>', jsCode)
    .replace('<%= version %>', packageJson.version);

  const outDir = path.join(__dirname, 'out');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(path.join(outDir, 'index.html'), html);
}

build()
  .then(() => {
    console.log('Build completed successfully.');
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
