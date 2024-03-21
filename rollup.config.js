import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";

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
    resolve(),
    typescript(),
  ],
};
