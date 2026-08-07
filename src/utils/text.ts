export const CARD_TEXT_LIMIT = 160;

export function truncate(text: string, maxLength = CARD_TEXT_LIMIT): string {
	if (text.length <= maxLength) return text;
	return `${text.slice(0, maxLength).trimEnd()}…`;
}
