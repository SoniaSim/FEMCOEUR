import type { PortableTextBlock } from "next-sanity";

/**
 * Convertit un tableau de Portable Text blocks en texte brut.
 * Utile pour les aperçus, descriptions courtes, biographies.
 */
export function toPlainText(blocks: PortableTextBlock[] | undefined): string {
  if (!blocks) return "";
  return blocks
    .filter((block) => block._type === "block")
    .map((block) => {
      if (!block.children) return "";
      return (block.children as { text: string }[])
        .map((child) => child.text)
        .join("");
    })
    .join("\n\n");
}
