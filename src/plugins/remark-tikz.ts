import type { Code, Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import tex2svg from "isomorphic-tikzjax";

const TIKZ_OPTIONS = {
	texPackages: { "tikz-cd": "", amsmath: "" },
	embedFontCss: true,
	fontCssUrl: "/tikz/fonts.css",
};

/**
 * Renders fenced code blocks tagged with the `tikz` language to SVG at build
 * time using isomorphic-tikzjax (TikZJax under WebAssembly). The resulting
 * SVG is embedded directly into the post's HTML.
 */
export const remarkTikZ: Plugin<[], Root> = () => {
	return async (tree) => {
		const jobs: { node: Code; source: string }[] = [];

		visit(tree, "code", (node) => {
			if (node.lang === "tikz") {
				jobs.push({ node, source: node.value });
			}
		});

		// Render sequentially: isomorphic-tikzjax must not run in parallel.
		for (const { node, source } of jobs) {
			try {
				const svg = await tex2svg(source, TIKZ_OPTIONS);
				// Replace the code node with raw HTML containing the SVG.
				Object.assign(node, {
					type: "html",
					value: `<div class="tikz-diagram">${svg}</div>`,
				});
			} catch (error) {
				console.error(`[remarkTikZ] failed to render tikz block:\n${source}`);
				console.error(error);
				Object.assign(node, {
					type: "html",
					value: `<pre class="tikz-diagram-error">${source}</pre>`,
				});
			}
		}
	};
};
