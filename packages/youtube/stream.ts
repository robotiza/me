import { type Writable } from "stream";
import * as ytdl from "ytdl-core";
import { parseHeader } from "./headers";

const stream = (videoID: string, writeStream: Writable): Promise<void> =>
    new Promise<void>((resolve, reject) => {
        // YouTube video URL
        const videoUrl = `https://www.youtube.com/watch?v=${videoID}`;

        // Start streaming the YouTube video
        const stream = ytdl(videoUrl, { quality: 'highest' });

        // Pipe the video stream to the write stream
        stream.pipe(writeStream);

        let headers: object = {};
        parseHeader(stream, (error, header) => {
            if (error) {
                console.error('Error:', error.message);
                return;
            }
            console.log('Header:', header);
            headers['content-length'] = header['content-length'];
        })

        // Track progress while downloading
        let downloadedBytes = 0;
        stream.on('data', (chunk) => {
            downloadedBytes += chunk.length;
            const length = /*stream.*/headers['content-length'];
            if (length === undefined) return;
            const progress = (downloadedBytes / length) * 100;
            console.log(`Downloaded: ${progress.toFixed(2)}%`);
        });

        // Handle errors
        stream.on('error', (err) => {
            console.error('Error:', err.message);
            reject(err);
        });

        // Handle download completion
        writeStream.on('finish', () => {
            console.log('Video downloaded successfully');
            // You can now perform further processing on the downloaded video if needed
            resolve
        });

        // Handle write stream errors
        writeStream.on('error', (err) => {
            console.error('Write Stream Error:', err.message);
            reject(err);
        });
    });

export default stream;