// Elements
const proposal = document.getElementById('proposal');
const main = document.getElementById('main');
const yesBtn = document.getElementById('yes');
const noBtn = document.getElementById('no');
const navBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');
const hearts1 = document.getElementById('hearts1');
const hearts2 = document.getElementById('hearts2');

// No button messages
const noMessages = [
    "Hear me out?",
    "Bro!",
    "Last chance!",
    "You might regret this!",
    "Give it another thought!",
    "This is your final chance!",
    "You're breaking my heart!",
    "OK fine... Just kidding! SAY YES!"
];

let noClicks = 0;

// Create hearts
function createHearts(container, count, size) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = `${size}px`;
        heart.style.color = '#6d0f2b';
        heart.style.opacity = '0.7';
        heart.style.left = `${Math.random() * 60}px`;
        heart.style.top = `${Math.random() * 60}px`;
        heart.style.animation = `float 3s ease-in-out ${i * 0.5}s infinite`;
        
        // Add float animation
        const style = document.createElement('style');
        if (!document.querySelector('#float-animation')) {
            style.id = 'float-animation';
            style.textContent = `
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        container.appendChild(heart);
    }
}

// Celebrate when Yes is clicked
function celebrate() {
    // Hide proposal
    proposal.classList.add('hidden');
    
    // Show celebration
    const celebration = document.createElement('div');
    celebration.innerHTML = 'Lets goooo!';
    celebration.style.position = 'fixed';
    celebration.style.top = '50%';
    celebration.style.left = '50%';
    celebration.style.transform = 'translate(-50%, -50%)';
    celebration.style.fontFamily = "'Dancing Script', cursive";
    celebration.style.fontSize = '4rem';
    celebration.style.color = '#6d0f2b';
    celebration.style.backgroundColor = 'white';
    celebration.style.padding = '30px 50px';
    celebration.style.borderRadius = '20px';
    celebration.style.zIndex = '1000';
    celebration.style.boxShadow = '0 0 50px rgba(255,107,139,0.5)';
    document.body.appendChild(celebration);
    
    // Add floating hearts
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.fontSize = `${Math.random() * 30 + 20}px`;
        heart.style.color ='#6d0f2b';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.zIndex = '999';
        heart.style.pointerEvents = 'none';
        document.body.appendChild(heart);
        
        // Animate
        setTimeout(() => {
            heart.style.transition = 'all 2s';
            heart.style.top = '-50px';
            heart.style.opacity = '0';
            
            // Remove after animation
            setTimeout(() => heart.remove(), 2000);
        }, i * 100);
    }
    
    // Show main content after delay
    setTimeout(() => {
        celebration.remove();
        main.classList.remove('hidden');
        createHearts(hearts1, 3, 20);
    }, 2000);
}

// Handle No button
function handleNo() {
    // Move button
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 100 - 50;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
    
    // Change text
    if (noClicks < noMessages.length) {
        noBtn.textContent = noMessages[noClicks];
        noClicks++;
    }
    
    // Make Yes button bigger
    yesBtn.style.transform = `scale(${1 + noClicks * 0.1})`;
    
    // Add broken heart
    const broken = document.createElement('div');
    broken.innerHTML = '💔';
    broken.style.position = 'absolute';
    broken.style.fontSize = '2rem';
    broken.style.left = `${event.clientX}px`;
    broken.style.top = `${event.clientY}px`;
    broken.style.zIndex = '100';
    document.body.appendChild(broken);
    
    // Animate broken heart
    setTimeout(() => {
        broken.style.transition = 'all 1s';
        broken.style.top = `${event.clientY + 100}px`;
        broken.style.opacity = '0';
        
        setTimeout(() => broken.remove(), 1000);
    }, 10);
}

// Navigation
function setupNavigation() {
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show selected page
            const pageId = btn.getAttribute('data-page');
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === pageId) {
                    page.classList.add('active');
                    
                    // Create hearts for the active page
                    if (pageId === 'reasons') {
                        createHearts(hearts1, 3, 20);
                    } else if (pageId === 'valentine') {
                        createHearts(hearts2, 10, 15);
                    }
                }
            });
        });
    });
}

// Make heart pulse clickable
function setupHeartPulse() {
    const pulseHeart = document.querySelector('.pulse');
    if (pulseHeart) {
        pulseHeart.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse 1.5s infinite';
            }, 10);
            
            // Create mini hearts
            for (let i = 0; i < 8; i++) {
                const mini = document.createElement('div');
                mini.innerHTML = '❤️';
                mini.style.position = 'fixed';
                mini.style.fontSize = '20px';
                mini.style.color = '#6d0f2b';
                mini.style.left = `${event.clientX}px`;
                mini.style.top = `${event.clientY}px`;
                mini.style.zIndex = '1000';
                mini.style.pointerEvents = 'none';
                document.body.appendChild(mini);
                
                // Animate
                const angle = Math.random() * Math.PI * 2;
                const speed = 3;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed;
                
                let x = event.clientX;
                let y = event.clientY;
                let opacity = 1;
                
                function move() {
                    x += vx;
                    y += vy;
                    opacity -= 0.02;
                    
                    mini.style.left = `${x}px`;
                    mini.style.top = `${y}px`;
                    mini.style.opacity = opacity;
                    
                    if (opacity > 0) {
                        requestAnimationFrame(move);
                    } else {
                        mini.remove();
                    }
                }
                
                move();
            }
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Event listeners
    yesBtn.addEventListener('click', celebrate);
    noBtn.addEventListener('click', handleNo);
    
    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'y') yesBtn.click();
        if (e.key.toLowerCase() === 'n') noBtn.click();
    });
    
    // Setup navigation
    setupNavigation();
    
    // Setup heart pulse after main loads
    setTimeout(setupHeartPulse, 2500);
});