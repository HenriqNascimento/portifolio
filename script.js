// ============================================
// HENRIQUE.DATA() - Revolutionary Portfolio
// Analytics Architect & Data Storyteller
// ============================================

// ============================================
// ORBITAL NAVIGATION
// ============================================
class OrbitalNav {
    constructor() {
        this.orb = document.getElementById('navOrb');
        this.menu = document.getElementById('orbMenu');
        this.isOpen = false;

        this.init();
    }

    init() {
        // Toggle menu on click
        this.orb.addEventListener('click', (e) => {
            if (e.target.closest('.orb-center')) {
                this.toggle();
            }
        });

        // Close menu when clicking a link
        this.menu.querySelectorAll('.orb-link').forEach(link => {
            link.addEventListener('click', () => {
                this.close();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !e.target.closest('.nav-orb')) {
                this.close();
            }
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.orb.classList.toggle('active');
    }

    close() {
        this.isOpen = false;
        this.orb.classList.remove('active');
    }
}

// ============================================
// TERMINAL TYPEWRITER EFFECT
// ============================================
class TerminalTypewriter {
    constructor() {
        this.commands = [
            { element: 'command1', text: 'whoami', delay: 100 },
            { element: 'command2', text: 'cat services.txt', delay: 2000 },
            { element: 'command3', text: 'ls -la impact/', delay: 4000 }
        ];

        this.outputs = [
            { element: 'output1', delay: 800 },
            { element: 'output2', delay: 2800 },
            { element: 'output3', delay: 4800 }
        ];

        this.init();
    }

    init() {
        // Type commands
        this.commands.forEach(cmd => {
            setTimeout(() => {
                this.typeText(cmd.element, cmd.text);
            }, cmd.delay);
        });

        // Show outputs
        this.outputs.forEach(output => {
            setTimeout(() => {
                const el = document.getElementById(output.element);
                if (el) {
                    el.style.opacity = '0';
                    el.style.display = 'block';
                    setTimeout(() => {
                        el.style.transition = 'opacity 0.3s ease';
                        el.style.opacity = '1';
                    }, 50);
                }
            }, output.delay);
        });

        // Start counters after impact section is visible
        setTimeout(() => {
            this.initCounters();
        }, 5000);
    }

    typeText(elementId, text) {
        const element = document.getElementById(elementId);
        if (!element) return;

        element.textContent = '';
        let i = 0;

        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50 + Math.random() * 50);
            }
        };

        type();
    }

    initCounters() {
        const counters = document.querySelectorAll('.impact-number');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };

            updateCounter();
        });
    }
}

// ============================================
// HORIZONTAL SCROLL TRACKER
// ============================================
class HorizontalScroll {
    constructor() {
        this.container = document.querySelector('.work-scroll');
        if (!this.container) return;

        this.init();
    }

    init() {
        this.container.addEventListener('scroll', () => {
            const scrollLeft = this.container.scrollLeft;
            const scrollWidth = this.container.scrollWidth - this.container.clientWidth;
            const progress = (scrollLeft / scrollWidth) * 100;

            // Update progress indicator if exists
            const progressBar = document.querySelector('.scroll-progress');
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }

            // Add parallax effect to cards
            const cards = this.container.querySelectorAll('.work-card');
            cards.forEach((card, index) => {
                const cardLeft = card.offsetLeft;
                const cardCenter = cardLeft + (card.offsetWidth / 2);
                const containerCenter = scrollLeft + (this.container.clientWidth / 2);
                const distance = Math.abs(containerCenter - cardCenter);
                const maxDistance = this.container.clientWidth;
                const scale = 1 - (distance / maxDistance) * 0.1;

                card.style.transform = `scale(${Math.max(scale, 0.9)})`;
            });
        });
    }
}

// ============================================
// CHART.JS VISUALIZATIONS
// ============================================
class DataVisualizations {
    constructor() {
        this.charts = [];
        this.init();
    }

    init() {
        // Wait for Chart.js to load
        if (typeof Chart === 'undefined') {
            setTimeout(() => this.init(), 100);
            return;
        }

        // Set Chart.js defaults
        Chart.defaults.color = '#00ff88';
        Chart.defaults.borderColor = 'rgba(0, 255, 136, 0.1)';
        Chart.defaults.font.family = "'JetBrains Mono', monospace";

        // Initialize charts when they come into view
        this.initIntersectionObserver();
    }

    initIntersectionObserver() {
        const chartElements = document.querySelectorAll('canvas[id^="chart"]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('chart-initialized')) {
                    this.createChart(entry.target);
                    entry.target.classList.add('chart-initialized');
                }
            });
        }, { threshold: 0.2 });

        chartElements.forEach(el => observer.observe(el));
    }

    createChart(canvas) {
        const chartId = canvas.id;

        // Different chart types for different cases
        if (chartId === 'chart1') {
            this.createLineChart(canvas);
        } else if (chartId === 'chart2') {
            this.createBarChart(canvas);
        } else if (chartId === 'chart3') {
            this.createRadarChart(canvas);
        }
    }

    createLineChart(canvas) {
        const chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Receita (R$)',
                    data: [45000, 52000, 61000, 75000, 89000, 120000],
                    borderColor: '#00ff88',
                    backgroundColor: 'rgba(0, 255, 136, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#00ff88',
                    pointBorderColor: '#000',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 255, 136, 0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                return 'R$' + (value / 1000) + 'K';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        this.charts.push(chart);
    }

    createBarChart(canvas) {
        const chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: ['Desktop', 'Mobile', 'Tablet', 'Smart TV'],
                datasets: [{
                    label: 'Engajamento (%)',
                    data: [45, 35, 15, 5],
                    backgroundColor: [
                        'rgba(0, 255, 136, 0.8)',
                        'rgba(0, 136, 255, 0.8)',
                        'rgba(255, 0, 136, 0.8)',
                        'rgba(136, 0, 255, 0.8)'
                    ],
                    borderColor: [
                        '#00ff88',
                        '#0088ff',
                        '#ff0088',
                        '#8800ff'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 255, 136, 0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        this.charts.push(chart);
    }

    createRadarChart(canvas) {
        const chart = new Chart(canvas, {
            type: 'radar',
            data: {
                labels: ['Conversão', 'Retenção', 'Engagement', 'Revenue', 'Satisfação'],
                datasets: [{
                    label: 'Performance',
                    data: [85, 78, 92, 88, 95],
                    borderColor: '#00ff88',
                    backgroundColor: 'rgba(0, 255, 136, 0.2)',
                    pointBackgroundColor: '#00ff88',
                    pointBorderColor: '#000',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 255, 136, 0.1)'
                        },
                        angleLines: {
                            color: 'rgba(0, 255, 136, 0.1)'
                        },
                        ticks: {
                            stepSize: 20,
                            backdropColor: 'transparent'
                        }
                    }
                }
            }
        });

        this.charts.push(chart);
    }
}

// ============================================
// DATA STREAM BACKGROUND
// ============================================
class DataStream {
    constructor() {
        this.canvas = document.getElementById('dataCanvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Create particles
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            this.ctx.fillStyle = `rgba(0, 255, 136, ${Math.random() * 0.3 + 0.1})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw connections
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    this.ctx.strokeStyle = `rgba(0, 255, 136, ${0.1 * (1 - distance / 150)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ============================================
// FORM HANDLING
// ============================================
class FormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (!this.form) return;

        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Add magnetic effect to submit button
        const submitBtn = this.form.querySelector('.submit-btn');
        if (submitBtn) {
            this.addMagneticEffect(submitBtn);
        }
    }

    handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitBtn = this.form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'ENVIANDO...';
        submitBtn.disabled = true;

        // Simulate API call (replace with actual endpoint)
        setTimeout(() => {
            console.log('Form data:', data);

            // Show success message
            submitBtn.textContent = 'ENVIADO ✓';
            submitBtn.style.background = 'var(--primary)';

            // Reset form
            this.form.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 1500);
    }

    addMagneticEffect(element) {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            element.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    }
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
class AnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Observe bento items
        document.querySelectorAll('.bento-item').forEach(item => {
            observer.observe(item);
        });

        // Observe work cards
        document.querySelectorAll('.work-card').forEach(card => {
            observer.observe(card);
        });

        // Observe lab items
        document.querySelectorAll('.lab-item').forEach(item => {
            observer.observe(item);
        });
    }
}

// ============================================
// CURSOR TRAIL EFFECT (Optional Enhancement)
// ============================================
class CursorTrail {
    constructor() {
        if (window.innerWidth < 768) return; // Skip on mobile

        this.trail = [];
        this.trailLength = 20;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.trail.push({
                x: e.clientX,
                y: e.clientY,
                timestamp: Date.now()
            });

            // Keep trail length limited
            if (this.trail.length > this.trailLength) {
                this.trail.shift();
            }

            this.drawTrail();
        });
    }

    drawTrail() {
        // Remove old trail elements
        document.querySelectorAll('.cursor-trail-dot').forEach(dot => {
            if (Date.now() - parseInt(dot.dataset.timestamp) > 500) {
                dot.remove();
            }
        });

        // Add new trail dot
        if (this.trail.length > 0) {
            const latest = this.trail[this.trail.length - 1];
            const dot = document.createElement('div');
            dot.className = 'cursor-trail-dot';
            dot.dataset.timestamp = latest.timestamp;
            dot.style.left = latest.x + 'px';
            dot.style.top = latest.y + 'px';
            document.body.appendChild(dot);

            // Fade out and remove
            setTimeout(() => dot.remove(), 500);
        }
    }
}

// ============================================
// PERFORMANCE MONITORING
// ============================================
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Log performance metrics
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('🚀 Performance Metrics:');
            console.log(`⏱️  DOM Content Loaded: ${perfData.domContentLoadedEventEnd}ms`);
            console.log(`⏱️  Load Complete: ${perfData.loadEventEnd}ms`);
            console.log(`📦 Transfer Size: ${(perfData.transferSize / 1024).toFixed(2)}KB`);
        });
    }
}

// ============================================
// GLITCH TEXT EFFECT ENHANCEMENT
// ============================================
class GlitchEffect {
    constructor() {
        this.glitchElements = document.querySelectorAll('.glitch-text');
        this.init();
    }

    init() {
        this.glitchElements.forEach(element => {
            setInterval(() => {
                if (Math.random() < 0.1) { // 10% chance every interval
                    element.classList.add('glitching');
                    setTimeout(() => {
                        element.classList.remove('glitching');
                    }, 200);
                }
            }, 3000);
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c HENRIQUE.DATA() ', 'background: #00ff88; color: #000; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%c Analytics Architect & Data Storyteller ', 'background: #0088ff; color: #fff; font-size: 12px; padding: 5px;');
    console.log('%c Portfolio carregado com sucesso! 🚀 ', 'color: #00ff88; font-size: 14px;');

    // Initialize all modules
    new OrbitalNav();
    new TerminalTypewriter();
    new HorizontalScroll();
    new DataVisualizations();
    new DataStream();
    new SmoothScroll();
    new FormHandler();
    new AnimationObserver();
    new CursorTrail();
    new PerformanceMonitor();
    new GlitchEffect();

    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
});

// ============================================
// SERVICE WORKER FOR PWA (Optional)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('✅ Service Worker registered'))
        //     .catch(err => console.log('❌ Service Worker registration failed'));
    });
}

// ============================================
// EASTER EGGS
// ============================================
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            console.log('%c 🎮 KONAMI CODE ACTIVATED! 🎮 ', 'background: #ff0088; color: #fff; font-size: 20px; padding: 10px;');
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = '';
            }, 3000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});
