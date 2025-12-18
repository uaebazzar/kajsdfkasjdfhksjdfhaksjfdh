document.addEventListener('DOMContentLoaded', () => {

    // 1. Remove Preloader
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        setTimeout(() => {
            loader.style.transform = 'translateY(-100%)';
        }, 1000);
    });

    // 2. Custom Cursor
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // 3. Reveal Elements on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Apply observer to images, text, and titles
    document.querySelectorAll('.fade-in, .reveal-wipe, .title-reveal').forEach(el => {
        observer.observe(el);
    });

    // 4. Hero Title Animation on Startup
    setTimeout(() => {
        document.querySelectorAll('.title-reveal').forEach(el => el.classList.add('active'));
    }, 1500);

    // 5. Magnetic Hover Effect for Email
    const email = document.querySelector('.big-email');
    email.addEventListener('mousemove', (e) => {
        const rect = email.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        email.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        cursor.style.transform = 'scale(10)';
    });

    email.addEventListener('mouseleave', () => {
        email.style.transform = `translate(0px, 0px)`;
        cursor.style.transform = 'scale(1)';
    });
});
