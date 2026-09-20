eu criei esse repositório por que a maioria dos saves que eu encontrei não estavam organizados e não permitiam escolher exatamente de onde eu queria partir. além disso, a maioria dos saves não vinha com os carros dos oponentes.



1\. Como os saves estão organizados

pra cada posição da blacklist tem 2 saves. o primeiro save é antes de enfrentar o respectivo oponente.

por exemplo: Black List 15 antes é o save que te permite enfrentar o Sonny. O black list 15 depois é o save após enfrentar o sony e conseguir o carro dele.



2\. Alterar o nome de perfil:

se quiser mudar o nome do perfil, é só procurar qualquer editor de save na internet, jogar o save lá e alterar o nome do perfil

exemplo de editor de save: https://www.saveeditonline.com/



3\. Como sempre obter o carro de um rival:

os cards de um rival nem sempre estão na mesma ordem para todos os jogadores. mas existe uma regra que todos sempre seguem. selecione sempre o pink slip do meio. se for dinheiro, a documentação do carro estará no pink slip da esquerda. se for de apreensão, então o documento do carro estará na direita.


---

4\. O site (Next.js + GitHub Pages)

esse repositório também publica um site que agrega todos os saves: cada pasta da blacklist vira um card com os botões de download, busca e ordenação.

- site: https://prolud.github.io/nfsmw-saves (após ativar o Pages nas configurações do repositório, fonte "GitHub Actions")
- como adicionar um save novo: crie uma pasta com o nome da posição (ex: `saves/11th/`) contendo os 2 arquivos de save e, opcionalmente, um `.png` com fundo transparente do rival. no próximo push o workflow faz o build e o novo card aparece sozinho no site, sem precisar mexer no código.
- como rodar localmente: `npm install`, depois `npm run dev`. o `predev`/`prebuild` executa o `scripts/generate-saves.mjs`, que lê as pastas de saves, copia os arquivos para `public/saves/` e gera o catálogo em `src/generated/saves.json`.
- design: fundo `#0e0d0f`, destaques e botões `#d1e8b4`, flat, cantos de 8px, componentes estilo shadcn/ui.

