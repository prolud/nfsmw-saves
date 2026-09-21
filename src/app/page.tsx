"use client";

import { useMemo, useState } from "react";
import { ArrowDownWideNarrow, Database, Search, Trophy, Users } from "lucide-react";
import { HowToUse } from "@/components/how-to-use";
import { PinkSlipTip } from "@/components/pink-slip-tip";
import { SaveCard } from "@/components/save-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { savesCatalog } from "@/lib/site";

type SortOrder = "asc" | "desc";

export default function Home() {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<SortOrder>("asc");

  const rivals = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = normalized
      ? savesCatalog.rivals.filter((entry) => {
          const haystack = [
            entry.label,
            String(entry.position),
            `#${entry.position}`,
            entry.rival?.name ?? "",
            entry.rival?.fullName ?? "",
            entry.rival?.car ?? "",
          ]
            .join(" ")
            .toLowerCase();
          return haystack.includes(normalized);
        })
      : [...savesCatalog.rivals];

    filtered.sort((a, b) =>
      order === "asc" ? a.position - b.position : b.position - a.position,
    );
    return filtered;
  }, [query, order]);

  const withImage = savesCatalog.rivals.filter((r) => r.image).length;

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-line">
          <div className="mx-auto w-full max-w-6xl px-4 py-14">
            <Badge variant="position" className="mb-4">
              Need for Speed: Most Wanted (2005)
            </Badge>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
              Saves organizados da <span className="text-accent">Blacklist</span>
            </h1>
            <p className="mt-4 max-w-2xl text-muted">
              Para cada rival há 2 saves: um de antes do desafio, para enfrentá-lo, e
              outro de depois, já com o carro dele na garagem. Escolha de onde quer
              partir e baixe direto, sem enrolação.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-ink">
                    <Users className="size-5" />
                  </span>
                  <span>
                    <span className="block text-2xl font-bold">{savesCatalog.totalRivals}</span>
                    <span className="block text-xs text-muted">rivais publicados</span>
                  </span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-ink">
                    <Database className="size-5" />
                  </span>
                  <span>
                    <span className="block text-2xl font-bold">{savesCatalog.totalSaves}</span>
                    <span className="block text-xs text-muted">saves para baixar</span>
                  </span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-ink">
                    <Trophy className="size-5" />
                  </span>
                  <span>
                    <span className="block text-2xl font-bold">{withImage}</span>
                    <span className="block text-xs text-muted">rivais com imagem</span>
                  </span>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Catálogo */}
        <section id="saves" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Escolha seu save</h2>
              <p className="mt-1 text-sm text-muted">
                Novos rivais aparecem aqui automaticamente conforme forem adicionados ao
                repositório.
              </p>
            </div>
            <Button
              variant="dark"
              onClick={() => setOrder((o) => (o === "asc" ? "desc" : "asc"))}
              title="Alternar ordem da blacklist"
            >
              <ArrowDownWideNarrow className="size-4" />
              {order === "asc" ? "Blacklist 1 → 15" : "Blacklist 15 → 1"}
            </Button>
          </div>

          <div className="relative mt-6 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por rival, carro ou posição…"
              className="pl-9"
              aria-label="Buscar saves"
            />
          </div>

          {rivals.length === 0 ? (
            <Card className="mt-6">
              <CardContent className="p-8 text-center text-sm text-muted">
                Nenhum save encontrado para “{query}”. Tente outro nome, carro ou
                posição da blacklist.
              </CardContent>
            </Card>
          ) : (
            <div className="mt-6 flex flex-col gap-4">
              {rivals.map((entry) => (
                <SaveCard key={entry.dir} entry={entry} />
              ))}
            </div>
          )}
        </section>

        <PinkSlipTip />
        <HowToUse />
      </main>

      <SiteFooter />
    </div>
  );
}
