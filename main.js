const axios = require("axios");
const { google } = require("googleapis");

const playlistUrl =
	"https://www.youtube.com/playlist?list=PL5KkMZvBpo5CyhzaViGUSFc164691gd0G";
const API_KEY = process.env.YOUTUBE_API_KEY;
const youtube = google.youtube({
	version: "v3",
	auth: API_KEY,
});

async function getPlaylistItems(playlistId) {
	let items = [];
	let nextPageToken = null;

	do {
		const response = await youtube.playlistItems.list({
			part: "snippet",
			playlistId: playlistId,
			maxResults: 50,
			pageToken: nextPageToken,
		});

		items = items.concat(response.data.items);
		nextPageToken = response.data.nextPageToken;
	} while (nextPageToken);

	return items;
}

async function getVideoDetails(videoIds) {
	const response = await youtube.videos.list({
		part: "snippet",
		id: videoIds.join(","),
	});
	return response.data.items;
}

async function sortPlaylistByDate(playlistUrl) {
	// Extract playlist ID from URL
	const playlistId = playlistUrl.split("list=")[1];

	try {
		const items = await getPlaylistItems(playlistId);

		// Get video IDs
		const videoIds = items.map((item) => item.snippet.resourceId.videoId);

		// Get video details
		const videoDetails = await getVideoDetails(videoIds);

		// Create a map of video IDs to their actual publish dates
		const publishDates = Object.fromEntries(
			videoDetails.map((video) => [video.id, video.snippet.publishedAt])
		);

		// Sort items by actual publishedAt date
		const sortedItems = items.sort((a, b) => {
			const dateA = new Date(publishDates[a.snippet.resourceId.videoId]);
			const dateB = new Date(publishDates[b.snippet.resourceId.videoId]);
			return dateA - dateB;
		});

		// Return sorted video information with correct publish date
		return sortedItems.map((item) => ({
			title: item.snippet.title,
			videoId: item.snippet.resourceId.videoId,
			publishedAt: publishDates[item.snippet.resourceId.videoId],
		}));
	} catch (error) {
		console.error("Error retrieving playlist:", error.message);
		return null;
	}
}

sortPlaylistByDate(playlistUrl)
	.then((sortedVideos) => {
		if (sortedVideos) {
			console.log("Sorted videos:", sortedVideos);
		}
	})
	.catch((error) => {
		console.error("Error:", error);
	});
