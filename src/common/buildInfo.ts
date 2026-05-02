const buildInfo = require('./buildInfo.js');

export const {
    appVersion,
    commitHash,
    isDebug,
    isProduction,
    sentryDsn,
    serviceWorkerDisabled,
} = buildInfo;
