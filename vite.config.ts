import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    adapter: 'node', // Change from 'cloudflare-pages' to 'node'
    prerender: {
      routes: ['/', '/about', '/services', '/contact', '/staff'],
    },
  },
});
