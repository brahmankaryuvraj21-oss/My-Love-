/******** THEME + MUSIC ********/
const bgMusic = document.getElementById("bgMusic");

const themes = [
  { class:"theme-1", music:"songs/theme1.mp3" },
  { class:"theme-2", music:"songs/theme2.mp3" },
  { class:"theme-3", music:"songs/theme3.mp3" },
  { class:"theme-4", music:"songs/theme4.mp3" }
];

let currentTheme = Number(localStorage.getItem("theme")) || 0;
let musicAllowed = false;

function applyTheme(){
  document.body.classList.remove("theme-1","theme-2","theme-3","theme-4");
  document.body.classList.add(themes[currentTheme].class);

  bgMusic.pause();
  bgMusic.src = themes[currentTheme].music;
  bgMusic.currentTime = 0;

  if(musicAllowed){
    bgMusic.play().catch(()=>{});
  }
}

function changeTheme(){
  musicAllowed = true;
  currentTheme = (currentTheme + 1) % themes.length;
  localStorage.setItem("theme", currentTheme);
  applyTheme();
}

window.addEventListener("load", applyTheme);

/******** ENVELOPES ********/
const data=[
 {img:"images/pic1.jpg",msg:"I love you 💖",song:"songs/song1.mp3"},
 {img:"images/pic2.jpg",msg:"You are my world 🌍",song:"songs/song2.mp3"},
 {img:"images/pic3.jpg",msg:"My heart chose you ❤️",song:"songs/song3.mp3"},
 {img:"images/pic4.jpg",msg:"Forever with you ✨",song:"songs/song4.mp3"},
 {img:"images/pic5.jpg",msg:"My safe place 🌸",song:"songs/song5.mp3"},
 {img:"images/pic6.jpg",msg:"Always you 💕",song:"songs/song6.mp3"},
 {img:"images/pic7.jpg",msg:"Will you marry me? 💍",song:"songs/song7.mp3"}
];

const modal=document.getElementById("modal");
const img=document.getElementById("photo");
const msg=document.getElementById("message");
const audio=document.getElementById("audio");
const proposalBtns=document.getElementById("proposalBtns");

function openEnvelope(i){
 modal.classList.add("active");
 img.src=data[i].img;
 msg.innerText=data[i].msg;
 audio.src=data[i].song;
 audio.play();

 proposalBtns.style.display = (i===6) ? "block" : "none";
 if(i===6) fireworks();
}

function closeEnvelope(){
 modal.classList.remove("active");
 audio.pause();
}

function yes(){alert("She said YES 💖💍");fireworks();}
function no(){alert("Hehe 😄 Take your time ❤️");}

/******** FIREWORKS ********/
function fireworks(){
 for(let i=0;i<8;i++){
  const f=document.createElement("div");
  f.className="firework";
  f.innerText="✨";
  f.style.left=Math.random()*100+"vw";
  f.style.top=Math.random()*100+"vh";
  document.body.appendChild(f);
  setTimeout(()=>f.remove(),1200);
 }
}

/******** VOICE ********/
let recorder,chunks=[],recordedBlob;

function startRecording(){
 navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{
  recorder=new MediaRecorder(stream);
  recorder.start();
  chunks=[];
  recorder.ondataavailable=e=>chunks.push(e.data);
  recorder.onstop=()=>{
   recordedBlob=new Blob(chunks,{type:"audio/mp3"});
   document.getElementById("voicePlayback").src=URL.createObjectURL(recordedBlob);
  };
 });
}
function stopRecording(){if(recorder) recorder.stop();}
function playRecording(){document.getElementById("voicePlayback").play();}
function downloadRecording(){
 if(!recordedBlob) return;
 const a=document.createElement("a");
 a.href=URL.createObjectURL(recordedBlob);
 a.download="Her_Voice.mp3";
 a.click();
}

/******** TEXT ********/
const box=document.getElementById("msgBox");
box.value=localStorage.getItem("loveText")||"";
box.oninput=()=>localStorage.setItem("loveText",box.value);

function saveMessage(){
 const b=new Blob([box.value],{type:"text/plain"});
 const a=document.createElement("a");
 a.href=URL.createObjectURL(b);
 a.download="Love_Message.txt";
 a.click();
}

function share(){
 window.open("https://wa.me/?text="+encodeURIComponent(box.value));
}

function generateLove(){
 const lines=["Forever you ❤️","You are my home 💖","Always us 💍","You make me smile 😊","My heart is yours 💞"];
 document.getElementById("aiLove").innerText=
  lines[Math.floor(Math.random()*lines.length)];
}
