// Falla (código 1) si queda algún marcador TODO en los datos: así no se despliega un portfolio a medias.
// Importa los .ts directamente: Node 22.18+ (el 22 de CI) quita los tipos sin flags, y el código
// usa `import type` y extensiones `.ts`. Evita añadir dependencias como vite-node o tsx.
import { contenido } from "../src/data/contenido.ts";
import { listarPendientes } from "../src/lib/pendientes.ts";

const pendientes = listarPendientes(contenido);

if (pendientes.length > 0) {
  console.error(`Hay ${pendientes.length} textos pendientes (TODO:) en src/data/contenido.ts:`);
  for (const ruta of pendientes) console.error(`  - ${ruta}`);
  process.exit(1);
}

console.log("Sin marcadores TODO pendientes.");
