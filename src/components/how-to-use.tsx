import { FolderDown, PencilLine, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STEPS = [
  {
    icon: FolderDown,
    title: "1. Baixe o save",
    text: "Escolha o rival e baixe o save de antes do desafio (para enfrentá-lo) ou de depois (para continuar com o carro dele).",
  },
  {
    icon: Play,
    title: "2. Coloque na pasta do jogo",
    text: "Copie o arquivo para a pasta de saves do jogo, geralmente em Documentos\\NFS Most Wanted, dentro da pasta do seu perfil.",
  },
  {
    icon: PencilLine,
    title: "3. Troque o nome do perfil",
    text: "Se quiser, use um editor de save online (como saveeditonline.com) para alterar o nome do perfil antes de jogar.",
  },
];

export function HowToUse() {
  return (
    <section id="como-usar" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 pb-16">
      <h2 className="text-2xl font-bold">Como usar os saves</h2>
      <p className="mt-1 text-sm text-muted">
        Três passos para continuar sua carreira exatamente de onde quiser.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {STEPS.map((step) => (
          <Card key={step.title}>
            <CardHeader>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-ink">
                <step.icon className="size-5" />
              </span>
              <CardTitle className="text-base">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">{step.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
