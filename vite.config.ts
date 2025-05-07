import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: "./index.html",
      output: {
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
  server: {
    host: true,
  },
});
