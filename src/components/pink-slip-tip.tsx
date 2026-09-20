import { BadgeDollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function PinkSlipTip() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16">
      <Card className="border-accent/40">
        <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-ink">
            <BadgeDollarSign className="size-5" />
          </span>
          <div>
            <h2 className="font-bold">Como sempre ficar com o carro do rival</h2>
            <p className="mt-1 text-sm text-muted">
              A ordem dos marcadores varia por jogador, mas a regra é sempre a mesma:
              selecione primeiro o pink slip do meio. Se sair dinheiro, o documento do
              carro está no marcador da esquerda. Se sair apreensão (impound), o
              documento está no marcador da direita.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
