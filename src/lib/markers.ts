export type MarkerId =
  | "pink-slip"
  | "cash"
  | "impound-strike"
  | "impound-release"
  | "jail-free"
  | "question";

export interface MarkerDef {
  id: MarkerId;
  /** Caminho relativo à raiz do site, ex: "markers/cash.png". */
  file: string;
  /** Nome curto exibido abaixo da placa. */
  label: string;
  alt: string;
}

export const MARKERS: Record<MarkerId, MarkerDef> = {
  "pink-slip": {
    id: "pink-slip",
    file: "markers/pink-slip.png",
    label: "Pink Slip",
    alt: "Marker Pink Slip, o documento do carro do rival",
  },
  cash: {
    id: "cash",
    file: "markers/cash.png",
    label: "Dinheiro",
    alt: "Marker de dinheiro extra",
  },
  "impound-strike": {
    id: "impound-strike",
    file: "markers/impound-strike.png",
    label: "Extra Impound Strike",
    alt: "Marker Extra Impound Strike, com um X no meio",
  },
  "impound-release": {
    id: "impound-release",
    file: "markers/impound-release.png",
    label: "Release Car from Impound",
    alt: "Marker Release Car from Impound",
  },
  "jail-free": {
    id: "jail-free",
    file: "markers/handcuffs.png",
    label: "Get Out of Jail for Free",
    alt: "Marker Get Out of Jail for Free, com algemas no meio",
  },
  question: {
    id: "question",
    file: "markers/question.png",
    label: "?",
    alt: "Marker misterioso ainda não revelado",
  },
};
