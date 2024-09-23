const audio = document.querySelector("audio");
const playPauseBtn = document.querySelector(".play");
const playPausePic = document.querySelector(".playPausePic");
const progress = document.querySelector("input");
const currentTimeEl = document.querySelector(".time");
const durationEl = document.querySelector(".duration");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const songImg = document.querySelector(".songImg");
const artistName = document.querySelector(".artist");
const trackName = document.querySelector(".trackName");
const body = document.querySelector("body");

let isPlaying = false;
let currentTrackIndex = 0;

let tracks = [
  {
    audio: "./file-storage/assets/audio/beyonce.mp3",
    img: "./file-storage/assets/img/lemonade.png",
    title: "Don't Hurt Yourself",
    artist: "Beyoncé",
  },
  {
    audio: "./file-storage/assets/audio/dontstartnow.mp3",
    img: "./file-storage/assets/img/dontstartnow.png",
    title: "Don't Start Now",
    artist: "Dua Lipa",
  },
];

playPauseBtn.addEventListener("click", togglePlayPause);
audio.addEventListener("timeupdate", updateProgress);
progress.addEventListener("input", setProgress);

audio.addEventListener('loadedmetadata', () => {
  updateProgress()
  setProgress()
  audio.play();
  isPlaying = true;
});


function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
    playPausePic.src = "./file-storage/assets/svg/play.png";
  } else {
    audio.play();
    playPausePic.src = "./file-storage/assets/svg/pause.png";
  }
  isPlaying = !isPlaying;
}

function updateProgress() {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent;

  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60);
  currentTimeEl.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  const totalMinutes = Math.floor(audio.duration / 60);
  const totalSeconds = Math.floor(audio.duration % 60);
  durationEl.textContent = `${totalMinutes}:${
    totalSeconds < 10 ? "0" : ""
  }${totalSeconds}`;
}

function setProgress() {
  const newTime = (progress.value / 100) * audio.duration;
  audio.currentTime = newTime;
}

prevBtn.addEventListener("click", () => {
  currentTrackIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : tracks.length - 1;
  loadTrack()
  
});

nextBtn.addEventListener("click", () => {
    currentTrackIndex = currentTrackIndex == tracks.length - 1 ? 0: currentTrackIndex+1;
    loadTrack()
    
  });

function loadTrack() {
    audio.src = tracks[currentTrackIndex].audio;
    audio.load(); 
    songImg.src = tracks[currentTrackIndex].img;
    artistName.textContent = tracks[currentTrackIndex].artist;
    trackName.textContent = tracks[currentTrackIndex].title 
    // body.style.backgroundImage = `url("${tracks[currentTrackIndex].img}")`
    body.style.setProperty('--background-image', `url("${tracks[currentTrackIndex].img}")`);
    playPausePic.src = "./file-storage/assets/svg/pause.png"
    
}
setProgress();


  loadTrack()
  updateProgress()