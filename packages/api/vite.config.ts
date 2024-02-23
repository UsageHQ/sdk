import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts()],

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
