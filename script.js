const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");

// Format seconds -> "m:ss"
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${secs}`;
}

// Play / pause toggle
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

// Once metadata (like duration) is loaded
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

// Update progress bar as song plays
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${percent}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

// Click on progress bar to seek
progressContainer.addEventListener("click", (e) => {
  const rect = progressContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percent = clickX / rect.width;
  audio.currentTime = percent * audio.duration;
});

// Volume control
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Reset button when song ends
audio.addEventListener("ended", () => {
  playBtn.textContent = "▶";
  progressBar.style.width = "0%";
});

// Placeholder handlers — wire these up if you add a playlist later
document.getElementById("prev-btn").addEventListener("click", () => {
  audio.currentTime = 0;
});

document.getElementById("next-btn").addEventListener("click", () => {
  audio.currentTime = 0;
  audio.play();
  playBtn.textContent = "⏸";
});
