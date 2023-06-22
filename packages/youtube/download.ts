import * as fs from "fs";
import stream from "./stream";

const download = (videoID: string): Promise<void> => {
    // YouTube video URL
    const videoUrl = `https://www.youtube.com/watch?v=${videoID}`;

    // Create a write stream to save the video
    const videoPath = `./videos/${videoID}.mp4`;
    const writeStream = fs.createWriteStream(videoPath);

    return stream(videoID, writeStream);
};

export default download;