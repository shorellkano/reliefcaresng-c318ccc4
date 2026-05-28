import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    adapter: 'static', // Change from 'node' to 'static'
    prerender: {
      routes: ['/', '/about', '/services', '/contact', '/staff'],
    },
  },
  build: {
    outDir: 'dist/client',
  },
});
