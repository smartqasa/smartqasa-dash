import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";

export default {
  input: "src/index.js",
  output: {
    file: "dist/elements.js",
    format: "iife", // Using 'iife' for browsers
    name: "SmartQasaElements",
  },
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
  ],
};
