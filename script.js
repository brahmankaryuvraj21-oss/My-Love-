console.log("SCRIPT LOADED");

const bgMusic = document.getElementById("bgMusic");

const themes = [
  { class:"theme-1", music:"songs/theme1.mp3" },
  { class:"theme-2", music:"songs/theme2.mp3" },
  { class:"theme-3", music:"songs/theme3.mp3" },
  { class:"theme-4", music:"songs/theme4.mp3" }
];

let currentTheme = 0;

function changeTheme(){
  currentTheme = (currentTheme + 1) % themes.length;

  document.body.className = themes[currentTheme].class;

  bgMusic.pause();
  bgMusic.src = themes[currentTheme].music;
  bgMusic.play().catch(e=>console.log(e));
}
