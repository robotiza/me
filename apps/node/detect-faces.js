// https://www.youtube.com/watch?v=yBgXx0FLYKc
const fs = require('fs');
const tf = require('@tensorflow/tfjs-node');
const faceapi = require('face-api.js');
const ytdl = require('youtube-dl');

// Load face detection models
async function loadModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk('./models');
  await faceapi.nets.faceLandmark68Net.loadFromDisk('./models');
  await faceapi.nets.faceRecognitionNet.loadFromDisk('./models');
}

// Perform face detection on a video
async function detectFaces(videoPath) {
  const video = await ytdl.exec(videoPath, ['-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best']);

  const detectionOptions = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 });

  const loadedVideo = await tf.node.decodeVideo(videoPath);
  const frames = await tf.node.extractFrames(loadedVideo);

  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    const image = await faceapi.bufferToImage(frame.image.buffer);

    const detections = await faceapi.detectAllFaces(image, detectionOptions)
      .withFaceLandmarks()
      .withFaceDescriptors();

    console.log(`Frame ${i + 1}: ${detections.length} face(s) detected.`);
  }

  tf.dispose(loadedVideo);
  tf.dispose(frames);
}

// Example usage
async function run() {
    // Load face detection models
    await loadModels();
  
    // YouTube video URL
    const videoUrl = 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID';
  
    // Download YouTube video
    ytdl.getInfo(videoUrl, (err, info) => {
      if (err) throw err;
      const videoPath = `${info.id}.mp4`;
  
      ytdl.exec(videoUrl, ['-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best'])
        .pipe(fs.createWriteStream(videoPath))
        .on('finish', async () => {
          console.log('Video downloaded successfully.');
          await detectFaces(videoPath);
          fs.unlinkSync(videoPath); // Remove the downloaded video
        });
    });
  }
  
  run().catch(console.error);