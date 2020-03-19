const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');
// const ffmpegPath = require("ffmpeg-binaries");

// console.log(ffmpegPath);

// ffmpeg.setFfmpegPath(ffmpegPath);

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
  }
});

  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:submit', (e, path) => {
  console.log(path);
  ffmpeg.ffprobe(path, (err, metadata) => {
    mainWindow.webContents.send(
      'video:metadata',
      metadata.format.duration);
  });
});
