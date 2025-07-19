// Global Variables
let currentPage = 0;
const pages = ['landing', 'story', 'memories', 'wish'];
let currentSlide = 0;
const totalSlides = 3;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeLanding();
    setupEventListeners();
    startStardust();
});

// Initialize Landing Page
function initializeLanding() {
    // Start the falling heart animation after a short delay
    setTimeout(() => {
        const fallingHeart = document.getElementById('fallingHeart');
        fallingHeart.style.display = 'block';
    }, 1000);
    
    // Add floating petals on hover
    const magicMessage = document.getElementById('magicMessage');
    magicMessage.addEventListener('mouseenter', createFloatingPetals);
}

// Setup Event Listeners
function setupEventListeners() {
    // Magic message click - start the journey
    document.getElementById('magicMessage').addEventListener('click', () => {
        createPetalTransition();
        setTimeout(() => {
            showPage('story');
            startStoryAnimation();
        }, 1000);
    });
    
    // Continue to memories
    document.getElementById('continueToMemories').addEventListener('click', () => {
        showPage('memories');
        initializeMemories();
    });
    
    // Continue to gift
    document.getElementById('continueToGift').addEventListener('click', () => {
        showPage('gift');
        initializeGift();
    });
    
    // Continue to wish
    document.getElementById('continueToWish').addEventListener('click', () => {
        showPage('wish');
        initializeWish();
    });
    
    // Gallery navigation
    const navDots = document.querySelectorAll('.nav-dot');
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => changeSlide(index));
    });
    
    // Mystery box click
    document.getElementById('mysteryBox').addEventListener('click', openGiftBox);
    
    // Blow candles
    document.getElementById('blowCandles').addEventListener('click', blowCandles);
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    setTimeout(() => {
        document.getElementById(pageId).classList.add('active');
    }, 500);
}

// Create Floating Petals Effect
function createFloatingPetals() {
    const petalsContainer = document.getElementById('floatingPetals');
    const petalEmojis = ['🌸', '🌺', '🌼', '💐', '🌹'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
            petal.style.left = Math.random() * 100 + '%';
            petal.style.animationDuration = (Math.random() * 3 + 2) + 's';
            petal.style.animationDelay = Math.random() * 2 + 's';
            
            petalsContainer.appendChild(petal);
            
            // Remove petal after animation
            setTimeout(() => {
                if (petal.parentNode) {
                    petal.parentNode.removeChild(petal);
                }
            }, 5000);
        }, i * 100);
    }
}

// Create Petal Transition
function createPetalTransition() {
    const body = document.body;
    const transitionOverlay = document.createElement('div');
    transitionOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(255,105,180,0.8), rgba(138,43,226,0.8));
        z-index: 100;
        pointer-events: none;
        opacity: 0;
        transition: opacity 1s ease;
    `;
    
    body.appendChild(transitionOverlay);
    
    // Fade in overlay
    setTimeout(() => {
        transitionOverlay.style.opacity = '1';
    }, 100);
    
    // Create spiral of petals
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.style.cssText = `
                position: absolute;
                font-size: 2rem;
                color: #ff69b4;
                pointer-events: none;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: spiralOut 2s ease-out forwards;
            `;
            petal.textContent = '🌸';
            
            const angle = (i / 30) * 360;
            petal.style.setProperty('--angle', angle + 'deg');
            
            transitionOverlay.appendChild(petal);
        }, i * 50);
    }
    
    // Add spiral animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spiralOut {
            0% {
                transform: translate(-50%, -50%) rotate(0deg) translateX(0);
                opacity: 1;
                scale: 0;
            }
            100% {
                transform: translate(-50%, -50%) rotate(var(--angle)) translateX(300px);
                opacity: 0;
                scale: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Remove overlay
    setTimeout(() => {
        transitionOverlay.style.opacity = '0';
        setTimeout(() => {
            if (transitionOverlay.parentNode) {
                transitionOverlay.parentNode.removeChild(transitionOverlay);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 1000);
    }, 1500);
}

// Start Story Animation
function startStoryAnimation() {
    const storyLines = document.querySelectorAll('.story-line');
    
    storyLines.forEach((line, index) => {
        const delay = parseInt(line.dataset.delay) || 0;
        setTimeout(() => {
            line.style.animationDelay = '0s';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, delay);
    });
    
    // Animate Sneha character
    setTimeout(() => {
        const character = document.getElementById('snehaCharacter');
        character.style.opacity = '1';
        character.style.transform = 'scale(1)';
    }, 6000);
}

// Initialize Memories Page
function initializeMemories() {
    const frames = document.querySelectorAll('.crystal-frame');
    
    // Animate frames entrance
    frames.forEach((frame, index) => {
        setTimeout(() => {
            frame.style.opacity = '1';
            frame.style.transform = 'translateY(0) scale(1)';
        }, index * 300);
    });
    
    // Start heart particles
    startHeartParticles();
}

// Change Gallery Slide
function changeSlide(slideIndex) {
    const frames = document.querySelectorAll('.crystal-frame');
    const dots = document.querySelectorAll('.nav-dot');
    
    // Update active states
    frames.forEach((frame, index) => {
        frame.classList.toggle('active', index === slideIndex);
    });
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
    
    currentSlide = slideIndex;
}

// Start Heart Particles Animation
function startHeartParticles() {
    const frames = document.querySelectorAll('.crystal-frame');
    
    frames.forEach(frame => {
        const particles = frame.querySelector('.heart-particles');
        if (particles) {
            // Create additional floating hearts
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.textContent = '💗';
                    heart.style.cssText = `
                        position: absolute;
                        font-size: 0.8rem;
                        color: #ff69b4;
                        pointer-events: none;
                        left: ${Math.random() * 80 + 10}%;
                        top: ${Math.random() * 80 + 10}%;
                        animation: particleFloat 3s infinite ease-in-out;
                        animation-delay: ${Math.random() * 2}s;
                    `;
                    
                    particles.appendChild(heart);
                }, i * 1000);
            }
        }
    });
}

// Initialize Gift Page
function initializeGift() {
    const mysteryBox = document.getElementById('mysteryBox');
    mysteryBox.style.opacity = '1';
    mysteryBox.style.transform = 'scale(1)';
    
    // Add hover effect
    mysteryBox.addEventListener('mouseenter', () => {
        mysteryBox.style.transform = 'scale(1.05) rotateY(5deg)';
    });
    
    mysteryBox.addEventListener('mouseleave', () => {
        mysteryBox.style.transform = 'scale(1) rotateY(0deg)';
    });
}

// Open Gift Box
function openGiftBox() {
    const mysteryBox = document.getElementById('mysteryBox');
    const giftLetter = document.getElementById('giftLetter');
    const continueBtn = document.getElementById('continueToWish');
    
    // Add opened class for animation
    mysteryBox.classList.add('opened');
    
    // Show sparkles
    setTimeout(() => {
        createSparkleEffect();
    }, 500);
    
    // Show letter
    setTimeout(() => {
        giftLetter.classList.add('show');
    }, 1000);
    
    // Show continue button
    setTimeout(() => {
        continueBtn.style.display = 'inline-block';
        continueBtn.style.opacity = '0';
        continueBtn.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            continueBtn.style.transition = 'all 0.5s ease';
            continueBtn.style.opacity = '1';
            continueBtn.style.transform = 'translateY(0)';
        }, 100);
    }, 2000);
}

// Create Sparkle Effect
function createSparkleEffect() {
    const mysteryBox = document.getElementById('mysteryBox');
    const sparkles = ['✨', '⭐', '🌟', '💫'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.cssText = `
                position: absolute;
                font-size: 1.5rem;
                pointer-events: none;
                left: ${Math.random() * 300}px;
                top: ${Math.random() * 200}px;
                animation: sparkleExplosion 2s ease-out forwards;
                z-index: 10;
            `;
            
            mysteryBox.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        }, i * 100);
    }
    
    // Add sparkle explosion animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleExplosion {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1.5) rotate(180deg);
                opacity: 1;
            }
            100% {
                transform: scale(0.5) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize Wish Page
function initializeWish() {
    const cake = document.getElementById('birthdayCake');
    cake.style.opacity = '1';
    cake.style.transform = 'scale(1)';
    
    // Animate candle flames
    const flames = document.querySelectorAll('.flame');
    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.style.opacity = '1';
        }, index * 200);
    });
}

// Blow Candles Function
function blowCandles() {
    const flames = document.querySelectorAll('.flame');
    const fireworksContainer = document.getElementById('fireworks');
    const finalMessage = document.getElementById('finalMessage');
    const blowBtn = document.getElementById('blowCandles');
    
    // Hide button
    blowBtn.style.opacity = '0';
    blowBtn.style.transform = 'scale(0.8)';
    
    // Extinguish candles one by one
    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.style.opacity = '0';
            flame.style.transform = 'scale(0)';
        }, index * 300);
    });
    
    // Start fireworks
    setTimeout(() => {
        createFireworks(fireworksContainer);
    }, 1500);
    
    // Show final message
    setTimeout(() => {
        finalMessage.classList.add('show');
        playFinalAnimation();
    }, 2000);
}

// Create Fireworks
function createFireworks(container) {
    const colors = ['#ff69b4', '#ffd700', '#ff6347', '#98fb98', '#87ceeb', '#dda0dd'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            firework.className = 'firework';
            firework.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                background: ${color};
                box-shadow: 0 0 20px ${color};
            `;
            
            container.appendChild(firework);
            
            // Create explosion particles
            setTimeout(() => {
                createExplosion(firework, color);
            }, 100);
            
            // Remove firework
            setTimeout(() => {
                if (firework.parentNode) {
                    firework.parentNode.removeChild(firework);
                }
            }, 1000);
        }, i * 100);
    }
}

// Create Explosion Effect
function createExplosion(firework, color) {
    const rect = firework.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        const angle = (i / 12) * 360;
        
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: ${color};
            border-radius: 50%;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            z-index: 25;
        `;
        
        document.body.appendChild(particle);
        
        // Animate particle
        const distance = 50 + Math.random() * 50;
        const radian = (angle * Math.PI) / 180;
        const endX = centerX + Math.cos(radian) * distance;
        const endY = centerY + Math.sin(radian) * distance;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        };
    }
}

// Play Final Animation
function playFinalAnimation() {
    // Create heart rain
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '💗';
            heart.style.cssText = `
                position: fixed;
                font-size: 2rem;
                left: ${Math.random() * 100}%;
                top: -50px;
                pointer-events: none;
                z-index: 30;
                animation: heartRain 4s linear forwards;
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 4000);
        }, i * 200);
    }
    
    // Add heart rain animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartRain {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0.7;
            }
        }
    `;
    document.head.appendChild(style);
}

// Start Stardust Animation
function startStardust() {
    const stardust = document.getElementById('stardust');
    const stars = ['✨', '⭐', '🌟'];
    
    setInterval(() => {
        const star = document.createElement('div');
        star.textContent = stars[Math.floor(Math.random() * stars.length)];
        star.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 1 + 0.5}rem;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            animation: twinkle 3s infinite ease-in-out;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        stardust.appendChild(star);
        
        // Remove star after animation
        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, 5000);
    }, 2000);
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        // Navigate to next page or slide
        if (document.getElementById('memories').classList.contains('active')) {
            const nextSlide = (currentSlide + 1) % totalSlides;
            changeSlide(nextSlide);
        }
    } else if (e.key === 'ArrowLeft') {
        // Navigate to previous slide
        if (document.getElementById('memories').classList.contains('active')) {
            const prevSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
            changeSlide(prevSlide);
        }
    }
});

// Add touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (document.getElementById('memories').classList.contains('active')) {
            if (diff > 0) {
                // Swipe left - next slide
                const nextSlide = (currentSlide + 1) % totalSlides;
                changeSlide(nextSlide);
            } else {
                // Swipe right - previous slide
                const prevSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
                changeSlide(prevSlide);
            }
        }
    }
}

// Preload next page content for smooth transitions
function preloadNextPage(pageId) {
    const page = document.getElementById(pageId);
    if (page) {
        page.style.display = 'block';
        page.style.opacity = '0';
        
        // Force a reflow to ensure styles are applied
        page.offsetHeight;
        
        setTimeout(() => {
            page.style.display = 'none';
            page.style.opacity = '';
        }, 100);
    }
}

// Auto-advance story lines for better timing
function autoAdvanceStory() {
    const storyLines = document.querySelectorAll('.story-line');
    let currentLine = 0;
    
    const showNextLine = () => {
        if (currentLine < storyLines.length) {
            const line = storyLines[currentLine];
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
            currentLine++;
            setTimeout(showNextLine, 2000);
        }
    };
    
    setTimeout(showNextLine, 1000);
}

// Performance optimization: Debounce resize events
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Recalculate positions if needed
        const activeFrames = document.querySelectorAll('.crystal-frame.active');
        activeFrames.forEach(frame => {
            frame.style.transform = 'rotateY(0deg) scale(1)';
        });
    }, 250);
});

// Add loading screen fade out
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});