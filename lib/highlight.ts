/**
 * Formulários do admin aceitam `*palavra*` para destacar palavras em vermelho
 * nos títulos (mesmo recurso que RevealText já suporta via `highlightWords`).
 */
export function parseHighlightedText(raw: string): { text: string; highlightWords: string[] } {
  const highlightWords: string[] = [];

  const text = raw.replace(/\*([^*]+)\*/g, (_match, word: string) => {
    for (const piece of word.split(" ")) {
      const clean = piece.replace(/[.,!?]/g, "");
      if (clean) highlightWords.push(clean);
    }
    return word;
  });

  return { text, highlightWords };
}
