import catalog from "@/generated/saves.json";

export type SaveKind = "before" | "after" | "other";

export interface SaveFile {
  kind: SaveKind;
  name: string;
  /** Caminho relativo à raiz do site, ex: "saves/15th/15th - Before Challange". */
  path: string;
  size: number;
}

export interface RivalInfo {
  name: string;
  fullName: string;
  car: string;
  bounty: number;
}

export interface RivalEntry {
  position: number;
  dir: string;
  label: string;
  rival: RivalInfo | null;
  /** Caminho relativo da imagem do rival, ou null quando ainda não foi adicionada. */
  image: string | null;
  saves: SaveFile[];
}

export interface SavesCatalog {
  generatedAt: string;
  totalRivals: number;
  totalSaves: number;
  rivals: RivalEntry[];
}

export const savesCatalog = catalog as SavesCatalog;

/** Prefixa o basePath do GitHub Pages (quando definido no build). */
export function withBase(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  // Codifica cada segmento (nomes de save têm espaços).
  const encoded = normalized
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")
    .replace(/%2F/g, "/");
  return `${base}${encoded}`;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1).replace(".", ",")} KB`;
  return `${(kb / 1024).toFixed(2).replace(".", ",")} MB`;
}

export function formatBounty(bounty: number): string {
  return `$ ${bounty.toLocaleString("pt-BR")}`;
}

export const KIND_LABEL: Record<SaveKind, string> = {
  before: "Antes do desafio",
  after: "Depois do desafio",
  other: "Save",
};
