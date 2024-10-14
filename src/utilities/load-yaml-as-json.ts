import yaml from "js-yaml";

export const loadYamlAsJson = async <T = any>(
  yamlFilePath: string,
): Promise<T> => {
  try {
    const response = await fetch(yamlFilePath);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch YAML file. HTTP Status: ${response.status} - ${response.statusText}`,
      );
    }

    const yamlContent = await response.text();
    return yaml.load(yamlContent) as T;
  } catch (error) {
    console.error("Error fetching and parsing YAML file:", error);

    return {
      type: "custom:smartqasa-title-card",
      title: "Missing file.",
    } as unknown as T;
  }
};
