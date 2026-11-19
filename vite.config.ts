import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: "/drill-baby-drill/",
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "serve-old-index",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url?.split("?")[0];
          if (
            url === "/old" ||
            url === "/old/" ||
            url === "/drill-baby-drill/old" ||
            url === "/drill-baby-drill/old/"
          ) {
            res.writeHead(302, { Location: "/drill-baby-drill/old/index.html" });
            res.end();
            return;
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
