const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

const getReleaseTimestamp = (video) => {
    const released = video?.released;
    if (!(released instanceof Date) || isNaN(released.getTime())) {
        return null;
    }

    return released.getTime();
};

const getNewEpisodeVideoId = (videos, now = Date.now()) => {
    if (!Array.isArray(videos) || videos.length === 0) {
        return null;
    }

    const newestReleasedVideo = videos.reduce((latestVideo, video) => {
        const releasedAt = getReleaseTimestamp(video);
        if (releasedAt === null || video?.upcoming || releasedAt > now || now - releasedAt > ONE_WEEK_IN_MS) {
            return latestVideo;
        }

        if (latestVideo === null) {
            return video;
        }

        const latestReleasedAt = getReleaseTimestamp(latestVideo);
        if (latestReleasedAt === null || releasedAt > latestReleasedAt) {
            return video;
        }

        return latestVideo;
    }, null);

    return newestReleasedVideo?.id ?? null;
};

module.exports = getNewEpisodeVideoId;
