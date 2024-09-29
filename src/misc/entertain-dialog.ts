import { loadYamlAsJson } from "../utilities/load-yaml-as-json";
import { deviceType } from "../utilities/device-info";

export async function entertainDialog(config: any, hass: any): Promise<void> {
    if (!config || !hass) return;
    const videoPlayerObj = config.video_player ? hass.states[config.video_player] : undefined;
    const videoSoundObj = config.video_sound ? hass.states[config.video_sound] : undefined;
    const audioPlayerObj = config.audio_player ? hass.states[config.audio_player] : undefined;
    const appListCards = await loadYamlAsJson("/local/smartqasa/config/entertain.yaml");

    const videoPlayerTitle = videoPlayerObj
        ? {
              type: "custom:smartqasa-title-card",
              title: videoPlayerObj.attributes.friendly_name || "TV",
          }
        : undefined;

    const videoPlayerCard = videoPlayerObj
        ? {
              type: "custom:roku-card",
              entity: videoPlayerObj.entity_id,
              tv: true,
              volume_mute: {
                  tap_action: {
                      action: "call-service",
                      service: "script.system_toggle_volume_muted",
                      service_data: {
                          entity_id: videoSoundObj.entity_id || videoPlayerObj.entity_id,
                      },
                  },
              },
              volume_down: {
                  tap_action: {
                      action: "call-service",
                      service: "media_player.volume_down",
                      service_data: {
                          entity_id: videoSoundObj.entity_id || videoPlayerObj.entity_id,
                      },
                  },
              },
              volume_up: {
                  tap_action: {
                      action: "call-service",
                      service: "media_player.volume_up",
                      service_data: {
                          entity_id: videoSoundObj.entity_id || videoPlayerObj.entity_id,
                      },
                  },
              },
          }
        : undefined;

    const audioPlayerTitle = audioPlayerObj
        ? {
              type: "custom:smartqasa-title-card",
              title: audioPlayerObj.attributes.friendly_name || "Audio",
          }
        : undefined;

    const audioPlayerCard = audioPlayerObj
        ? {
              type: "custom:sonos-card",
              entityId: audioPlayerObj.entity_id,
              heightPercentage: 86,
              mediaBrowserItemsPerRow: 3,
              mediaBrowserShowTitleForThumbnailIcons: true,
              showVolumeUpAndDownButtons: true,
              sections: ["player", "volumes", "groups", "grouping", "media browser"],
          }
        : undefined;

    const appListTitle =
        videoPlayerObj || audioPlayerObj
            ? {
                  type: "custom:smartqasa-title-card",
                  title: "Apps",
              }
            : undefined;

    const appListCard =
        videoPlayerObj || audioPlayerObj
            ? {
                  type: "custom:layout-card",
                  layout_type: "custom:grid-layout",
                  layout: {
                      height: "480px",
                      margin: 0,
                      "grid-gap": "var(--sq-dialog-grid-gap)",
                  },
                  cards: appListCards,
              }
            : undefined;

    let gridTemplateColumns = "auto";
    let cards: any = [];

    if (deviceType === "phone") {
        gridTemplateColumns = "95%";
        if (videoPlayerObj && audioPlayerObj) {
            cards = [videoPlayerTitle, videoPlayerCard, audioPlayerTitle, audioPlayerCard, appListTitle, appListCard];
        } else if (!videoPlayerObj && audioPlayerObj) {
            cards = [audioPlayerTitle, audioPlayerCard, appListTitle, appListCard];
        } else if (videoPlayerObj && !audioPlayerObj) {
            cards = [videoPlayerTitle, videoPlayerCard, appListTitle, appListCard];
        }
    } else {
        if (videoPlayerObj && audioPlayerObj) {
            gridTemplateColumns = "340px 420px 260px";
            cards = [videoPlayerTitle, audioPlayerTitle, appListTitle, videoPlayerCard, audioPlayerCard, appListCard];
        } else if (!videoPlayerObj && audioPlayerObj) {
            gridTemplateColumns = "420px 260px";
            cards = [audioPlayerTitle, appListTitle, audioPlayerCard, appListCard];
        } else if (videoPlayerObj && !audioPlayerObj) {
            gridTemplateColumns = "340px 260px";
            cards = [videoPlayerTitle, appListTitle, videoPlayerCard, appListCard];
        }
    }

    const dialogConfig = {
        title: "Entertainment",
        size: "fullscreen",
        timeout: 300000,
        content: {
            type: "custom:layout-card",
            layout_type: "custom:grid-layout",
            layout: {
                margin: 0,
                "place-content": "center",
                "grid-template-columns": gridTemplateColumns,
                "grid-template-rows": "max-content 480px",
                "grid-gap": "var(--sq-dialog-grid-gap)",
            },
            cards: cards,
        },
    };

    window.smartqasa.viewMode = "entertain";
    window.browser_mod?.service("popup", dialogConfig);
}
