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
        viewMode: string;
        service: (service: string, data?: object) => void;
    };
}
