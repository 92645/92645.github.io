// 文案（你可以改这些）
const loveMessages = [
  "遇见你是我这辈子最幸运的事！",
  "你的笑容是我每天的动力源泉。",
  "我想和你一起看遍世间所有风景。",
  "有你在身边，每一天都是情人节。",
  "你是我心中最温暖的那束光。"
];
const persuasionMessages = [
  "再考虑一下嘛~我真的真的很喜欢你！",
  "给我一个机会好不好？我会用行动证明我的真心！",
  "没有你，我的世界会失去色彩…",
  "我会一直等你的！直到你愿意的那一天！",
  "我知道我可能不够完美，但我会为了你变得更好！"
];

// 元素
const heartsContainer = document.getElementById('hearts');
const mainContainer = document.getElementById('mainContainer');
const nextPage = document.getElementById('nextPage');
const messageEl = document.getElementById('message');
const persuasionEl = document.getElementById('persuasionMessage');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const finalBtn = document.getElementById('finalBtn');
const exitBtn = document.getElementById('exitBtn');
const musicControl = document.getElementById('musicControl');
const musicIcon = document.getElementById('musicIcon');
const bgMusic = document.getElementById('bgMusic');
const loveLetter = document.getElementById('loveLetter');

// 所有心形漂浮
function createHearts(count = 16) {
  heartsContainer.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const h = document.createElement('div');
    h.className = 'heart';
    const left = (Math.random() * 100).toFixed(2);
    const delay = (Math.random() * 8).toFixed(2);
    const duration = (12 + Math.random() * 12).toFixed(2);
    h.style.left = left + '%';
    h.style.animationDelay = delay + 's';
    h.style.animationDuration = duration + 's';
    h.style.opacity = (0.4 + Math.random() * 0.6).toString();
    heartsContainer.appendChild(h);
  }
}

// 心形全屏渐变
function showHeartGradient() {
  const heartGradient = document.getElementById('heartGradient');
  heartGradient.style.display = 'flex';
  setTimeout(() => {
    heartGradient.style.display = 'none';
  }, 10000); // 与 CSS 动画 10s 匹配
}

// 流星文字效果
function createShootingTexts() {
  const phrases = [
    "我爱你",
    "愿与你共度余生",
    "你是我所有温柔的来源",
    "每一天都更爱你",
    "遇见你，是最美的意外"
  ];
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const t = document.createElement('div');
      t.textContent = phrases[Math.floor(Math.random() * phrases.length)];
      t.className = 'shooting-text';
      t.style.position = 'fixed';
      t.style.left = '-30%';
      t.style.top = (10 + Math.random() * 70) + 'vh';
      t.style.fontSize = (14 + Math.random() * 8) + 'px';
      t.style.color = 'rgba(255,107,139,0.92)';
      t.style.background = 'linear-gradient(90deg, rgba(255,255,255,0.85), rgba(255,240,245,0.7))';
      t.style.padding = '6px 10px';
      t.style.borderRadius = '8px';
      t.style.boxShadow = '0 6px 22px rgba(30,20,50,0.06)';
      t.style.transition = 'transform 4s linear, opacity 4s';
      document.body.appendChild(t);
      requestAnimationFrame(() => {
        t.style.transform = 'translateX(140vw)';
        t.style.opacity = '0';
      });
      setTimeout(() => t.remove(), 4200);
    }, i * 420);
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

// 交互逻辑
let noClickCount = 0;
let yesScale = 1;

yesBtn.addEventListener('click', () => {
  yesScale += 0.06;
  yesBtn.style.transform = `scale(${yesScale})`;
  const msg = loveMessages[Math.floor(Math.random() * loveMessages.length)];
  messageEl.textContent = msg;
  messageEl.classList.add('show');
  persuasionEl.classList.remove('show');

  setTimeout(() => {
    mainContainer.style.opacity = '0';
    mainContainer.style.pointerEvents = 'none';
    showHeartGradient();
    createShootingTexts();
    if (!musicPlaying) {
      bgMusic.play().catch(() => {});
      musicIcon.textContent = '❚❚';
      musicPlaying = true;
    }
    setTimeout(() => {
      nextPage.style.display = 'flex';
      nextPage.setAttribute('aria-hidden', 'false');
    }, 8000);
  }, 1000);
});

noBtn.addEventListener('click', () => {
  noClickCount++;
  yesScale += 0.03;
  yesBtn.style.transform = `scale(${yesScale})`;

  const idx = Math.min(noClickCount - 1, persuasionMessages.length - 1);
  persuasionEl.textContent = persuasionMessages[idx] || persuasionMessages[Math.floor(Math.random() * persuasionMessages.length)];
  persuasionEl.classList.add('show');
  messageEl.textContent = "我知道你可能还需要时间考虑...";
  messageEl.classList.add('show');

  if (noClickCount >= 5) messageEl.textContent = "我会一直等你的，直到你愿意的那一天！";
  if (noClickCount >= 12) messageEl.textContent = "无论怎样，我都会珍惜与你的相遇。";
});

finalBtn.addEventListener('click', () => {
  for (let i = 0; i < 30; i++) {
    const h = document.createElement('div');
    h.className = 'heart';
    const left = (20 + Math.random() * 60).toFixed(2);
    const delay = (Math.random() * 2).toFixed(2);
    const duration = (6 + Math.random() * 6).toFixed(2);
    h.style.left = left + '%';
    h.style.animationDelay = delay + 's';
    h.style.animationDuration = duration + 's';
    heartsContainer.appendChild(h);
  }
  const success = [
    "我们的故事才刚刚开始...",
    "每一天都会比昨天更爱你。",
    "你是我生命中最美的意外。"
  ];
  loveLetter.innerHTML = `<p>${success[Math.floor(Math.random() * success.length)]}</p>`;
});

exitBtn.addEventListener('click', () => {
  bgMusic.pause();
  musicPlaying = false;
  musicIcon.textContent = '♪';
  nextPage.style.display = 'none';
  nextPage.setAttribute('aria-hidden', 'true');
  mainContainer.style.opacity = '';
  mainContainer.style.pointerEvents = '';
  try {
    window.close();
  } catch (e) {}
});

document.addEventListener('DOMContentLoaded', () => {
  createHearts(16);
  bgMusic.load();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (nextPage.style.display === 'flex') {
      exitBtn.click();
    }
  }
});