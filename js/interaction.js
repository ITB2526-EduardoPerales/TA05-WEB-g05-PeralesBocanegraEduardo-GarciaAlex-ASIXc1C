// js/interaction.js

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. LOGO ANIMATION --- */
    // Initial animation for the portfolio logo on load
    const logoElement = document.querySelector('.logo');
    if (logoElement) {
        logoElement.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        logoElement.style.opacity = 1;
        logoElement.style.transform = 'translateY(0)';
    }

    /* --- 2. TYPED.JS INITIALIZATION --- */
    // Dynamic typing effect for the main title (if present on the page)
    const mainTitleElement = document.getElementById('main-title');
    if (mainTitleElement) {
        new Typed('#main-title', {
            strings: [" ", "PORTFOLIO", "NETWORKING & SECURITY", "CYBER DEFENSE"],
            typeSpeed: 80,
            backSpeed: 50,
            loop: true,
            showCursor: true,
            cursorChar: '_',
        });
    }

    /* --- 3. AOS (ANIMATE ON SCROLL) --- */
    // Initializes the AOS library for scroll animations
    if (typeof AOS !== 'undefined') {
        AOS.init();
    }

    /* --- 4. PROJECT FILTERING LOGIC --- */
    // Handles searching and category filtering on the projects page
    const searchInput = document.getElementById('projectSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const projectItems = document.querySelectorAll('.project-item');
    const countDisplay = document.getElementById('projectCount');

    function performFilter() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCat = categoryFilter.value;
        let visibleCount = 0;

        projectItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const category = item.getAttribute('data-category');

            const matchesSearch = title.includes(searchTerm);
            const matchesCategory = selectedCat === 'all' || category === selectedCat;

            // Toggle visibility using the 'project-hidden' class
            if (matchesSearch && matchesCategory) {
                item.classList.remove('project-hidden');
                visibleCount++;
            } else {
                item.classList.add('project-hidden');
            }
        });

        // Update the project counter in the footer
        if (countDisplay) {
            countDisplay.textContent = `Showing ${visibleCount} project${visibleCount !== 1 ? 's' : ''}.`;
        }
    }

    // Attach events to filter inputs
    if (searchInput && categoryFilter) {
        searchInput.addEventListener('input', performFilter);
        categoryFilter.addEventListener('change', performFilter);
    }

    /* --- 5. INTERACTIVE BUTTON EFFECTS --- */
    // Adds a 3D tilt and light effect to navigation links and buttons
    const interactiveButtons = document.querySelectorAll('header nav a, .btn-detail, .boton-subir');
    const MAX_TILT = 5;

    interactiveButtons.forEach(button => {
        const handleMouseMove = (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const tiltX = -((y - centerY) / centerY) * MAX_TILT;
            const tiltY = ((x - centerX) / centerX) * MAX_TILT;

            button.style.transition = 'none';
            button.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
        };

        const handleMouseLeave = () => {
            button.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
            button.style.transform = 'none';
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);
    });
});