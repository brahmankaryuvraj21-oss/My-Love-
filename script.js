// Data
const data=[
 {img:"images/pic1.jpg",msg:"I love you, My Love 💕",song:"songs/song1.mp3"},
 {img:"images/pic2.jpg",msg:"You are my world 🌍",song:"songs/song2.mp3"},
 {img:"images/pic3.jpg",msg:"Every heartbeat says your name ❤️",song:"songs/song3.mp3"},
 {img:"images/pic4.jpg",msg:"Forever feels right with you ✨",song:"songs/song4.mp3"},
 {img:"images/pic5.jpg",msg:"My safe place is you 🌸",song:"songs/song5.mp3"},
 {img:"images/pic6.jpg",msg:"My heart chose you 💖",song:"songs/song6.mp3"},
 {img:"images/pic7.jpg",msg:"Will you marry me? 💍",song:"songs/song7.mp3"}
];

let current=0;
const modal=document.getElementById("modal");
const img=document.getElementById("photo");
const msg=document.getElementById("message");
const audio=document.getElementById("audio");
const proposalBtns=document.getElementById("proposalBtns");

data.sort(()=>Math.random()-0.5);

// Envelope Functions
function openEnvelope(i){
 current=i;
 modal.classList.add("active");
 proposalBtns.style.display="none";
 img.classList.remove("proposal");
 audio.pause(); audio.currentTime=0;
 img.src=data[i].img;
 msg.innerText=data[i].msg;
 audio.src=data[i].song;
 audio.play();
 if(i===6){
  img.classList.add("proposal");
  proposalBtns.style.display="block";
  fireworks();
 }
 hearts();
}

function closeEnvelope(){modal.classList.remove("active");audio.pause();}
function unlockProposal(){if(confirm("Final message 💍 Ready?"))openEnvelope(6);}
function yes(){alert("She said YES 💖💍");fireworks();}
function no(){alert("Try again 😄💗");}

// Hearts
function hearts(){
 for(let i=0;i<15;i++){
  const h=document.createElement("div");
  h.className="heart";
  h.innerText="💖";
  h.style.left=Math.random()*100+"vw";
  h.style.animationDuration=2+Math.random()*3+"s";
  document.body.appendChild(h);
  setTimeout(()=>h.remove(),5000);
 }
}

// Fireworks
function fireworks(){
 for(let i=0;i<10;i++){
  const f=document.createElement("div");
  f.className="firework";
  f.innerText="✨";
  f.style.left=Math.random()*100+"vw";
  f.style.top=Math.random()*100+"vh";
  document.body.appendChild(f);
  setTimeout(()=>f.remove(),1200);
 }
}

// Confetti
function startConfetti(){
 for(let i=0;i<30;i++){
  const c=document.createElement("div");
  c.className="confetti";
  c.innerText="🎉";
  c.style.left=Math.random()*100+"vw";
  c.style.animationDuration=2+Math.random()*2+"s";
  document.body.appendChild(c);
  setTimeout(()=>c.remove(),4000);
 }
}

// Theme Toggle
let themeIndex=1;
function toggleTheme(){
 themeIndex++;
 if(themeIndex>4) themeIndex=1;
 document.body.className='theme'+themeIndex;
}

// Secret watermark
let clicks=0;
document.getElementById("watermark").onclick=()=>{
 clicks++;
 if(clicks===5)alert("💖 Secret: I choose you in every universe.");
};

// Save message
function saveMessage(){
 const t=document.getElementById("msgBox").value;
 if(!t)return alert("Write something ❤️");
 const b=new Blob([t],{type:"text/plain"});
 const a=document.createElement("a");
 a.href=URL.createObjectURL(b);
 a.download="Message_From_My_Love.txt";
 a.click();
}

// Share
function share(){
 window.open("https://wa.me/?text="+encodeURIComponent("Our love 💖 "+location.href));
}

// AI Love Generator
function generateLove(){
 const lines=[
  "Every lifetime I would choose you 💖",
  "You are my miracle 🌸",
  "Forever begins with you 💍",
  "My heart is home with you ❤️"
 ];
 document.getElementById("aiLove").innerText=
  lines[Math.floor(Math.random()*lines.length)];
}

// QR
function drawQR(){
 const c=document.getElementById("qr");
 const x=c.getContext("2d");
 x.fillStyle="#fff";x.fillRect(0,0,120,120);
 x.fillStyle="#000";
 for(let i=0;i<120;i+=10)
  for(let j=0;j<120;j+=10)
   if(Math.random()>.5)x.fillRect(i,j,8,8);
}
drawQR();

// Service Worker
if("serviceWorker"in navigator){
 navigator.serviceWorker.register("sw.js");
}

// Parallax
window.addEventListener("mousemove",e=>{
 document.querySelector(".parallax").style.transform=
  `translate(${e.clientX/50}px,${e.clientY/50}px)`;
});

// Voice Recorder
let mediaRecorder, audioChunks=[];
function startRecording(){
 navigator.mediaDevices.getUserMedia({audio:true})
  .then(stream=>{
   mediaRecorder=new MediaRecorder(stream);
   mediaRecorder.start();
   audioChunks=[];
   mediaRecorder.ondataavailable=e=>audioChunks.push(e.data);
   mediaRecorder.onstop=e=>{
    const blob=new Blob(audioChunks,{type:'audio/mp3'});
    const url=URL.createObjectURL(blob);
    const a=document.getElementById("downloadAudio");
    a.href=url; a.download="voice_love.mp3"; a.style.display="inline";
   };
  });
}
function stopRecording(){mediaRecorder.stop();}

// Instagram Story Export
function exportInstagram(){
  alert("Recording your cinematic love story for Instagram... 🎥");
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  const stream = canvas.captureStream(30);
  const mediaRecorderStory = new MediaRecorder(stream);
  const chunks = [];
  mediaRecorderStory.ondataavailable = e => chunks.push(e.data);
  mediaRecorderStory.onstop = () => {
    const blob = new Blob(chunks,{type:'video/mp4'});
    const url = URL.createObjectURL(blob);
    const a = document.getElementById("downloadStory");
    a.href = url;
    a.download = "love_story.mp4";
    a.style.display = "inline";
    a.click();
  };
  mediaRecorderStory.start();

  // Auto play envelopes for 6 seconds each
  let i=0;
  const autoInterval = setInterval(()=>{
    if(i<data.length){
      openEnvelope(i);
      fireworks();
      startConfetti();
      generateLove();
      i++;
    } else {
      clearInterval(autoInterval);
      setTimeout(()=>mediaRecorderStory.stop(),2000);
    }
    html2canvas(document.body,{width:1080,height:1920}).then(c=>ctx.drawImage(c,0,0,1080,1920));
  },4000);
}
