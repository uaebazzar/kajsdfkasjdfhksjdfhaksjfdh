// Custom Cursor Logic
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Expand cursor on hover
document.querySelectorAll('a, .project').forEach(link => {
    link.addEventListener('mouseenter', () => cursor.style.transform = 'scale(4)');
    link.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
});

// Reveal Animation on Scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Add basic CSS for the reveal effect via JS
const style = document.createElement('style');
style.innerHTML = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    .reveal.active {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));