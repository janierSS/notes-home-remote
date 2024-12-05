import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/bundle.ts",
      name: "NotesHomeModule",
      formats: ["es", "umd"],
      fileName: (format) => `notes-home-module.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react-router-dom",
        "@reduxjs/toolkit",
        "react-redux",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react-redux": "ReactRedux",
          "@reduxjs/toolkit": "RTK",
          "react-router-dom": "reactRouterDom",
        },
      },
    },
  },
  resolve: {
    alias: {
      react: path.resolve("./node_modules/react"),
      "@reduxjs/toolkit": path.resolve("./node_modules/@reduxjs/toolkit"),
      "react-dom": path.resolve("./node_modules/react-dom"),
      "react-router-dom": path.resolve("./node_modules/react-router-dom"),
      "react-redux": path.resolve("./node_modules/react-redux"),
    },
  },
});
