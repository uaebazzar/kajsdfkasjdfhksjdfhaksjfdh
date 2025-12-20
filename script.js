const cursor = document.getElementById('cursor');
let cursorVisible = false;
let cursorTimeout;

// 1. Mouse Follower Logic
document.addEventListener('mousemove', (e) => {
    if (!cursorVisible) {
        cursor.style.opacity = '1';
        cursorVisible = true;
    }
    cursor.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
});

// 2. Cursor Scaling on Hover
const interactables = document.querySelectorAll('a, button, .glass');
interactables.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(4)';
        cursor.style.opacity = '0.3';
    });
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(4)', '');
        cursor.style.opacity = '1';
    });
});


// 4. Hide Social Dock at Footer and Header after 3rd page
const socialDock = document.querySelector('.social-dock');
const header = document.querySelector('nav');
const aboutSection = document.getElementById('about');

window.addEventListener('scroll', () => {
    // Hide social dock at footer
    const isAtBottom = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 100;
    socialDock.style.opacity = isAtBottom ? '0' : '1';
    socialDock.style.transform = isAtBottom ? 'translateX(-50%) translateY(20px)' : 'translateX(-50%)';
    
    // Hide header after 3rd page with modern animation
    if (aboutSection) {
        const aboutSectionTop = aboutSection.offsetTop;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > aboutSectionTop) {
            header.style.opacity = '0';
            header.style.transform = 'translateY(-100%) scale(0.95)';
            header.style.pointerEvents = 'none';
        } else {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0) scale(1)';
            header.style.pointerEvents = 'auto';
        }
    }
});
