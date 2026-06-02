import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    adapter: "static",
  },
  build: {
    outDir: "dist/client",
  },
});
