import yaml from "js-yaml";

export async function loadYamlAsJson(yamlFilePath: string) {
    try {
        const response = await fetch(yamlFilePath);
        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            return {
                type: "custom:smartqasa-title-card",
                title: "Missing file.",
            };
        }
        const yamlContent = await response.text();
        const jsonContent = yaml.load(yamlContent);
        return jsonContent;
    } catch (e) {
        console.error("Error fetching and parsing YAML file:", e);
        return {
            type: "custom:smartqasa-title-card",
            title: "Missing file.",
        };
    }
}
