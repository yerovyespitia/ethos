// Copyright (C) 2017-2023 Smart code 203358507

const { useModelState } = require('ethos/common');

const useContinueWatchingPreview = () => {
    return useModelState({ model: 'continue_watching_preview' });
};

module.exports = useContinueWatchingPreview;
