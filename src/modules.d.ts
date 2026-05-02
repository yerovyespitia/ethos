declare module '*.module.css' {
    const resource: Record<string, string>;
    export = resource;
}

declare module 'ethos-router';
declare module 'ethos/components/NavBar';
declare module 'ethos/components/ModalDialog';

declare const __APP_VERSION__: string;
declare const __APP_COMMIT_HASH__: string;
declare const __APP_DEBUG__: boolean;
declare const __APP_SENTRY_DSN__: string;
declare const __APP_SERVICE_WORKER_DISABLED__: boolean;
