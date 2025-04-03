document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to elements
    const elements = document.querySelectorAll('.profile, .link-card');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Add hover effect to profile picture
    const profilePicture = document.getElementById('profile-picture');
    profilePicture.addEventListener('mouseover', () => {
        profilePicture.style.filter = 'brightness(1.2)';
        profilePicture.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.5)';
    });
    profilePicture.addEventListener('mouseout', () => {
        profilePicture.style.filter = 'brightness(1)';
        profilePicture.style.boxShadow = '0 5px 15px var(--shadow-color)';
    });

    // Add click animation to link cards
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Allow the default link behavior to proceed
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = 'translateY(-3px)';
            }, 150);
        });
    });

    // Add glow effect on hover for link cards
    linkCards.forEach(card => {
        card.addEventListener('mouseover', () => {
            if (card.classList.contains('github')) {
                card.style.boxShadow = '0 0 15px rgba(51, 51, 51, 0.5)';
            } else if (card.classList.contains('linkedin')) {
                card.style.boxShadow = '0 0 15px rgba(0, 119, 181, 0.5)';
            } else if (card.classList.contains('twitter')) {
                card.style.boxShadow = '0 0 15px rgba(29, 161, 242, 0.5)';
            } else if (card.classList.contains('instagram')) {
                card.style.boxShadow = '0 0 15px rgba(225, 48, 108, 0.5)';
            }
        });
        
        card.addEventListener('mouseout', () => {
            card.style.boxShadow = 'var(--glass-shadow)';
        });
    });

    // Add parallax effect to gradient spheres
    const spheres = document.querySelectorAll('.gradient-sphere');
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        spheres.forEach((sphere, index) => {
            const moveX = (clientX - centerX) * (0.02 + index * 0.01);
            const moveY = (clientY - centerY) * (0.02 + index * 0.01);
            sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href !== '#') {
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add 3D tilt effect to profile card
    const profileCard = document.querySelector('.profile');
    profileCard.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = profileCard.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        profileCard.style.transform = `perspective(1000px) rotateX(${y * 5}deg) rotateY(${x * 5}deg)`;
    });
    
    profileCard.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });

    // Add particle effect to background
    createParticles();
});

// Create floating particles in the background
function createParticles() {
    const background = document.querySelector('.background');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 5 + 1;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        
        // Random delay
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            animation: float-particle ${duration}s infinite ease-in-out;
            animation-delay: ${delay}s;
            opacity: ${Math.random() * 0.5 + 0.1};
        `;
        
        background.appendChild(particle);
    }
    
    // Add the float-particle animation to the stylesheet
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0%, 100% {
                transform: translateY(0) translateX(0);
            }
            25% {
                transform: translateY(-20px) translateX(10px);
            }
            50% {
                transform: translateY(0) translateX(20px);
            }
            75% {
                transform: translateY(20px) translateX(10px);
            }
        }
    `;
    document.head.appendChild(style);
} 