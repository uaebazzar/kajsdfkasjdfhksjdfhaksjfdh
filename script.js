document.addEventListener('DOMContentLoaded', () => {
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a slight delay for staggered items
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100); 
            }
        });
    }, observerOptions);

    // Track images and text for animations
    document.querySelectorAll('.reveal, .stagger').forEach(el => {
        observer.observe(el);
    });

    // Simple parallax effect for images on scroll
    window.addEventListener('scroll', () => {
        const images = document.querySelectorAll('.img-space img');
        images.forEach(img => {
            const speed = 0.05;
            const rect = img.parentElement.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const shift = (window.innerHeight - rect.top) * speed;
                img.style.transform = `scale(1.1) translateY(${shift}px)`;
            }
        });
    });
});
