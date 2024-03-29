import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts()],

  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "UsageNextSDK",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom", "crypto"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          crypto: "crypto",
        },
      },
    },
  },
});
