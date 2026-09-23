import { BadgeDollarSign } from "lucide-react";
import { PinkSlipRule } from "./pink-slip-rule";

export function PinkSlipTip() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 text-center">
      <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-ink">
        <BadgeDollarSign className="size-5" />
      </span>
      <h2 className="mt-4 text-2xl font-bold">Como sempre ficar com o carro do rival</h2>
      <p className="mx-auto mt-2 max-w-2xl text-sm text-muted">
        A ordem dos marcadores varia por jogador, mas a regra é sempre a mesma:
        olhe o que saiu no marcador do meio e o Pink Slip estará ao lado. O card
        com o X no meio é o Extra Impound Strike.
      </p>
      <div className="mt-8">
        <PinkSlipRule />
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-xs text-muted">
        Imagens dos markers originais do jogo. A ilustração acima usa os mesmos
        ícones da tela de recompensa.
      </p>
    </section>
  );
}
