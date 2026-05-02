const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    isElectron: true,
    openExternal: (url) => ipcRenderer.invoke('shell:openExternal', url),
    setFullscreen: (fullscreen) => ipcRenderer.invoke('window:setFullscreen', fullscreen),
    isFullscreen: () => ipcRenderer.invoke('window:isFullscreen'),
    onFullscreenChanged: (listener) => {
        const wrappedListener = (_event, isFullscreen) => listener(isFullscreen);

        ipcRenderer.on('window:fullscreen-changed', wrappedListener);

        return () => {
            ipcRenderer.removeListener('window:fullscreen-changed', wrappedListener);
        };
    },
});
