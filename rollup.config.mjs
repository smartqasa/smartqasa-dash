import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import url from "@rollup/plugin-url";

import { readFileSync } from "fs";
const { version } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

const timestamp = new Date().toISOString();

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
        replace({
            preventAssignment: true,
            __BUILD_VERSION__: JSON.stringify(version),
            __BUILD_TIMESTAMP__: JSON.stringify(timestamp),
        }),
        typescript(),
        url({
            limit: 0,
            destDir: "dist/assets",
            include: ["**/*.webp", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.svg"],
            fileName: "[dirname][hash][extname]",
        }),
    ],
};
