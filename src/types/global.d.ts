type QtTransportMessage = {
    data: string;
};

interface QtTransport {
    send: (message: string) => void,
    onmessage: (message: QtTransportMessage) => void,
}

interface Qt {
    webChannelTransport: QtTransport,
}

interface ChromeWebView {
    addEventListener: (type: 'message', listenenr: (event: any) => void) => void,
    removeEventListener: (type: 'message', listenenr: (event: any) => void) => void,
    postMessage: (message: string) => void,
}

interface Chrome {
    webview: ChromeWebView,
}

interface ElectronBridge {
    isElectron: boolean,
    openExternal: (url: string) => Promise<boolean>,
    setFullscreen: (fullscreen: boolean) => Promise<boolean>,
    isFullscreen: () => Promise<boolean>,
    onFullscreenChanged: (listener: (isFullscreen: boolean) => void) => (() => void),
}

declare global {
    var qt: Qt | undefined;
    var chrome: Chrome | undefined;
    interface Window {
        electron?: ElectronBridge;
    }
}

export { };
