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
    const content: string;
    export default content;
}

declare interface DialogConfig {
    title: string;
    size: "normal" | "wide" | "fullscreen";
    timeout: number;
    dismissable: boolean;
    dismiss_action: any;
    autoclose: boolean;
    content: any;
}

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
        dialogStack?: DialogConfig[];
        menuConfig?: any;
        menuTab: number;
        startArea?: string;
        viewMode: string;
        service: (service: string, data?: object) => void;
    };
}
