# YouTube Playlist Sorter

## Description

This project is a Node.js application that sorts YouTube playlists by the actual publication date of the videos. It was inspired by the need to study Eddie Woo's mathematics playlist in a more organized manner.

The main functionality of this application is to:

1. Fetch all videos from a specified YouTube playlist
2. Retrieve the actual publication dates for each video
3. Sort the videos based on their publication dates
4. Display the sorted list of videos with their titles and publication dates

## Inspiration

The inspiration for this project came from a desire to study Eddie Woo's mathematics playlist more effectively. By sorting the videos by their actual publication date, students can follow the natural progression of topics and concepts as they were originally presented.

## Prerequisites

Before running this project, make sure you have:

1. Node.js installed on your system
2. A Google Cloud project with the YouTube Data API v3 enabled
3. An API key for accessing the YouTube Data API

## Installation

1. Clone this repository
2. Navigate to the project directory
3. Install the required dependencies:

```bash
npm install
```

## Configuration

1. Create a `.env` file in the root directory of the project
2. Add your YouTube API key to the `.env` file:

```
YOUTUBE_API_KEY=your_api_key_here
```

## Usage

1. Open the `main.js` file
2. Replace the `playlistUrl` variable with the URL of the YouTube playlist you want to sort:

```javascript
const playlistUrl = "https://www.youtube.com/playlist?list=your_playlist_id";
```

3. Run the script:

```bash
node main.js
```
