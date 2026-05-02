// Copyright (C) 2017-2023 Smart code 203358507

const { FileDropProvider, onFileDrop } = require('./FileDrop');
const { PlatformProvider, usePlatform } = require('./Platform');
const { ToastProvider, useToast } = require('./Toast');
const { TooltipProvider, Tooltip } = require('./Tooltips');
const { ShortcutsProvider, useShortcuts, onShortcut } = require('./Shortcuts');
const CONSTANTS = require('./CONSTANTS');
const { withCoreSuspender, useCoreSuspender } = require('./CoreSuspender');
const getVisibleChildrenRange = require('./getVisibleChildrenRange');
const interfaceLanguages = require('./interfaceLanguages.json');
const languageNames = require('./languageNames.json');
const languages = require('./languages');
const routesRegexp = require('./routesRegexp');
const useAnimationFrame = require('./useAnimationFrame');
const useBinaryState = require('./useBinaryState');
const useFullscreen = require('./useFullscreen');
const useInterval = require('./useInterval');
const useLiveRef = require('./useLiveRef');
const useModelState = require('./useModelState');
const useNotifications = require('./useNotifications');
const useOnScrollToBottom = require('./useOnScrollToBottom');
const useProfile = require('./useProfile');
const useSettings = require('./useSettings');
const useShell = require('./useShell');
const useStreamingServer = require('./useStreamingServer');
const useTimeout = require('./useTimeout');
const usePlayUrl = require('./usePlayUrl');
const useTorrent = require('./useTorrent');
const useTranslate = require('./useTranslate');
const useOrientation = require('./useOrientation');
const useLanguageSorting = require('./useLanguageSorting');

module.exports = {
    FileDropProvider,
    onFileDrop,
    PlatformProvider,
    usePlatform,
    ShortcutsProvider,
    useShortcuts,
    onShortcut,
    ToastProvider,
    useToast,
    TooltipProvider,
    Tooltip,
    CONSTANTS,
    withCoreSuspender,
    useCoreSuspender,
    getVisibleChildrenRange,
    interfaceLanguages,
    languageNames,
    languages,
    routesRegexp,
    useAnimationFrame,
    useBinaryState,
    useFullscreen,
    useInterval,
    useLiveRef,
    useModelState,
    useNotifications,
    useOnScrollToBottom,
    useProfile,
    useSettings,
    useShell,
    useStreamingServer,
    useTimeout,
    usePlayUrl,
    useTorrent,
    useTranslate,
    useOrientation,
    useLanguageSorting,
};
