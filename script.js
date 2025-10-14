// 创建漂浮的心形
function createHearts() {
    const heartsContainer = document.getElementById('hearts');
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        
        // 随机位置和动画延迟
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 4 + Math.random() * 4;
        
        heart.style.left = `${left}%`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.animationDuration = `${duration}s`;
        
        heartsContainer.appendChild(heart);
    }
}

// 全屏渐变爱心效果
function createHeartGradient() {
    const gradientContainer = document.getElementById('heartGradient');
    gradientContainer.style.display = 'block';
    
    // 4秒后清除渐变效果
    setTimeout(() => {
        gradientContainer.style.display = 'none';
    }, 4000);
}

// 创建文字流星
function createShootingTexts() {
    const loveMessages = [
        "我爱你",
        "你是我的一切",
        "我的世界因你而完整",
        "与你相遇是此生最美的幸运",
        "愿执子之手，与子偕老",
        "你是我生命中的阳光",
        "每一天都更爱你",
        "我的心里只有你",
        "愿与你共度余生",
        "你是我最美的梦"
    ];
    
    // 创建10个流星
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const text = document.createElement('div');
            text.className = 'shooting-text';
            text.textContent = loveMessages[Math.floor(Math.random() * loveMessages.length)];
            
            // 随机位置和动画延迟
            const startY = Math.random() * 100 + 'vh';
            const endY = (Math.random() * 100 - 50) + 'vh';
            const delay = Math.random() * 2;
            
            text.style.setProperty('--startY', startY);
            text.style.setProperty('--endY', endY);
            text.style.animationDelay = `${delay}s`;
            
            document.body.appendChild(text);
            
            // 动画结束后移除元素
            setTimeout(() => {
                text.remove();
            }, 4000);
        }, i * 500); // 每隔500ms创建一个流星
    }
}

// 按钮点击处理
function setupButtons() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const message = document.getElementById('message');
    const persuasionMessage = document.getElementById('persuasionMessage');
    const mainContainer = document.getElementById('mainContainer');
    const nextPage = document.getElementById('nextPage');
    const finalBtn = document.getElementById('finalBtn');
    const musicControl = document.getElementById('musicControl');
    const bgMusic = document.getElementById('bgMusic');
    
    const loveMessages = [
        "遇见你是我这辈子最幸运的事！",
        "你的笑容是我每天的动力源泉",
        "我想和你一起看遍世间所有风景",
        "有你在身边，每一天都是情人节",
        "你是我心中最温暖的那束光",
        "我想和你一起慢慢变老",
        "你的名字是我听过最美的情诗",
        "世界那么大，但我只想和你在一起",
        "你是我所有温柔的来源和归属",
        "我想把所有的美好都与你分享"
    ];
    
    const persuasionMessages = [
        "再考虑一下嘛~我真的真的很喜欢你！",
        "给我一个机会好不好？我会用行动证明我的真心！",
        "没有你，我的世界会失去色彩...",
        "我会一直等你的！直到你愿意的那一天！",
        "我的心都碎了💔 真的不愿意给我一个机会吗？",
        "别这样对我嘛...我真的很想和你在一起！",
        "我会努力成为更好的人，只要你愿意给我机会！",
        "你是我的唯一选择，没有你我不知道该怎么办...",
        "请给我一次爱你的机会，我会让你成为最幸福的人！",
        "我知道我可能不够完美，但我会为了你变得更好！"
    ];
    
    let noClickCount = 0;
    let yesBtnSize = 1;
    
    // 音乐控制
    let musicPlaying = false;
    musicControl.addEventListener('click', function() {
        if (musicPlaying) {
            bgMusic.pause();
            musicControl.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            bgMusic.play().catch(e => {
                console.log("自动播放被阻止，需要用户交互");
            });
            musicControl.innerHTML = '<i class="fas fa-pause"></i>';
        }
        musicPlaying = !musicPlaying;
    });
    
    yesBtn.addEventListener('click', function() {
        // 按钮变大效果
        yesBtnSize += 0.2;
        yesBtn.style.transform = `scale(${yesBtnSize})`;
        
        // 显示随机情话
        const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
        message.textContent = randomMessage;
        message.classList.add('show');
        
        // 隐藏劝说消息
        persuasionMessage.classList.remove('show');
        
        // 延迟后显示全屏特效
        setTimeout(function() {
            // 隐藏主容器
            mainContainer.style.display = 'none';
            
            // 创建全屏渐变爱心
            createHeartGradient();
            
            // 创建文字流星
            createShootingTexts();
            
            // 播放音乐
            if (!musicPlaying) {
                bgMusic.play().catch(e => {
                    console.log("自动播放被阻止，需要用户交互");
                });
                musicControl.innerHTML = '<i class="fas fa-pause"></i>';
                musicPlaying = true;
            }
            
            // 延迟后显示下一页
            setTimeout(function() {
                nextPage.style.display = 'flex';
            }, 4000);
        }, 1500);
    });
    
    noBtn.addEventListener('click', function() {
        noClickCount++;
        
        // "愿意"按钮变大
        yesBtnSize += 0.2;
        yesBtn.style.transform = `scale(${yesBtnSize})`;
        
        // 显示劝说消息
        if (noClickCount <= persuasionMessages.length) {
            persuasionMessage.textContent = persuasionMessages[noClickCount - 1];
        } else {
            // 如果消息用完，随机显示一条
            persuasionMessage.textContent = persuasionMessages[Math.floor(Math.random() * persuasionMessages.length)];
        }
        
        persuasionMessage.classList.add('show');
        
        // 显示消息
        message.textContent = "我知道你可能还需要时间考虑...";
        message.classList.add('show');
        
        // 如果点击次数过多，显示特殊消息
        if (noClickCount >= 5) {
            message.textContent = "我会一直等你的，直到你愿意的那一天！";
        }
        
        if (noClickCount >= 10) {
            message.textContent = "无论你的答案是什么，我都会永远珍惜你！";
        }
    });
    
    // 最终按钮
    finalBtn.addEventListener('click', function() {
        // 创建更多心形
        createExplosionHearts();
        
        // 更新成功消息
        const successMessages = [
            "我们的故事才刚刚开始...",
            "每一天都会比昨天更爱你",
            "你是我生命中最美的意外",
            "让我们一起创造属于我们的回忆",
            "我会永远珍惜你，爱护你"
        ];
        const randomSuccessMessage = successMessages[Math.floor(Math.random() * successMessages.length)];
        
        // 更新情书内容
        const loveLetter = document.querySelector('.love-letter');
        loveLetter.innerHTML = `<p>${randomSuccessMessage}</p>`;
    });
}

// 创建爆炸效果的心形
function createExplosionHearts() {
    const heartsContainer = document.getElementById('hearts');
    const extraHearts = 50;
    
    for (let i = 0; i < extraHearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 2 + Math.random() * 3;
        
        heart.style.left = `${left}%`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.animationDuration = `${duration}s`;
        
        heartsContainer.appendChild(heart);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    createHearts();
    setupButtons();
});