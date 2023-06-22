import faceapi from "face-api.js";

export const loadModels = async (path: string = './models') => {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(path);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(path);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(path);
}

export default faceapi;