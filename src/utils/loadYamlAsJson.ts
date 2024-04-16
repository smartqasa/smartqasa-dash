import yaml from "js-yaml";

export async function loadYamlAsJson(yamlFilePath: string) {
    try {
        const response = await fetch(yamlFilePath);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const fileContents = await response.text();
        const yamlContent = yaml.load(fileContents);
        console.log("YAML content loaded and parsed:", yamlContent);
        return yamlContent;
    } catch (e) {
        console.error("Error fetching and parsing YAML file:", e);
        return null;
    }
}
