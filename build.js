import { build as _build } from 'esbuild';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';


const __dirname = dirname(fileURLToPath(import.meta.url));


async function compileTypeScript(options) {
  const result = await _build({
    entryPoints: ['src/code.ts'],
    write: false,
    bundle: true,
    ...options,
  });

  return result.outputFiles[0].text;
}

async function createOutputDirectory() {
  const outDir = join(__dirname, 'out');
  await mkdir(outDir, { recursive: true });
}

async function saveOutput(fileName, output) {
  const outDir = join(__dirname, 'out');

  await writeFile(join(outDir, fileName), output);
}

async function fillTemplate(jsCode) {
  const packageJson = JSON.parse(await readFile(join(__dirname, 'package.json'), 'utf-8'));
  const templatePath = join(__dirname, 'src/index.html');

  return (await readFile(templatePath, 'utf-8'))
    .replace('<%= content %>', jsCode)
    .replace('<%= version %>', packageJson.version);
}

async function build() {
  await createOutputDirectory();
  const output = await fillTemplate(await compileTypeScript({
    format: 'iife',
    minify: true,
  }));
  await saveOutput('index.html', output);
}

async function buildDev() {
  await createOutputDirectory();
  const output = await compileTypeScript({
    format: 'esm',
  });
  await saveOutput('code.js', output);
}

(process.argv[2] === 'dev'
  ? buildDev
  : build
)()
  .then(() => {
    console.log('Build completed successfully.');
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
