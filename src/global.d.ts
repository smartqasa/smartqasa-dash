declare module "*.css" {
    const content: string;
    export default content;
}

declare module "*.jpg" {
    const value: string;
    export default value;
}

declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.webp" {
    const value: string;
    export default value;
}

declare interface DialogConfig {
    title: string;
    size: "normal" | "wide" | "fullscreen";
    timeout: number;
    timeout_action: object;
    dismissable: boolean;
    dismiss_action: object;
    autoclose: boolean;
    content: object;
}

declare const __BUILD_VERSION__: string;
declare const __BUILD_TIMESTAMP__: string;

declare interface Window {
    browser_mod?: {
        service: (service: string, data?: object) => void;
    };
    customCards: Array<Object>;
    fully?: {
        startApplication: (packageName: string) => void;
    };
    smartqasa: {
        chipsConfig?: any;
        menuConfig?: any;
        menuTab: number;
        startArea?: string;
        service: (service: string, data?: object) => void;
        timestamp: string;
        version: string;
    };
}
