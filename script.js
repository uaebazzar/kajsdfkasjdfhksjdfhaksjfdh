document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CUSTOM CURSOR LOGIC
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    
    let mouseX = 0, mouseY = 0; // Actual mouse position
    let outlineX = 0, outlineY = 0; // Trailing position

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate dot movement
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    // Smooth trailing effect for the outline
    const animateCursor = () => {
        let distX = mouseX - outlineX;
        let distY = mouseY - outlineY;

        outlineX += distX * 0.15; // Delay factor
        outlineY += distY * 0.15;

        outline.style.transform = `translate(${outlineX - 12}px, ${outlineY - 12}px)`;
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Cursor Hover Effects
    const hoverables = document.querySelectorAll('.hover-target, .project-item');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.style.transform += ' scale(2.5)';
            outline.style.backgroundColor = 'rgba(255,255,255,0.1)';
            if(el.getAttribute('data-cursor-text')) {
                outline.innerText = el.getAttribute('data-cursor-text');
            }
        });
        el.addEventListener('mouseleave', () => {
            outline.style.transform = outline.style.transform.replace(' scale(2.5)', '');
            outline.style.backgroundColor = 'transparent';
            outline.innerText = '';
        });
    });

    // 2. SCROLL REVEAL LOGIC
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Track all elements with animation classes
    document.querySelectorAll('.reveal-up, .reveal-clip, .fade-in').forEach(el => {
        observer.observe(el);
    });

    // 3. SMOOTH SCROLL FOR NAV LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
