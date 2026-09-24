import type { Code, Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import tex2svg from "isomorphic-tikzjax";

const TIKZ_OPTIONS = {
	texPackages: { "tikz-cd": "", amsmath: "" },
	embedFontCss: true,
	fontCssUrl: "/tikz/fonts.css",
};

const cacheDir = join(dirname(fileURLToPath(import.meta.url)), "../tikz-cache");

function cacheKey(source: string): string {
	return createHash("sha1").update(source).digest("hex").slice(0, 16);
}

/**
 * Renders fenced code blocks tagged with the `tikz` language to SVG.
 *
 * The SVG is read from the pre-rendered cache under `src/tikz-cache/` when
 * available (so CI/deploy builds do not need to run the TeX WebAssembly
 * engine, which is unreliable in sandboxed build environments). Only when a
 * block is missing from the cache do we fall back to rendering it live with
 * isomorphic-tikzjax, caching the result for the next build.
 *
 * Regenerate the cache locally with: node bin/render-tikz.mjs
 */
export const remarkTikZ: Plugin<[], Root> = () => {
	return async (tree) => {
		const jobs: { node: Code; source: string }[] = [];

		visit(tree, "code", (node) => {
			if (node.lang === "tikz") {
				jobs.push({ node, source: node.value });
			}
		});

		for (const { node, source } of jobs) {
			const id = cacheKey(source);
			const cachedPath = join(cacheDir, `${id}.svg`);
			let svg: string | null = null;

			try {
				svg = readFileSync(cachedPath, "utf8");
			} catch {
				// Not in cache: render live (dev or newly edited diagram).
			}

			if (!svg) {
				try {
					svg = await tex2svg(source, TIKZ_OPTIONS);
				} catch (error) {
					console.error(`[remarkTikZ] failed to render tikz block:\n${source}`);
					console.error(error);
					Object.assign(node, {
						type: "html",
						value: `<pre class="tikz-diagram-error">${source}</pre>`,
					});
					continue;
				}
			}

			Object.assign(node, {
				type: "html",
				value: `<div class="tikz-diagram">${svg}</div>`,
			});
		}
	};
};