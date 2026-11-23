import { defineConfig, devices } from "@playwright/test";

// Pruebas de punta a punta contra la web compilada, en móvil (390x844) y escritorio (1280x800); los mismos tests corren en ambos.
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: { baseURL: "http://localhost:4173/portfolio/", trace: "on-first-retry", locale: "en-US" },
  projects: [
    { name: "movil", use: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } } },
    { name: "escritorio", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } } }
  ],
  webServer: {
    command: "npm run preview",
    url: "http://localhost:4173/portfolio/",
    reuseExistingServer: !process.env.CI
  }
});
