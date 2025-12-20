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

// 3. Auto-Scroll Intro
let isAutoScrolling = true;

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section && isAutoScrolling) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

async function runAutoScroll() {
    const sequence = ['work', 'about', 'contact', 'home'];
    for (const id of sequence) {
        if (!isAutoScrolling) break;
        await new Promise(res => setTimeout(res, 2500));
        scrollToSection(id);
        if (id === 'home') isAutoScrolling = false;
    }
}

window.addEventListener('load', runAutoScroll);

// Stop auto-scroll on user activity
['wheel', 'click', 'keydown'].forEach(evt => {
    window.addEventListener(evt, () => isAutoScrolling = false, { once: true });
});

// 4. Hide Social Dock at Footer
const socialDock = document.querySelector('.social-dock');
window.addEventListener('scroll', () => {
    const isAtBottom = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 100;
    socialDock.style.opacity = isAtBottom ? '0' : '1';
    socialDock.style.transform = isAtBottom ? 'translateX(-50%) translateY(20px)' : 'translateX(-50%)';
});