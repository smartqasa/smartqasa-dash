import type {
    Auth,
    Connection,
    HassConfig,
    HassEntities,
    HassEntity,
    HassServices,
    HassServiceTarget,
    MessageBase,
} from "home-assistant-js-websocket";

declare global {
    // for fire event
    interface HASSDomEvents {
        "value-changed": {
            value: unknown;
        };
        change: undefined;
    }
}

type EntityCategory = "config" | "diagnostic";

export interface EntityRegistryDisplayEntry {
    entity_id: string;
    name?: string;
    icon?: string;
    device_id?: string;
    area_id?: string;
    labels: string[];
    hidden?: boolean;
    entity_category?: EntityCategory;
    translation_key?: string;
    platform?: string;
    display_precision?: number;
}

export interface DeviceRegistryEntry {
    id: string;
    config_entries: string[];
    connections: Array<[string, string]>;
    identifiers: Array<[string, string]>;
    manufacturer: string | null;
    model: string | null;
    name: string | null;
    labels: string[];
    sw_version: string | null;
    hw_version: string | null;
    serial_number: string | null;
    via_device_id: string | null;
    area_id: string | null;
    name_by_user: string | null;
    entry_type: "service" | null;
    disabled_by: "user" | "integration" | "config_entry" | null;
    configuration_url: string | null;
}

export interface AreaRegistryEntry {
    area_id: string;
    floor_id: string | null;
    name: string;
    picture: string | null;
    icon: string | null;
    labels: string[];
    aliases: string[];
}

export interface Resources {
    [language: string]: Record<string, string>;
}

export interface Credential {
    auth_provider_type: string;
    auth_provider_id: string;
}

export interface MFAModule {
    id: string;
    name: string;
    enabled: boolean;
}

export interface CurrentUser {
    id: string;
    is_owner: boolean;
    is_admin: boolean;
    name: string;
    credentials: Credential[];
    mfa_modules: MFAModule[];
}

export interface ServiceCallRequest {
    domain: string;
    service: string;
    serviceData?: Record<string, any>;
    target?: HassServiceTarget;
}

export interface Context {
    id: string;
    parent_id?: string;
    user_id?: string | null;
}

export interface ServiceCallResponse {
    context: Context;
}

export interface HomeAssistant {
    auth: Auth;
    connection: Connection;
    connected: boolean;
    states: HassEntities;
    entities: { [id: string]: EntityRegistryDisplayEntry };
    devices: { [id: string]: DeviceRegistryEntry };
    areas: { [id: string]: AreaRegistryEntry };
    services: HassServices;
    config: HassConfig;
    panelUrl: string;
    language: string;
    selectedLanguage: string | null;
    resources: Resources;
    suspendWhenHidden: boolean;
    enableShortcuts: boolean;
    vibrate: boolean;
    dockedSidebar: "docked" | "always_hidden" | "auto";
    defaultPanel: string;
    moreInfoEntityId: string | null;
    user?: CurrentUser;
    callService(
        domain: ServiceCallRequest["domain"],
        service: ServiceCallRequest["service"],
        serviceData?: ServiceCallRequest["serviceData"],
        target?: ServiceCallRequest["target"]
    ): Promise<ServiceCallResponse>;
    callApi<T>(
        method: "GET" | "POST" | "PUT" | "DELETE",
        path: string,
        parameters?: Record<string, any>,
        headers?: Record<string, string>
    ): Promise<T>;
    fetchWithAuth(path: string, init?: Record<string, any>): Promise<Response>;
    sendWS(msg: MessageBase): void;
    callWS<T>(msg: MessageBase): Promise<T>;
    formatEntityState(stateObj: HassEntity, state?: string): string;
    formatEntityAttributeValue(stateObj: HassEntity, attribute: string, value?: string): string;
    formatEntityAttributeName(stateObj: HassEntity, attribute: string): string;
}

export interface HassArea {
    area_id: string;
    aliases: string[];
    floor_id: string;
    icon: string;
    labels: string[];
    name: string;
    picture: string;
}

export interface LovelaceCard extends HTMLElement {
    hass?: HomeAssistant;
    preview?: boolean;
    layout?: string;
    getCardSize(): number | Promise<number>;
    getLayoutOptions?(): LovelaceLayoutOptions;
    setConfig(config: LovelaceCardConfig): void;
}

export interface LovelaceCardConfig {
    index?: number;
    view_index?: number;
    view_layout?: any;
    layout_options?: LovelaceLayoutOptions;
    type: string;
    [key: string]: any;
}

type LovelaceLayoutOptions = {
    grid_columns?: number;
    grid_rows?: number;
};

export interface DialogConfig {
    title: string;
    size: "normal" | "wide" | "fullscreen";
    timeout: number;
    dismissable: boolean;
    dismiss_action: any;
    autoclose: boolean;
    content: any;
}
