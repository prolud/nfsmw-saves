import { MARKERS, type MarkerId } from "@/lib/markers";
import { MarkerPlaque } from "./marker-plaque";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

interface RuleRow {
  middle: MarkerId;
  middleLabel: string;
  pinkSide: "left" | "right";
}

const RULES: RuleRow[] = [
  { middle: "cash", middleLabel: "Dinheiro", pinkSide: "left" },
  { middle: "impound-strike", middleLabel: "Extra Impound Strike", pinkSide: "left" },
  { middle: "impound-release", middleLabel: "Release Car from Impound", pinkSide: "right" },
  { middle: "jail-free", middleLabel: "Get Out of Jail for Free", pinkSide: "right" },
];

function PlaqueWithCaption({
  marker,
  highlight = false,
}: {
  marker: MarkerId;
  highlight?: boolean;
}) {
  const def = MARKERS[marker];
  return (
    <span className="flex w-24 flex-col items-center gap-2">
      <MarkerPlaque
        src={def.file}
        alt={def.alt}
        highlight={highlight}
        framed={marker === "jail-free"}
      />
      <span
        className={cn(
          "text-center text-xs leading-tight",
          highlight ? "font-bold text-accent" : "text-muted",
        )}
      >
        {def.label}
      </span>
    </span>
  );
}

export function PinkSlipRule() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
      {RULES.map((rule) => {
        const middle = MARKERS[rule.middle];
        const left: MarkerId = rule.pinkSide === "left" ? "pink-slip" : "question";
        const right: MarkerId = rule.pinkSide === "right" ? "pink-slip" : "question";
        return (
          <Card key={rule.middle} className="p-4 sm:p-5">
            <p className="text-center text-sm font-bold">
              {rule.middleLabel} no centro{" "}
              <span className="text-accent">
                → Pink Slip à {rule.pinkSide === "left" ? "esquerda" : "direita"}
              </span>
            </p>
            <div className="mt-4 flex items-start justify-center gap-2 sm:gap-3">
              <PlaqueWithCaption marker={left} highlight={left === "pink-slip"} />
              <PlaqueWithCaption marker={middle.id} />
              <PlaqueWithCaption marker={right} highlight={right === "pink-slip"} />
            </div>
            <p className="mt-3 text-center text-xs text-muted">
              Centro: {middle.label}
            </p>
          </Card>
        );
      })}
    </div>
  );
}
