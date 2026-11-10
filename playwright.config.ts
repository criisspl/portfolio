import { defineConfig, devices } from "@playwright/test";

// Pruebas de punta a punta contra la web compilada, con la pantalla móvil de referencia (390x844).
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: { baseURL: "http://localhost:4173/portfolio/", trace: "on-first-retry", locale: "es-ES" },
  projects: [{ name: "movil", use: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } } }],
  webServer: {
    command: "npm run preview",
    url: "http://localhost:4173/portfolio/",
    reuseExistingServer: !process.env.CI
  }
});
