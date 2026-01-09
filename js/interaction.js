// js/interaction.js - INTERACTIVE PARTICLES & CYBERPUNK LOGIC

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. NETWORK PARTICLES SYSTEM (Background) --- */
    const particleContainer = document.getElementById('particles-background');

    if (particleContainer) {
        const canvas = document.createElement('canvas');
        particleContainer.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        let particlesArray;

        // Ajustar tamaño del canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.directionX = (Math.random() * 0.4) - 0.2;
                this.directionY = (Math.random() * 0.4) - 0.2;
                this.size = Math.random() * 2 + 1;
                this.color = '#00ffe7'; // NEON CYAN
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
                this.x += this.directionX;
                this.y += this.directionY;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = 0.5;
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 15000;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();

                // Líneas de conexión (Red)
                for (let j = i; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x;
                    const dy = particlesArray[i].y - particlesArray[j].y;
                    const distance = Math.sqrt(dx*dx + dy*dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 255, 231, ${1 - distance/120})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        initParticles();
        animateParticles();
    }

    /* --- 2. LOGO ANIMATION --- */
    const logoElement = document.querySelector('.logo');
    if (logoElement) {
        logoElement.style.transition = 'opacity 1.5s ease-out, transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        logoElement.style.opacity = 0;
        logoElement.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            logoElement.style.opacity = 1;
            logoElement.style.transform = 'translateY(0)';
        }, 100);
    }

    /* --- 3. TYPED.JS (TERMINAL STYLE) --- */
    const mainTitleElement = document.getElementById('main-title');
    if (mainTitleElement && typeof Typed !== 'undefined') {
        mainTitleElement.textContent = "";

        new Typed('#main-title', {
            strings: [
                "SYSTEM.INIT...",
                "PORTFOLIO LOADED.",
                "NETWORKING & SECURITY",
                "CYBER DEFENSE",
                "INFRASTRUCTURE OPS"
            ],
            typeSpeed: 50,
            backSpeed: 30,
            startDelay: 500,
            backDelay: 1500,
            loop: true,
            showCursor: true,
            cursorChar: '█',
        });
    }

    /* --- 4. AOS INIT --- */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            offset: 80,
            duration: 800,
            easing: 'ease-out-cubic',
            once: true
        });
    }

    /* --- 5. SEARCH & FILTER --- */
    const searchInput = document.getElementById('projectSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const projectItems = document.querySelectorAll('.project-item');
    const countDisplay = document.getElementById('projectCount');

    function performFilter() {
        const searchTerm = (searchInput.value || "").toLowerCase();
        const selectedCat = categoryFilter.value;
        let visibleCount = 0;

        projectItems.forEach(item => {
            const titleElement = item.querySelector('h3');
            if(!titleElement) return;
            const title = titleElement.textContent.toLowerCase();
            const category = item.getAttribute('data-category');

            const matchesSearch = title.includes(searchTerm);
            const matchesCategory = selectedCat === 'all' || category === selectedCat;

            if (matchesSearch && matchesCategory) {
                item.classList.remove('project-hidden');
                item.style.animation = 'fadeIn 0.5s ease forwards';
                visibleCount++;
            } else {
                item.classList.add('project-hidden');
            }
        });

        if (countDisplay) {
            countDisplay.innerHTML = `STATUS: Found <span style="color:#00ffe7; font-weight:bold;">${visibleCount}</span> projects.`;
        }
    }

    if (searchInput && categoryFilter) {
        searchInput.addEventListener('input', performFilter);
        categoryFilter.addEventListener('change', performFilter);
    }

    /* --- 6. 3D TILT EFFECT (NEON GLOW) --- */
    const interactiveElements = document.querySelectorAll('.btn-detail, article, .boton-subir');
    const MAX_TILT = 5;

    interactiveElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -MAX_TILT;
            const rotateY = ((x - centerX) / centerX) * MAX_TILT;

            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;

            el.style.transition = 'none';
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            el.style.background = `
                radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                var(--bg-panel, rgba(20, 30, 46, 0.6))
            `;
            el.style.borderColor = "rgba(0, 255, 231, 0.8)";
        });

        el.addEventListener('mouseleave', () => {
            el.style.transition = 'all 0.5s ease';
            el.style.transform = 'none';
            el.style.background = '';
            el.style.borderColor = '';
        });
    });
});