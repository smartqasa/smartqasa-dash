import { dialogPopup } from "./dialog-popup";

export function selectOptionDialog(config: any, stateObj: any) {
    if (!stateObj) return;

    const cards = stateObj.attributes.options.map((option: string) => ({
        type: "custom:smartqasa-option-tile",
        entity: stateObj.entity_id,
        option: option,
        trigger: config?.trigger,
    }));

    const dialogConfig = {
        title: stateObj.attributes.friendly_name || stateObj.entity_id,
        timeout: 60000,
        content: {
            type: "custom:smartqasa-vertical-stack",
            cards: cards,
        },
    };

    dialogPopup(dialogConfig);
}
