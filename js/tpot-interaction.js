// js/irs-interaction.js (ACTUALIZADO)

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. FONDO DE PARTÍCULAS --- */
    // Necesario crear el div en el HTML si no existe, o usar el body
    let particleContainer = document.getElementById('particles-background');
    if (!particleContainer) {
        // Si no existe el div en el HTML del detalle, lo creamos dinámicamente
        particleContainer = document.createElement('div');
        particleContainer.id = 'particles-background';
        particleContainer.style.position = 'fixed';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.zIndex = '-1';
        document.body.appendChild(particleContainer);
    }

    // Iniciar Canvas
    const canvas = document.createElement('canvas');
    particleContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.dX = (Math.random() * 0.4) - 0.2;
            this.dY = (Math.random() * 0.4) - 0.2;
            this.size = Math.random() * 2 + 1;
        }
        update() {
            if (this.x > canvas.width || this.x < 0) this.dX = -this.dX;
            if (this.y > canvas.height || this.y < 0) this.dY = -this.dY;
            this.x += this.dX;
            this.y += this.dY;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = '#00ffe7';
            ctx.globalAlpha = 0.5;
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        let count = (canvas.width * canvas.height) / 15000;
        for(let i=0; i<count; i++) particlesArray.push(new Particle());
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for(let i=0; i<particlesArray.length; i++){
            particlesArray[i].update();
            particlesArray[i].draw();
            for(let j=i; j<particlesArray.length; j++){
                let dx = particlesArray[i].x - particlesArray[j].x;
                let dy = particlesArray[i].y - particlesArray[j].y;
                let dist = Math.sqrt(dx*dx + dy*dy);
                if(dist < 120){
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 255, 231, ${1 - dist/120})`;
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


    /* --- 2. EFECTO DE MÁQUINA DE ESCRIBIR --- */
    const h1Element = document.querySelector('.capcalera-principal h1');
    const words = ["Portfolio", "Incident Reporting System"]; // Cambia esto para T-Pot en su archivo
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            h1Element.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            h1Element.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 75 : 150;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        setTimeout(typeEffect, typeSpeed);
    }
    if (h1Element) typeEffect();

    /* --- 3. EFECTO TILT PARA IMÁGENES --- */
    const images = document.querySelectorAll('.imagen-parrafo img, .area-visual-projecte img');
    images.forEach(img => {
        img.addEventListener('mousemove', (e) => {
            const rect = img.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            img.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
        });
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'none';
        });
    });
});