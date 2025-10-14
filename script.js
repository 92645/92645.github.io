
// 文案可以改
const loveMsgs = [
  "遇见你是我这辈子最幸运的事！",
  "你的笑容是我每天的动力源泉。",
  "我想和你一起看遍世间所有风景。",
  "有你在身边，每一天都是情人节。",
  "你是我心中最温暖的那束光。"
];
const persuaMsgs = [
  "再考虑一下嘛，我真的真的很喜欢你！",
  "给我一个机会好不好？我会用行动证明我的真心！",
  "没有你，我的世界会失去色彩…",
  "我会一直等你，直到那一天你愿意。",
  "我知道我可能不够完美，但我愿为你变得更好！"
];

// 元素引用
const heartsBg = document.getElementById('heartsBg');
const shootingBg = document.getElementById('shootingTextsBg');
const mainContainer = document.getElementById('mainContainer');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const messageEl = document.getElementById('message');
const persuasionEl = document.getElementById('persuasionMessage');
const heartGradient = document.getElementById('heartGradient');
const nextPage = document.getElementById('nextPage');
const finalBtn = document.getElementById('finalBtn');
const exitBtn = document.getElementById('exitBtn');
const bgMusic = document.getElementById('bgMusic');
const musicControl = document.getElementById('musicControl');
const musicIcon = document.getElementById('musicIcon');
const loveLetter = document.getElementById('loveLetter');

// 背景心形生成
function spawnHearts(num = 20) {
  for (let i = 0; i < num; i++) {
    const h = document.createElement('div');
    h.className = 'heart';
    const lx = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = 10 + Math.random() * 8;
    h.style.left = lx + '%';
    h.style.animationDelay = delay + 's';
    h.style.animationDuration = duration + 's';
    heartsBg.appendChild(h);
  }
}

// 文字流星生成
function spawnShootingTexts(num = 12) {
  const phrases = [
    "我爱你", "愿与你共度余生", "你是我唯一", "与你相遇是奇迹", "爱你此生不变"
  ];
  for (let i = 0; i < num; i++) {
    const st = document.createElement('div');
    st.className = 'shoot';
    st.textContent = phrases[Math.floor(Math.random() * phrases.length)];
    const ty = 10 + Math.random() * 80;
    const delay = Math.random() * 5;
    st.style.top = ty + 'vh';
    st.style.animationDelay = delay + 's';
    shootingBg.appendChild(st);
  }
}

// 音乐控制
let musicPlaying = false;
musicControl.addEventListener('click', () => {
  if (musicPlaying) {
    bgMusic.pause();
    musicIcon.textContent = '♪';
    musicControl.setAttribute('aria-pressed', 'false');
  } else {
    bgMusic.play().catch(() => {});
    musicIcon.textContent = '❚❚';
    musicControl.setAttribute('aria-pressed', 'true');
  }
  musicPlaying = !musicPlaying;
});

// “不愿意”按钮被点：让“愿意”按钮变大
let noCount = 0;
yesBtn.style.transition = 'transform 0.3s ease';

noBtn.addEventListener('click', () => {
  noCount++;
  // scale up yesBtn a bit
  const scaleVal = 1 + Math.min(noCount * 0.08, 1.5);
  yesBtn.style.transform = `scale(${scaleVal})`;

  // 显示 persuasion 消息
  const idx = Math.min(noCount - 1, persuaMsgs.length - 1);
  persuasionEl.textContent = persuaMsgs[idx];
  persuasionEl.classList.add('show');

  messageEl.textContent = "我知道你还需要时间考虑…";
  messageEl.classList.add('show');
});

// “愿意”按钮行为
yesBtn.addEventListener('click', () => {
  // 放大动画
  yesBtn.style.transform = 'scale(1.4)';
  const msg = loveMsgs[Math.floor(Math.random() * loveMsgs.length)];
  messageEl.textContent = msg;
  messageEl.classList.add('show');
  persuasionEl.classList.remove('show');

  setTimeout(() => {
    mainContainer.style.pointerEvents = 'none';
    mainContainer.style.opacity = '0';
    // 显示渐变爱心与文字流星背景
    heartGradient.style.display = 'flex';
    spawnShootingTexts(15);

    if (!musicPlaying) {
      bgMusic.play().catch(() => {});
      musicIcon.textContent = '❚❚';
      musicPlaying = true;
    }

    setTimeout(() => {
      nextPage.style.display = 'block';
    }, 9000);
  }, 800);
});

// 下一页 final / exit
finalBtn.addEventListener('click', () => {
  // 爆发更多心形
  spawnHearts(30);
  // 更新情书内容
  const arr = [
    "我们的故事才刚刚开始…",
    "每天都会比昨天更爱你。",
    "你是我生命中最美的意外。"
  ];
  loveLetter.innerHTML = `<p>${arr[Math.floor(Math.random() * arr.length)]}</p>`;
});

exitBtn.addEventListener('click', () => {
  bgMusic.pause();
  musicPlaying = false;
  musicIcon.textContent = '♪';
  nextPage.style.display = 'none';
  mainContainer.style.opacity = '1';
  mainContainer.style.pointerEvents = 'auto';
});

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  spawnHearts(25);
  bgMusic.load();
});