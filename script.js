// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    const isClickInsideNav = navMenu.contains(event.target) || mobileMenuBtn.contains(event.target);
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    // Simulate form submission (in production, send to backend)
    console.log('Form submitted with data:', data);

    // Show success message
    successMessage.classList.add('show');

    // Reset form
    contactForm.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);

    // Optional: Uncomment below to send to a backend service
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Success:', data);
    //     successMessage.classList.add('show');
    //     contactForm.reset();
    //     setTimeout(() => {
    //         successMessage.classList.remove('show');
    //     }, 5000);
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    // });
});

// Smooth scroll enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            const element = document.querySelector(href);
            if (element) {
                e.preventDefault();
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe project cards and skill items
document.querySelectorAll('.project-card, .skill-item').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// Add scroll animation to section titles
window.addEventListener('scroll', () => {
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        const rect = title.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
            title.style.opacity = '1';
        }
    });
});

// CTA button scroll effect
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(-1px)';
    });
    ctaButton.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-3px)';
    });
}

// Social icon links (update with actual URLs)
const socialIcons = document.querySelectorAll('.social-icon');
const socialLinks = {
    0: 'https://github.com', // GitHub
    1: 'https://linkedin.com', // LinkedIn
    2: 'https://twitter.com', // Twitter
    3: 'mailto:contact@example.com' // Email
};

socialIcons.forEach((icon, index) => {
    if (socialLinks[index]) {
        icon.href = socialLinks[index];
        icon.target = index < 3 ? '_blank' : '_self';
    }
});

// Active nav link indicator
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#60a5fa';
        }
    });
});

// Add parallax effect to hero section
const heroSection = document.querySelector('.hero-section');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) {
        const scrollY = window.pageYOffset;
        if (heroContent && scrollY < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrollY * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrollY / (window.innerHeight * 1.5));
        }
    }
});

// Prevent form submission if required fields are empty
const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
formInputs.forEach(input => {
    input.addEventListener('invalid', (e) => {
        e.preventDefault();
        input.style.borderColor = '#ef4444';
        input.style.borderWidth = '2px';
    });

    input.addEventListener('input', () => {
        input.style.borderColor = '';
        input.style.borderWidth = '';
    });
});

console.log('Portfolio website loaded successfully!');
