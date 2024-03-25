import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import url from "@rollup/plugin-url";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/elements.js",
    format: "iife", // Using 'iife' for browsers
    name: "SmartQasaElements",
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    json(),
    resolve(),
    typescript(),
    url({
      limit: 0,
      destDir: "dist/assets",
      include: ["**/*.webp"],
      fileName: "[dirname][hash][extname]",
    }),
  ],
};
