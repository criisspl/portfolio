// Solo lo que usan las configs (playwright.config.ts) para evitar añadir @types/node.
declare const process: { env: Record<string, string | undefined> };
