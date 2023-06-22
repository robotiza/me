import { exec } from "child_process";

export async function captureVideo(url: string, outputFilePath: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const command = `youtube-dl -o ${outputFilePath} ${url}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}