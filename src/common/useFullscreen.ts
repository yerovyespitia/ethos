// Copyright (C) 2017-2023 Smart code 203358507

import { useCallback, useEffect, useState } from 'react';
import useShell, { type WindowVisibility } from './useShell';
import useSettings from './useSettings';

const useFullscreen = () => {
    const shell = useShell();
    const [settings] = useSettings();
    const electron = window.electron;
    const isElectron = electron?.isElectron === true;

    const [fullscreen, setFullscreen] = useState(false);

    const requestFullscreen = useCallback(async () => {
        if (isElectron) {
            await electron.setFullscreen(true);
        } else if (shell.active) {
            shell.send('win-set-visibility', { fullscreen: true });
        } else {
            try {
                await document.documentElement.requestFullscreen();
            } catch (err) {
                console.error('Error enabling fullscreen', err);
            }
        }
    }, [electron, isElectron, shell]);

    const exitFullscreen = useCallback(async () => {
        if (isElectron) {
            await electron.setFullscreen(false);
        } else if (shell.active) {
            shell.send('win-set-visibility', { fullscreen: false });
        } else {
            if (document.fullscreenElement === document.documentElement) {
                await document.exitFullscreen();
            }
        }
    }, [electron, isElectron, shell]);

    const toggleFullscreen = useCallback(() => {
        fullscreen ? exitFullscreen() : requestFullscreen();
    }, [exitFullscreen, fullscreen, requestFullscreen]);

    useEffect(() => {
        const onWindowVisibilityChanged = (state: WindowVisibility) => {
            setFullscreen(state.isFullscreen === true);
        };

        const onFullscreenChange = () => {
            setFullscreen(document.fullscreenElement === document.documentElement);
        };

        const onKeyDown = (event: KeyboardEvent) => {

            const activeElement = document.activeElement as HTMLElement;

            const inputFocused =
                activeElement &&
                (activeElement.tagName === 'INPUT' ||
                 activeElement.tagName === 'TEXTAREA' ||
                 activeElement.tagName === 'SELECT' ||
                 activeElement.isContentEditable);

            if (event.code === 'Escape' && settings.escExitFullscreen) {
                exitFullscreen();
            }

            if (event.code === 'KeyF' && !inputFocused) {
                toggleFullscreen();
            }

            if (event.code === 'F11' && shell.active) {
                toggleFullscreen();
            }
        };

        let removeElectronListener: undefined | (() => void);

        if (isElectron) {
            void electron.isFullscreen().then((isWindowFullscreen) => {
                setFullscreen(isWindowFullscreen);
            });

            removeElectronListener = electron.onFullscreenChanged((isWindowFullscreen) => {
                setFullscreen(isWindowFullscreen);
            });
        } else {
            shell.on('win-visibility-changed', onWindowVisibilityChanged);
        }

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('fullscreenchange', onFullscreenChange);

        return () => {
            removeElectronListener?.();
            if (!isElectron) {
                shell.off('win-visibility-changed', onWindowVisibilityChanged);
            }
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('fullscreenchange', onFullscreenChange);
        };
    }, [electron, exitFullscreen, isElectron, settings.escExitFullscreen, shell, toggleFullscreen]);

    return [fullscreen, requestFullscreen, exitFullscreen, toggleFullscreen];
};

export default useFullscreen;
