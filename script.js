let themes = ["theme-rose", "theme-midnight", "theme-galaxy"];
let currentTheme = 0;

let mediaRecorder;
let audioChunks = [];
let audioURL = null;

const audioPlayback = document.getElementById("audioPlayback");
const bgMusic = document.getElementById("bgMusic");
const textBox = document.getElementById("loveText");

/* LOAD SAVED DATA */
window.onload = () => {
  const savedText = localStorage.getItem("loveText");
  if (savedText) textBox.value = savedText;
};

/* AUTO SAVE TEXT */
textBox.addEventListener("input", () => {
  localStorage.setItem("loveText", textBox.value);
});

/* THEME CHANGE */
function changeTheme() {
  document.body.classList.remove(themes[currentTheme]);
  currentTheme = (currentTheme + 1) % themes.length;
  document.body.classList.add(themes[currentTheme]);
}

/* VOICE RECORDING */
async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  audioChunks = [];

  mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
  mediaRecorder.onstop = () => {
    const blob = new Blob(audioChunks, { type: 'audio/webm' });
    audioURL = URL.createObjectURL(blob);
    audioPlayback.src = audioURL;
    audioPlayback.hidden = false;
  };

  mediaRecorder.start();
}

/* STOP RECORDING */
function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
}

/* PLAY */
function playRecording() {
  if (audioURL) {
    audioPlayback.play();
  }
}

/* MUSIC AUTO PLAY AFTER USER INTERACTION */
document.body.addEventListener("click", () => {
  bgMusic.play().catch(() => {});
}, { once: true });
