export interface Project {
	id: string;
	name: string;
	description: string;
	github: string;
	technologies: string[];
	featured?: boolean;
	reference?: {
		label: string;
		url: string;
	};
	repositories?: {
		label: string;
		url: string;
	}[];
}

export interface OpenSourceContribution {
	id: string;
	name: string;
	organization: string;
	description: string;
	repository: string;
	technologies: string[];
	pullRequests: {
		label: string;
		url: string;
		status: "merged" | "open" | "closed";
	}[];
}

export const projects: Project[] = [
	{
		id: "rlox",
		name: "RLOX",
		description:
			"Implementation of the LOX programming language interpreter in Rust. It includes the complete front-end—lexer, parser, AST generation, error reporting, and a tree-walk interpreter—without the bytecode VM.",
		github: "https://github.com/mathecodemoon/RLox",
		technologies: ["Rust", "Interpreters", "Language design"],
		featured: true,
		reference: {
			label: "Crafting Interpreters",
			url: "https://craftinginterpreters.com/",
		},
	},
];

export const openSourceContributions: OpenSourceContribution[] = [
	{
		id: "foundry",
		name: "Foundry",
		organization: "foundry-rs",
		description:
			"Improved Cast ABI encoding developer ergonomics by enforcing strict argument length validation, preventing silent mis-encodings and providing clear error feedback for cast abi-encode and cast calldata.",
		repository: "https://github.com/foundry-rs/foundry",
		technologies: ["Rust", "Cast", "Testing"],
		pullRequests: [
			{ label: "Fix/cast abi strict args", url: "https://github.com/foundry-rs/foundry/pull/11189", status: "merged" },
		],
	},
	{
		id: "builders-hub",
		name: "Builder’s Hub",
		organization: "Avalanche",
		description:
			"Contributed UI maintenance and broader platform hardening, from implementing a complete notification system for users and administrators — resilient, concurrent, and scalable — to session-derived authorization, Markdown sanitization, and centralized role-based access control.",
		repository: "https://github.com/ava-labs/builders-hub",
		technologies: ["TypeScript", "Next.js", "UI", "Security", "Supabase"],
		pullRequests: [
			{ label: "Notifications campaign system", url: "https://github.com/ava-labs/builders-hub/pull/3761", status: "merged" },
			{ label: "Notifications security & metrics fix", url: "https://github.com/ava-labs/builders-hub/pull/3801", status: "merged" },
			{ label: "Hackathons stages & forms", url: "https://github.com/ava-labs/builders-hub/pull/4060", status: "merged" },
		],
	},
];