// Gera os dados do site a partir das pastas de saves do repositório.
//
// Como funciona:
// - Toda pasta dentro de saves/ cujo nome seja uma posição da blacklist
//   (ex: saves/15th, saves/14th, saves/3rd, saves/2nd, saves/1st) vira um
//   card de rival no site.
// - Todo arquivo dentro da pasta (exceto *.png) vira um save baixável.
//   Arquivos com "before" no nome são classificados como "antes do desafio",
//   com "after" como "depois do desafio".
// - O primeiro *.png da pasta vira a imagem do rival no card.
// - Os arquivos são copiados para public/saves/ para download direto no
//   GitHub Pages, e o catálogo é escrito em public/saves.json e
//   src/generated/saves.json (importado estaticamente pela página).
//
// Para adicionar um novo save, basta criar a pasta (ex: saves/11th/) com os 2
// saves e opcionalmente o png do rival. O próximo build publica automaticamente.

import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const SAVES_ROOT = join(ROOT, "saves");

const RIVALS = {
  1: { name: "Razor", fullName: "Clarence Callahan", car: "BMW M3 GTR", bounty: 10000000 },
  2: { name: "Bull", fullName: "Toru Sato", car: "Mercedes-Benz SLR McLaren", bounty: 7550000 },
  3: { name: "Ronnie", fullName: "Ronald McCrea", car: "Aston Martin DB9", bounty: 5550000 },
  4: { name: "JV", fullName: "Joe Vega", car: "Dodge Viper SRT10", bounty: 4050000 },
  5: { name: "Webster", fullName: "Wes Allen", car: "Chevrolet Corvette C6", bounty: 3050000 },
  6: { name: "Ming", fullName: "Hector Domingo", car: "Lamborghini Gallardo", bounty: 2300000 },
  7: { name: "Kaze", fullName: "Kira Nakazato", car: "Mercedes-Benz CLK 500", bounty: 1680000 },
  8: { name: "Jewels", fullName: "Jade Barrett", car: "Ford Mustang GT", bounty: 1180000 },
  9: { name: "Earl", fullName: "Eugene James", car: "Mitsubishi Lancer Evolution VIII", bounty: 790000 },
  10: { name: "Baron", fullName: "Karl Smit", car: "Porsche Cayman S", bounty: 500000 },
  11: { name: "Big Lou", fullName: "Lou Park", car: "Mitsubishi Eclipse GT", bounty: 300000 },
  12: { name: "Izzy", fullName: "Isabel Diaz", car: "Mazda RX-8", bounty: 180000 },
  13: { name: "Vic", fullName: "Victor Vasquez", car: "Toyota Supra", bounty: 100000 },
  14: { name: "Taz", fullName: "Vince Kilic", car: "Lexus IS 300", bounty: 50000 },
  15: { name: "Sonny", fullName: "Ho Seun", car: "Volkswagen Golf GTI", bounty: 20000 },
};

function classifyKind(fileName) {
  const lower = fileName.toLowerCase();
  if (lower.includes("before") || lower.includes("antes")) return "before";
  if (lower.includes("after") || lower.includes("depois")) return "after";
  return "other";
}

const entries = existsSync(SAVES_ROOT)
  ? readdirSync(SAVES_ROOT, { withFileTypes: true })
      .filter((e) => e.isDirectory() && /^(\d+)(st|nd|rd|th)$/i.test(e.name))
      .map((e) => e.name)
      .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
  : [];

const publicSavesDir = join(ROOT, "public", "saves");
const generatedDir = join(ROOT, "src", "generated");
rmSync(publicSavesDir, { recursive: true, force: true });
mkdirSync(publicSavesDir, { recursive: true });
mkdirSync(generatedDir, { recursive: true });

const rivals = [];

for (const dir of entries) {
  const position = parseInt(dir, 10);
  const files = readdirSync(join(SAVES_ROOT, dir)).filter((f) => {
    if (f.startsWith(".")) return false;
    try {
      return statSync(join(SAVES_ROOT, dir, f)).isFile();
    } catch {
      return false;
    }
  });

  const imageFile = files
    .filter((f) => /\.png$/i.test(f))
    .sort((a, b) => a.localeCompare(b))[0] ?? null;

  const saveFiles = files
    .filter((f) => !/\.png$/i.test(f))
    .sort((a, b) => a.localeCompare(b));

  const outDir = join(publicSavesDir, dir);
  mkdirSync(outDir, { recursive: true });

  if (imageFile) copyFileSync(join(SAVES_ROOT, dir, imageFile), join(outDir, imageFile));

  const saves = saveFiles.map((name) => {
    copyFileSync(join(SAVES_ROOT, dir, name), join(outDir, name));
    const size = statSync(join(SAVES_ROOT, dir, name)).size;
    return {
      kind: classifyKind(name),
      name,
      path: `saves/${dir}/${name}`,
      size,
    };
  });

  // Ordena: antes, depois, demais.
  const order = { before: 0, after: 1, other: 2 };
  saves.sort((a, b) => order[a.kind] - order[b.kind] || a.name.localeCompare(b.name));

  rivals.push({
    position,
    dir,
    label: dir,
    rival: RIVALS[position] ?? null,
    image: imageFile ? `saves/${dir}/${imageFile}` : null,
    saves,
  });
}

const catalog = {
  generatedAt: new Date().toISOString(),
  totalRivals: rivals.length,
  totalSaves: rivals.reduce((acc, r) => acc + r.saves.length, 0),
  rivals,
};

writeFileSync(join(publicSavesDir, "..", "saves.json"), JSON.stringify(catalog, null, 2) + "\n");
writeFileSync(join(generatedDir, "saves.json"), JSON.stringify(catalog, null, 2) + "\n");

console.log(
  `saves: ${catalog.totalRivals} rivais, ${catalog.totalSaves} saves -> public/saves + src/generated/saves.json`,
);
