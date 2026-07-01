import { readdirSync } from "fs";
import { join } from "path";
import CategoryClient from "./CategoryClient";

const CATEGORIES = [
  "interior-wood-alternative",
  "paquet",
  "shepherd-tv", label: "شيبورد و خلفيات التيفي"
  "wood-plastic-composite",
];

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c }));
}

function getFiles(folder: string, exts: string[]): string[] {
  try {
    return readdirSync(folder)
      .filter((f) => !f.startsWith(".") && exts.some((e) => f.toLowerCase().endsWith(e)))
      .sort((a, b) => {
        const na = parseInt(a); const nb = parseInt(b);
        if (!isNaN(na) && !isNaN(nb)) return na - nb;
        return a.localeCompare(b);
      });
  } catch { return []; }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const base = join(process.cwd(), "public", "gallery", category);
  const catalogFiles = getFiles(join(base, "catalogs"), [".pdf"]);
  const workImages = getFiles(join(base, "our-past-work"), [".png", ".jpg", ".jpeg", ".webp"]);

  return <CategoryClient category={category} catalogFiles={catalogFiles} workImages={workImages} />;
}
