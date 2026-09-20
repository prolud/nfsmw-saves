import { Download, FileDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  KIND_LABEL,
  formatBytes,
  withBase,
  type RivalEntry,
} from "@/lib/site";
import { cn } from "@/lib/utils";

function RivalInitials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="flex h-28 w-28 items-center justify-center rounded-lg bg-accent/15 text-3xl font-bold text-accent">
      {initials}
    </div>
  );
}

export function SaveCard({ entry }: { entry: RivalEntry }) {
  const title = entry.rival ? entry.rival.name : `Rival ${entry.position}`;

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="flex-row items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <Badge variant="position">Blacklist #{entry.position}</Badge>
          <CardTitle className="text-xl">{title}</CardTitle>
          {entry.rival && (
            <p className="text-sm text-muted">
              {entry.rival.fullName} · {entry.rival.car}
            </p>
          )}
        </div>
        {entry.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={withBase(entry.image)}
            alt={`Imagem do rival ${title}`}
            className="h-28 w-28 rounded-lg object-contain"
            loading="lazy"
          />
        ) : (
          <RivalInitials name={title} />
        )}
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3">
        {entry.saves.length === 0 && (
          <p className="text-sm text-muted">Nenhum save publicado ainda.</p>
        )}

        {entry.saves.map((save) => (
          <div
            key={save.path}
            className="flex items-center justify-between gap-3 rounded-lg border border-line p-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <FileDown className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{KIND_LABEL[save.kind]}</p>
                <p className="truncate text-xs text-muted">
                  {save.name} · {formatBytes(save.size)}
                </p>
              </div>
            </div>
            <a
              href={withBase(save.path)}
              download={save.name}
              className={cn(buttonVariants({ size: "sm" }), "shrink-0")}
            >
              <Download className="size-4" />
              Baixar
            </a>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
