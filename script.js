// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Form submission handling
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const response = grecaptcha.getResponse();
    if (!response) {
        alert('Please complete the reCAPTCHA');
        return;
    }

    // Get form data
    const formData = {
        name: this.name.value,
        email: this.email.value,
        message: this.message.value,
        subject: `New Portfolio Contact: ${this.name.value}`,
        to_name: "Alfred", // Add your name as recipient
        from_name: this.name.value // Add sender's name
    };

    // Send email using EmailJS
    emailjs.send('service_ox0e6sj', 'template_8yfwmdn', formData)
        .then(function(response) {
            document.querySelector('.form-status').innerHTML = 'Message sent successfully!';
            document.getElementById('contactForm').reset();
            grecaptcha.reset();
        })
        .catch(function(error) {
            document.querySelector('.form-status').innerHTML = 'Failed to send message. Please try again.';
        });
});

// Skill cards animation
const skillCards = document.querySelectorAll('.skill-card');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    observer.observe(card);
});

// Project cards hover effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const image = card.querySelector('img');
        if (image) {
            image.style.transform = 'scale(1.1)';
        }
    });

    card.addEventListener('mouseleave', () => {
        const image = card.querySelector('img');
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});

// Add some CSS for the new effects
const style = document.createElement('style');
style.textContent = `
    nav {
        transition: transform 0.3s ease;
    }
    
    .project-card img {
        transition: transform 0.3s ease;
    }
    
    .skill-card {
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
`;
document.head.appendChild(style);

(function() {
    emailjs.init("GjTlVIxC3XV-biybW"); // Replace with the Public Key from your dashboard
})();