import { nxE2EPreset } from "@nx/cypress/plugins/cypress-preset";

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: "cypress",
      bundler: "vite",
      webServerCommands: {
        default: "nx run todo-list:serve",
        production: "nx run todo-list:serve:production",
      },
      ciWebServerCommand: "nx run todo-list:serve-static",
    }),
  },
});
