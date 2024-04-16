import { readFile } from "fs/promises";
import yaml from "js-yaml";

export async function loadYamlAsJson(yamlFilePath: string) {
    try {
        const fileContents = await readFile(yamlFilePath, "utf-8");
        const yamlContent = yaml.load(fileContents);
        console.log("YAML content loaded and parsed:", yamlContent);
        return yamlContent;
    } catch (e) {
        console.error("Error loading YAML file:", e);
        return null;
    }
}
