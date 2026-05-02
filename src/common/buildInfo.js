// Copyright (C) 2017-2026 Smart code 203358507

module.exports = {
    appVersion: __APP_VERSION__,
    commitHash: __APP_COMMIT_HASH__,
    isDebug: __APP_DEBUG__,
    isProduction: !__APP_DEBUG__,
    sentryDsn: __APP_SENTRY_DSN__,
    serviceWorkerDisabled: __APP_SERVICE_WORKER_DISABLED__,
};
