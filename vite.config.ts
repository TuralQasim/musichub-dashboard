import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createServer as createViteServer } from "vite";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [mkcert({ hosts: ["local.music-hub.ru"] }), react()],
  server: { https: true },
});
