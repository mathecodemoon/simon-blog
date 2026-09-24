#!/usr/bin/env node
// Pre-renders every ```tikz fenced block in the blog's markdown posts to an
// SVG file stored in src/tikz-cache/. The remark-tikz plugin reads these cached
// SVGs at build time, so the TeX/WebAssembly engine is only needed when the
// cache is (re)generated (i.e. locally), not on CI/deploy servers.
//
// Usage: node bin/render-tikz.mjs
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import tex2svg from 'isomorphic-tikzjax';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const postsDir = join(root, 'src/content/post');
const cacheDir = join(root, 'src/tikz-cache');

const TIKZ_OPTIONS = {
	texPackages: { 'tikz-cd': '', amsmath: '' },
	embedFontCss: true,
	fontCssUrl: '/tikz/fonts.css',
};

function hash(source) {
	return createHash('sha1').update(source).digest('hex').slice(0, 16);
}

function extractTikzBlocks(markdown) {
	const blocks = [];
	const regex = /```tikz\n([\s\S]*?)```/g;
	let match;
	while ((match = regex.exec(markdown)) !== null) {
		// remark-parse's `node.value` (which the remark plugin hashes) does not
		// include the trailing newline before the closing fence. Strip it so
		// the hashes match and the cache is actually used.
		blocks.push(match[1].replace(/\n$/, ''));
	}
	return blocks;
}

function walk(dir) {
	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const full = join(dir, entry.name);
		return entry.isDirectory() ? walk(full) : full;
	});
}

mkdirSync(cacheDir, { recursive: true });

const files = walk(postsDir).filter((f) => /\.(md|mdx)$/.test(f));
const jobs = [];
for (const file of files) {
	const source = readFileSync(file, 'utf8');
	for (const block of extractTikzBlocks(source)) {
		jobs.push({ file, source: block, id: hash(block) });
	}
}

console.log(`Found ${jobs.length} tikz block(s) in ${files.length} file(s).`);

let rendered = 0;
let cached = 0;
for (const { file, source, id } of jobs) {
	const out = join(cacheDir, `${id}.svg`);
	try {
		readFileSync(out);
		cached++;
		continue;
	} catch {
		// not cached yet
	}
	try {
		const svg = await tex2svg(source, TIKZ_OPTIONS);
		writeFileSync(out, svg);
		rendered++;
		console.log(`  rendered ${id}.svg (${file})`);
	} catch (error) {
		console.error(`  FAILED ${id}.svg (${file})`);
		console.error(error);
		process.exitCode = 1;
	}
}

console.log(`Done. ${rendered} rendered, ${cached} already cached.`);