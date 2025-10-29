// ================================
// MODERN ANALYTICS PORTFOLIO
// Ultra Fluid Interactions
// ================================

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Cursor principal - resposta rápida
    cursorX += (mouseX - cursorX) * 0.5;
    cursorY += (mouseY - cursorY) * 0.5;

    // Follower - resposta suave
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Expand cursor on hover
document.querySelectorAll('a, button, .expertise-card, .case-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(2)`;
        cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px) scale(1.5)`;
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1)`;
        cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px) scale(1)`;
    });
});

// ===== NAVIGATION =====
const nav = document.getElementById('nav');
const menuBtn = document.getElementById('menuBtn');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');
const menuLinks = document.querySelectorAll('.menu-link');

// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Menu toggle
menuBtn.addEventListener('click', () => {
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

menuClose.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Close menu on link click
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');

        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';

        setTimeout(() => {
            document.querySelector(target).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 500);
    });
});

// ===== HERO CANVAS ANIMATION =====
const heroCanvas = document.getElementById('heroCanvas');
if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');

    function resizeCanvas() {
        heroCanvas.width = window.innerWidth;
        heroCanvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * heroCanvas.width;
            this.y = Math.random() * heroCanvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > heroCanvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > heroCanvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(99, 102, 241, 0.6)';
            ctx.fill();
        }
    }

    const particles = Array.from({ length: 60 }, () => new Particle());

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        drawConnections();

        requestAnimationFrame(animate);
    }

    animate();
}

// ===== MAGNETIC BUTTON EFFECT =====
document.querySelectorAll('.btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// ===== TILT EFFECT ON CARDS =====
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== REVEAL ANIMATION FOR CASES =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, index * 200);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('[data-reveal]').forEach(el => {
    revealObserver.observe(el);
});

// ===== CHARTS FOR CASES =====
const chartConfig = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
    },
    scales: {
        x: { display: false },
        y: { display: false }
    }
};

// Case 1 - Line Chart
const case1Chart = document.getElementById('case1Chart');
if (case1Chart) {
    new Chart(case1Chart, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                data: [30, 45, 60, 75, 95, 120],
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: chartConfig
    });
}

// Case 2 - Bar Chart
const case2Chart = document.getElementById('case2Chart');
if (case2Chart) {
    new Chart(case2Chart, {
        type: 'bar',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
                data: [65, 75, 82, 91],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(99, 102, 241, 0.9)'
                ],
                borderRadius: 8,
                borderWidth: 0
            }]
        },
        options: chartConfig
    });
}

// Case 3 - Doughnut Chart
const case3Chart = document.getElementById('case3Chart');
if (case3Chart) {
    new Chart(case3Chart, {
        type: 'doughnut',
        data: {
            labels: ['Qualificados', 'Médio', 'Baixo'],
            datasets: [{
                data: [70, 20, 10],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(236, 72, 153, 0.8)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            ...chartConfig,
            cutout: '70%'
        }
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== FORM HANDLING =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Button loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="btn-text">Enviando...</span>';
        submitBtn.disabled = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success feedback
        submitBtn.innerHTML = '<span class="btn-text">✓ Mensagem enviada!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            contactForm.reset();
        }, 3000);

        console.log('Form data:', data);
    });
}

// ===== PARALLAX EFFECT =====
let ticking = false;
let lastScrollY = 0;

function updateParallax() {
    const scrolled = window.pageYOffset;

    // Hero parallax
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroContent.style.opacity = 1 - scrolled / 600;
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    lastScrollY = window.pageYOffset;

    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ===== ANIMATE ELEMENTS ON SCROLL =====
const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';

            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.8s cubic-bezier(0.65, 0, 0.35, 1), transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);

            animateObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.expertise-card, .section-header-fluid').forEach(el => {
    animateObserver.observe(el);
});

// ===== MARQUEE PAUSE ON HOVER =====
document.querySelectorAll('.stack-marquee').forEach(marquee => {
    marquee.addEventListener('mouseenter', () => {
        marquee.querySelectorAll('.marquee-content').forEach(content => {
            content.style.animationPlayState = 'paused';
        });
    });

    marquee.addEventListener('mouseleave', () => {
        marquee.querySelectorAll('.marquee-content').forEach(content => {
            content.style.animationPlayState = 'running';
        });
    });
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== EASTER EGG - KONAMI CODE =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s ease infinite';

        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);

        console.log('%c🎉 EASTER EGG ATIVADO!', 'color: #6366f1; font-size: 24px; font-weight: bold;');
    }
});

// ===== CONSOLE ART =====
console.log('%c██╗  ██╗███████╗███╗   ██╗██████╗ ██╗ ██████╗ ██╗   ██╗███████╗', 'color: #6366f1; font-weight: bold;');
console.log('%c██║  ██║██╔════╝████╗  ██║██╔══██╗██║██╔═══██╗██║   ██║██╔════╝', 'color: #8b5cf6; font-weight: bold;');
console.log('%c███████║█████╗  ██╔██╗ ██║██████╔╝██║██║   ██║██║   ██║█████╗  ', 'color: #8b5cf6; font-weight: bold;');
console.log('%c██╔══██║██╔══╝  ██║╚██╗██║██╔══██╗██║██║▄▄ ██║██║   ██║██╔══╝  ', 'color: #ec4899; font-weight: bold;');
console.log('%c██║  ██║███████╗██║ ╚████║██║  ██║██║╚██████╔╝╚██████╔╝███████╗', 'color: #ec4899; font-weight: bold;');
console.log('%c╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝ ╚══▀▀═╝  ╚═════╝ ╚══════╝', 'color: #ec4899; font-weight: bold;');
console.log('%c\nAnalytics Expert | Portfolio 2024', 'color: #6b7280; font-size: 14px;');
console.log('%cTry the Konami Code: ↑↑↓↓←→←→BA', 'color: #6b7280; font-size: 12px; font-style: italic;');

// ===== MOBILE OPTIMIZATIONS =====
if ('ontouchstart' in window) {
    // Disable cursor on touch devices
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';

    // Add touch feedback
    document.querySelectorAll('a, button, .expertise-card').forEach(el => {
        el.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });

        el.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// ===== PRELOAD IMAGES =====
const imagesToPreload = [
    // Add any images you want to preload here
];

imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
});

// ===== VISIBILITY CHANGE - PAUSE ANIMATIONS =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.querySelectorAll('.marquee-content').forEach(content => {
            content.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations
        document.querySelectorAll('.marquee-content').forEach(content => {
            content.style.animationPlayState = 'running';
        });
    }
});

// ===== REDUCED MOTION SUPPORT =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.querySelectorAll('.marquee-content').forEach(content => {
        content.style.animation = 'none';
    });
}
