// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particles.js
    initParticles();
    
    // Set up mobile menu toggle
    setupMobileMenu();
    
    // Set up contact form submission
    setupContactForm();
    
    // Add smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Add scroll margin to sections for fixed header
    setupScrollMargin();
    
    // Setup scroll animations
    setupScrollAnimations();
});

/**
 * Initialize particles.js in the hero section with optimized settings
 */
function initParticles() {
    // Check if particles.js is loaded
    if (typeof particlesJS === 'undefined') {
        console.log('Particles.js not loaded, skipping particle initialization');
        return;
    }

    particlesJS('particles-js', {
        particles: {
            number: {
                value: 60,
                density: {
                    enable: true,
                    value_area: 1000
                }
            },
            color: {
                value: '#06b6d4'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.3,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 2,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.5,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 120,
                color: '#06b6d4',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 100,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

/**
 * Set up mobile menu toggle functionality
 */
function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        // Toggle menu visibility
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            mobileMenu.classList.toggle('active');
            
            // Update hamburger icon
            const icon = menuToggle.querySelector('svg');
            if (mobileMenu.classList.contains('active')) {
                // Change to X icon
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
            } else {
                // Change back to hamburger
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                const icon = menuToggle.querySelector('svg');
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
            }
        });
        
        // Close menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                const icon = menuToggle.querySelector('svg');
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
            });
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) {
                mobileMenu.classList.remove('active');
                const icon = menuToggle.querySelector('svg');
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
            }
        });
    }
}

/**
 * Set up contact form submission with enhanced validation and feedback
 */
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;
    
    if (contactForm && submitButton) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Store original button text
            const originalText = submitButton.textContent;
            
            // Basic validation
            if (!name) {
                showFormMessage('Please enter your name', 'error');
                document.getElementById('name').focus();
                return;
            }
            
            if (!email) {
                showFormMessage('Please enter your email address', 'error');
                document.getElementById('email').focus();
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                document.getElementById('email').focus();
                return;
                
            }
            // Disable submit button while processing
submitButton.textContent = "Sending...";
submitButton.disabled = true;

// Send data to Render backend
fetch("https://contact-form-backend-07bb.onrender.com/api/contact", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ name, email, message })
})
.then(res => {
  if (!res.ok) throw new Error("Failed to send");
  return res.text();
})
.then(() => {
  showFormMessage("✅ Message sent successfully!", "success");
  contactForm.reset();
})
.catch(() => {
  showFormMessage("❌ Something went wrong. Please try again later.", "error");
})
.finally(() => {
  submitButton.textContent = originalText;
  submitButton.disabled = false;
});

            if (!message) {
                showFormMessage('Please enter a message', 'error');
                document.getElementById('message').focus();
                return;
            }
            
            if (message.length < 10) {
                showFormMessage('Message must be at least 10 characters long', 'error');
                document.getElementById('message').focus();
                return;
            }
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (in real app, this would be an API call)
            setTimeout(() => {
                showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
                contactForm.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Remove error styling as user types
                this.classList.remove('border-red-500');
                const errorMsg = this.parentNode.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });
        });
    }
}

/**
 * Show form validation message
 */
function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message mb-4 p-3 rounded-md text-sm ${
        type === 'error' 
            ? 'bg-red-900/30 border border-red-700 text-red-400' 
            : 'bg-green-900/30 border border-green-700 text-green-400'
    }`;
    messageDiv.textContent = message;
    
    const form = document.getElementById('contact-form');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Auto remove success messages
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

/**
 * Validate individual form field
 */
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    field.classList.remove('border-red-500');
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    } else if (field.id === 'message' && value && value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long';
    }
    
    if (!isValid) {
        field.classList.add('border-red-500');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-red-400 text-xs mt-1';
        errorDiv.textContent = errorMessage;
        field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Set up smooth scrolling for navigation links
 */
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default if the href is not just "#" and target exists
            if (href !== '#') {
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Calculate offset for fixed header
                    const headerOffset = 80;
                    const elementPosition = targetElement.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Add scroll margin to sections for fixed header
 */
function setupScrollMargin() {
    const sections = document.querySelectorAll('section');
    const headerHeight = 80; // Approximate header height in pixels
    
    sections.forEach(section => {
        section.style.scrollMarginTop = `${headerHeight}px`;
    });
}

/**
 * Set up scroll animations and intersection observer
 */
function setupScrollAnimations() {
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .info-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Initially hide elements and set transform
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

/**
 * Highlight active section in navigation
 */
function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    window.addEventListener('scroll', throttle(() => {
        let current = '';
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-cyan-400');
            link.classList.add('text-slate-300');
            
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.remove('text-slate-300');
                link.classList.add('text-cyan-400');
            }
        });
    }, 100));
}

/**
 * Throttle function to limit how often a function can be called
 */
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Initialize active section highlighting
highlightActiveSection();

// Handle window resize for particles
window.addEventListener('resize', throttle(() => {
    if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        window.pJSDom[0].pJS.fn.canvasSize();
    }
}, 250));