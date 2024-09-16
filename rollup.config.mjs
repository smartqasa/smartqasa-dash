import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import url from "@rollup/plugin-url";

export default {
    input: "src/index.ts",
    output: {
        file: "dist/elements.js",
        format: "es",
        name: "SmartQasaElements",
        inlineDynamicImports: true,
    },
    plugins: [
        babel({
            exclude: "node_modules/**",
            babelHelpers: "bundled",
        }),
        commonjs({
            include: "node_modules/**",
        }),
        image(),
        json(),
        postcss({
            extract: false,
        }),
        resolve({
            browser: true,
            preferBuiltins: false,
        }),
        typescript(),
        url({
            limit: 0,
            destDir: "dist/assets",
            include: ["**/*.webp"],
            fileName: "[dirname][hash][extname]",
        }),
    ],
    context: "window",
};
