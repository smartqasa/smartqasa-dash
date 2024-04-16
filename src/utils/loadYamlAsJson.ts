import yaml from "js-yaml";

export async function loadYamlAsJson(yamlFilePath: string) {
    console.log("Fetching YAML file:", yamlFilePath);
    try {
        const response = await fetch(yamlFilePath);
        if (!response.ok) {
            console.log(`HTTP error! Status: ${response.status}`);
            return;
        }
        const fileContents = await response.text();
        console.log("YAML file fetched:", fileContents);
        const yamlContent = yaml.load(fileContents);
        console.log("YAML content loaded and parsed:", yamlContent);
        return yamlContent;
    } catch (e) {
        console.error("Error fetching and parsing YAML file:", e);
        return null;
    }
}
