document.addEventListener('DOMContentLoaded', () => {
    // NOTE: Fade-in, profile picture hover, link card click/glow effects 
    // are now handled by Tailwind CSS classes in index.html for better performance.

    // Add parallax effect to gradient spheres
    const spheres = document.querySelectorAll('.gradient-sphere');
    document.addEventListener('mousemove', (e) => {
        // Debounce or throttle this listener if performance issues arise
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        spheres.forEach((sphere, index) => {
            const moveX = (clientX - centerX) * (0.02 + index * 0.01);
            const moveY = (clientY - centerY) * (0.02 + index * 0.01);
            // Consider using requestAnimationFrame for smoother animation
            sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // Add smooth scroll behavior for internal links (if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Check if it's more than just a placeholder '#'
            if (href.length > 1 && document.querySelector(href)) {
                 e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add 3D tilt effect to profile card
    const profileCard = document.querySelector('.profile');
    if (profileCard) { // Check if element exists
        profileCard.addEventListener('mousemove', (e) => {
            // Consider debouncing/throttling
            const { left, top, width, height } = profileCard.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            const tiltX = y * 5; // Max tilt 5 degrees
            const tiltY = x * -5; // Max tilt 5 degrees (inverted for natural feel)
            
            // Consider using requestAnimationFrame
            profileCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.03)`; // Added subtle scale on tilt
        });
        
        profileCard.addEventListener('mouseleave', () => {
            profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            profileCard.style.transition = 'transform 0.4s ease-out'; // Smooth transition back
        });
         // Reset transition after mouse leaves so it doesn't interfere with mousemove
        profileCard.addEventListener('transitionend', () => {
             profileCard.style.transition = '';
        });
    }

    // Add particle effect to background
    createParticles();
});

// Create floating particles in the background
function createParticles() {
    const background = document.querySelector('.background');
    if (!background) return; // Exit if background element not found

    const particleCount = 30; // Reduced count for performance
    const fragment = document.createDocumentFragment(); // Use fragment for performance
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.setAttribute('aria-hidden', 'true'); // Hide decorative particles
        particle.classList.add('particle');
        
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const size = Math.random() * 3 + 1; // Smaller size range
        const duration = Math.random() * 20 + 15; // Longer duration range
        const delay = Math.random() * 10; // Wider delay range
        const opacity = Math.random() * 0.3 + 0.1; // Lower opacity range

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, ${opacity});
            border-radius: 50%;
            left: ${posX}vw; /* Use vw for better relative positioning */
            top: ${posY}vh;  /* Use vh for better relative positioning */
            animation: float-particle ${duration}s infinite ease-in-out alternate; /* Added alternate */
            animation-delay: ${delay}s;
            pointer-events: none; /* Prevent interaction */
            will-change: transform; /* Performance hint */
        `;
        
        fragment.appendChild(particle);
    }
    
    background.appendChild(fragment);
    
    // Check if animation style already exists before adding
    if (!document.getElementById('particle-animation-style')) {
        const style = document.createElement('style');
        style.id = 'particle-animation-style';
        style.textContent = `
            @keyframes float-particle {
                0% { transform: translate(0, 0); }
                100% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px); } /* Random end points for variety */
            }
        `;
        document.head.appendChild(style);
    }
} 