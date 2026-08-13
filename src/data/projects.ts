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
	pullRequests?: {
		label: string;
		url: string;
		status: "merged" | "open" | "closed";
	}[];
	commits?: {
		label: string;
		url: string;
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
	{
		id: "di-reco",
		name: "DI Reco",
		description:
			"End-to-end computer-vision pipeline built on a convolutional neural network for detecting counterfeit national identity documents. The model learns the fine-grained visual and micro-print artifacts that set genuine ID cards apart from forgeries, adding a robust layer to identity-verification systems and hardening digital-signature workflows against document-forgery attacks.",
		github: "https://github.com/mathecodemoon/di_reco",
		technologies: ["Python", "Deep Learning", "Computer Vision"],
		featured: true,
	},
	{
		id: "simplerag",
		name: "SimpleRAG",
		description:
			"Question-answering assistant over personal documents built on Retrieval-Augmented Generation with InsForge. It combines two LLM-routed strategies: semantic search over pgvector embeddings of the uploaded documents, and read-only SQL queries over structured book metadata, answering only from the documents' content.",
		github: "https://github.com/mathecodemoon/SimpleRAG",
		technologies: ["TypeScript", "React", "RAG", "InsForge", "pgvector", "LLMs"],
		featured: true,
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
			{ label: "Evaluation tampering security fix", url: "https://github.com/ava-labs/builders-hub/pull/3999", status: "merged" },
			{ label: "Hackathons stages & forms", url: "https://github.com/ava-labs/builders-hub/pull/4060", status: "merged" },
		],
	},
	{
		id: "burundi-frontend",
		name: "Burundi Frontend",
		organization: "Bloinx",
		description:
			"Frontend for Burundi, BX Smart Labs' decentralized savings-circle platform. Implemented the group onboarding flow, the member-details integration, and the app drawer that ties the savings features together.",
		repository: "https://github.com/Bloinx/burundi-frontend",
		technologies: ["TypeScript", "Web UI"],
		pullRequests: [
			{ label: "Group onboarding", url: "https://github.com/Bloinx/burundi-frontend/pull/55", status: "merged" },
			{ label: "Member details integration", url: "https://github.com/Bloinx/burundi-frontend/pull/80", status: "merged" },
			{ label: "App drawer", url: "https://github.com/Bloinx/burundi-frontend/pull/46", status: "merged" },
		],
	},
	{
		id: "burundi-blockend",
		name: "Burundi Blockend",
		organization: "Bloinx",
		description:
			"Backend and Solidity smart contracts for Burundi's decentralized savings circles. Led the contracts architecture refactor and implemented the core savings flows — contributions and social loans.",
		repository: "https://github.com/Bloinx/burundi-blockend",
		technologies: ["TypeScript", "Solidity", "Smart Contracts"],
		pullRequests: [
			{ label: "Contracts architecture refactor", url: "https://github.com/Bloinx/burundi-blockend/pull/118", status: "merged" },
			{ label: "Solidarity groups pay", url: "https://github.com/Bloinx/burundi-blockend/pull/108", status: "merged" },
			{ label: "Solidarity groups pay social loan", url: "https://github.com/Bloinx/burundi-blockend/pull/113", status: "merged" },
		],
	},
	{
		id: "graph-hezafin",
		name: "Graph Hezafin",
		organization: "Bloinx",
		description:
			"The Graph subgraph powering Burundi's analytics. Indexed solidarity-group state, weekly transactions, loans, and global stats from the Burundi smart contracts into a queryable GraphQL schema, alongside a Next.js dashboard.",
		repository: "https://github.com/Bloinx/graph-hezafin",
		technologies: ["TypeScript", "The Graph", "GraphQL", "Indexing"],
		commits: [
			{ label: "Group stats indexing", url: "https://github.com/Bloinx/graph-hezafin/commit/8acbe8e" },
			{ label: "Weekly data indexing", url: "https://github.com/Bloinx/graph-hezafin/commit/1ae940d" },
			{ label: "Global stats aggregation", url: "https://github.com/Bloinx/graph-hezafin/commit/407219f" },
		],
	},
];