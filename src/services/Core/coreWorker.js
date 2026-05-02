import Bridge from '@stremio/stremio-core-web/bridge';
import wasmUrl from '@stremio/stremio-core-web/stremio_core_web_bg.wasm?url';

const bridge = new Bridge(self, self);

self.init = async function init({ appVersion, shellVersion }) {
    // `stremio_core_web.js` reads `document.baseURI` at module evaluation time.
    self.document = {
        baseURI: self.location.href,
    };
    self.app_version = appVersion;
    self.shell_version = shellVersion;

    self.get_location_hash = async () => bridge.call(['location', 'hash'], []);
    self.local_storage_get_item = async (key) => bridge.call(['localStorage', 'getItem'], [key]);
    self.local_storage_set_item = async (key, value) => bridge.call(['localStorage', 'setItem'], [key, value]);
    self.local_storage_remove_item = async (key) => bridge.call(['localStorage', 'removeItem'], [key]);

    const core = await import('@stremio/stremio-core-web/stremio_core_web.js');
    const initializeApi = core.default;
    const {
        initialize_runtime: initializeRuntime,
        get_state: getState,
        get_debug_state: getDebugState,
        dispatch,
        analytics,
        decode_stream: decodeStream,
        encode_stream: encodeStream,
    } = core;

    self.getState = getState;
    self.getDebugState = getDebugState;
    self.dispatch = dispatch;
    self.analytics = analytics;
    self.decodeStream = decodeStream;
    self.encodeStream = encodeStream;

    await initializeApi(wasmUrl);
    await initializeRuntime((event) => bridge.call(['onCoreEvent'], [event]));
};
