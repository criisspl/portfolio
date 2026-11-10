import { defineConfig, devices } from "@playwright/test";

// Pruebas de punta a punta contra la web compilada, con pantalla de móvil.
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: { baseURL: "http://localhost:4173", trace: "on-first-retry", locale: "es-ES" },
  projects: [{ name: "movil", use: { ...devices["Pixel 7"] } }],
  webServer: {
    command: "npm run build && npm run preview",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI
  }
});
