import yaml from "js-yaml";

export const loadYamlAsJson = async (yamlFilePath: string): Promise<any> => {
    try {
        const response = await fetch(yamlFilePath);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const yamlContent = await response.text();
        return yaml.load(yamlContent);
    } catch (error) {
        console.error("Error fetching and parsing YAML file:", error);
        return {
            type: "custom:smartqasa-title-card",
            title: "Missing file.",
        };
    }
};
