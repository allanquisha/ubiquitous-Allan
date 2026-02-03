document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const response = document.getElementById('response');
    
    let noClickCount = 0;
    const noMessages = [
        "Are you sure? 🥺",
        "Really? Give it another thought! 💭",
        "The Yes button looks better... 👀",
        "Come on, don't be shy! 😊",
        "I promise it'll be fun! 🎈",
        "Please? 🙏",
        "You're breaking my heart... 💔",
        "One more chance? 🌟"
    ];
    
    yesBtn.addEventListener('click', function() {
        // Hide buttons
        document.querySelector('.buttons').style.display = 'none';
        document.querySelector('.message-box').style.display = 'none';
        
        // Show response
        response.classList.remove('hidden');
        
        // Change background gradient
        document.body.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
        
        // Create confetti effect
        createConfetti();
    });
    
    noBtn.addEventListener('click', function() {
        if (noClickCount < noMessages.length) {
            noBtn.textContent = noMessages[noClickCount];
            noClickCount++;
            
            // Make Yes button bigger and more appealing
            const currentScale = 1 + (noClickCount * 0.15);
            yesBtn.style.transform = `scale(${currentScale})`;
            
            // Make No button smaller
            const noScale = 1 - (noClickCount * 0.1);
            noBtn.style.transform = `scale(${Math.max(noScale, 0.5)})`;
            
            // Wiggle the No button
            noBtn.style.animation = 'shake 0.5s';
            setTimeout(() => {
                noBtn.style.animation = '';
            }, 500);
        } else {
            // After many clicks, make No button run away
            const x = Math.random() * 200 - 100;
            const y = Math.random() * 200 - 100;
            noBtn.style.position = 'relative';
            noBtn.style.left = `${x}px`;
            noBtn.style.top = `${y}px`;
        }
    });
    
    function createConfetti() {
        const colors = ['#ff6b9d', '#ffc3a0', '#ff1493', '#ffeaa7', '#ff6348'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                confetti.style.borderRadius = '50%';
                confetti.style.zIndex = '1000';
                confetti.style.pointerEvents = 'none';
                
                document.body.appendChild(confetti);
                
                const duration = 3000 + Math.random() * 2000;
                const endX = Math.random() * 200 - 100;
                
                confetti.animate([
                    { transform: 'translateY(0px) translateX(0px) rotate(0deg)', opacity: 1 },
                    { transform: `translateY(${window.innerHeight + 10}px) translateX(${endX}px) rotate(${360 * 3}deg)`, opacity: 0 }
                ], {
                    duration: duration,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                });
                
                setTimeout(() => {
                    confetti.remove();
                }, duration);
            }, i * 30);
        }
    }
});

// Add shake animation in CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
