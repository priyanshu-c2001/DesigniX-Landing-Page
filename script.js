// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const showMoreBtns = document.querySelectorAll('.show-more-btn');
const contactForm = document.getElementById('contactForm');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Mobile Navigation
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.05, // Triggers when 5% of the element is visible
    rootMargin: '0px 0px -20px 0px' // Shrinks the viewport detection area by a smaller amount
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); // Stop observing the element once it has animated
        }
    });
}, observerOptions);

// Observe all elements with animate-up class
document.querySelectorAll('.animate-up').forEach(el => {
    observer.observe(el);
});

// Show More / Show Less functionality
// Accordion-style: Only one card open at a time
// Fix: Show More / Show Less per card only
document.querySelectorAll('.show-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const serviceCard = btn.closest('.service-card');
        const detailSection = serviceCard.querySelector('.service-details');

        const isExpanded = detailSection.classList.contains('expanded');

        if (isExpanded) {
            detailSection.classList.remove('expanded');
            btn.textContent = 'Show More';
        } else {
            detailSection.classList.add('expanded');
            btn.textContent = 'Show Less';
        }
    });
});


// Tomato hover effect function
function animateTomatoEffect(element, type) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: ${type === 'expand' ? '-100%' : '0'};
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 99, 71, 0.3), transparent);
        pointer-events: none;
        transition: left 0.5s ease;
        z-index: 1;
    `;

    element.style.position = 'relative';
    element.appendChild(overlay);

    setTimeout(() => {
        overlay.style.left = type === 'expand' ? '100%' : '-100%';

        setTimeout(() => {
            element.removeChild(overlay);
        }, 500);
    }, 50);
}

// Enhanced button hover effects
document.querySelectorAll('.btn-primary, .btn-secondary, .show-more-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        createTomatoHoverEffect(btn);
    });
});

function createTomatoHoverEffect(button) {
    // Create the tomato effect element
    const tomatoEffect = document.createElement('div');
    tomatoEffect.className = 'tomato-hover-effect';
    tomatoEffect.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 99, 71, 0.1) 25%, 
            rgba(255, 99, 71, 0.3) 50%, 
            rgba(255, 99, 71, 0.1) 75%, 
            transparent 100%
        );
        pointer-events: none;
        transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 0;
    `;

    // Ensure button has relative positioning
    if (getComputedStyle(button).position === 'static') {
        button.style.position = 'relative';
    }

    button.appendChild(tomatoEffect);

    // Trigger the animation
    requestAnimationFrame(() => {
        tomatoEffect.style.left = '100%';
    });

    // Handle mouse leave
    const handleMouseLeave = () => {
        tomatoEffect.style.transition = 'left 0.4s ease-out';
        tomatoEffect.style.left = '200%';

        setTimeout(() => {
            if (button.contains(tomatoEffect)) {
                button.removeChild(tomatoEffect);
            }
        }, 400);

        button.removeEventListener('mouseleave', handleMouseLeave);
    };

    button.addEventListener('mouseleave', handleMouseLeave);
}

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Add premium hover animation
        card.style.transform = 'translateY(-10px) scale(1.02)';

        // Create floating effect for service number
        const serviceNumber = card.querySelector('.service-number');
        if (serviceNumber) {
            serviceNumber.style.transform = 'translateY(-5px) rotate(2deg)';
            serviceNumber.style.color = 'rgba(255, 99, 71, 0.3)';
        }
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';

        const serviceNumber = card.querySelector('.service-number');
        if (serviceNumber) {
            serviceNumber.style.transform = 'translateY(0) rotate(0deg)';
            serviceNumber.style.color = 'rgba(0, 0, 0, 0.1)';
        }
    });
});

// Portfolio item animations
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.03)';

        // Add rotation effect to image
        const img = item.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1.15) rotate(2deg)';
        }
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';

        const img = item.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const formEntries = Object.fromEntries(formData);

    // Show success message with animation
    showFormMessage('Thank you! Your message has been sent successfully.', 'success');

    // Reset form
    contactForm.reset();

    // Add tomato effect to submit button
    const submitBtn = contactForm.querySelector('.btn-primary');
    animateTomatoEffect(submitBtn, 'expand');
});

function showFormMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(messageDiv);

    // Animate in
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);

    // Animate out and remove
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 50;

    // This logic is now updated to maintain a black background
    if (scrolled) {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)'; // Dark background with slight transparency
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'var(--primary-color)'; // Solid black background
        navbar.style.boxShadow = 'none';
    }
});

// Scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 80px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #FF6347, #FF6347);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percentage = (scrolled / maxHeight) * 100;
        progressBar.style.width = `${percentage}%`;
    });
};

// Initialize scroll progress
createScrollProgress();

// Text typing effect for hero title (alternative animation)
const initTypewriterEffect = () => {
    const titleLines = document.querySelectorAll('.title-line');

    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';

        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                line.textContent += text.charAt(i);
                i++;
                if (i > text.length) {
                    clearInterval(typeInterval);
                }
            }, 100);
        }, index * 500 + 1000);
    });
};

// Counter animation for stats
// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        // Add this condition to prevent the "24/7" text from being animated
        if (counter.textContent.trim() === '24/7') {
            return;
        }

        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        const duration = 2000; // 2 seconds
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, stepTime);
    });
};

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add cursor trail effect
const createCursorTrail = () => {
    let mouseX = 0;
    let mouseY = 0;
    let trail = [];

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        trail.push({ x: mouseX, y: mouseY });

        if (trail.length > 10) {
            trail.shift();
        }
    });

    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 9998;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        trail.forEach((point, index) => {
            const opacity = index / trail.length;
            const size = (index / trail.length) * 5;

            ctx.beginPath();
            ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 99, 71, ${opacity * 0.3})`;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    };

    animate();
};

// Initialize cursor trail on desktop
if (window.innerWidth > 768) {
    createCursorTrail();
}

// Performance optimization - debounce scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
    // Scroll-heavy operations here
}, 16)); // ~60fps

// Initialize all animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Stagger animation delays for better visual flow
    document.querySelectorAll('.animate-up').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });
});

console.log('DesignX Premium Landing Page Loaded Successfully! 🎨');

// Add this code block to your script.js file

// Expandable Portfolio Section
const viewAllProjectsBtn = document.getElementById('viewAllProjectsBtn');
const moreProjects = document.getElementById('moreProjects');

if (viewAllProjectsBtn && moreProjects) {
    viewAllProjectsBtn.addEventListener('click', () => {
        if (moreProjects.classList.contains('expanded')) {
            moreProjects.classList.remove('expanded');
            viewAllProjectsBtn.textContent = 'View All Projects';
        } else {
            moreProjects.classList.add('expanded');
            viewAllProjectsBtn.textContent = 'Show Less';
        }
    });
}