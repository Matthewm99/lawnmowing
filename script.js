// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Form Handling
document.getElementById('serviceRequestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {};
    
    // Convert FormData to regular object
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Basic form validation
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'serviceType'];
    const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
    
    if (missingFields.length > 0) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\(\)\+]+$/;
    if (!phoneRegex.test(data.phone)) {
        showFormMessage('Please enter a valid phone number.', 'error');
        return;
    }
    
    // Simulate form submission
    submitForm(data);
});

function submitForm(data) {
    // Show loading state
    const submitButton = document.querySelector('.btn-submit');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // In a real application, you would send this data to your server
        console.log('Form data submitted:', data);
        
        // Log the submission details for demonstration
        logSubmission(data);
        
        // Reset form
        document.getElementById('serviceRequestForm').reset();
        
        // Show success message
        showFormMessage('Thank you for your request! We\'ll get back to you within 24 hours with a free quote.', 'success');
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Scroll to message
        document.getElementById('formMessage').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
    }, 2000); // 2 second delay to simulate processing
}

function showFormMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
    
    // Auto hide success messages after 10 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 10000);
    }
}

function logSubmission(data) {
    // Create a formatted log entry for the service request
    const timestamp = new Date().toLocaleString();
    const logEntry = {
        timestamp: timestamp,
        customer: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phone: data.phone,
            address: data.address
        },
        service: {
            type: data.serviceType,
            propertySize: data.propertySize || 'Not specified',
            frequency: data.frequency || 'Not specified',
            details: data.message || 'No additional details provided'
        },
        newsletter: data.newsletter ? 'Yes' : 'No'
    };
    
    console.log('=== NEW SERVICE REQUEST ===');
    console.log('Timestamp:', logEntry.timestamp);
    console.log('Customer:', logEntry.customer);
    console.log('Service Details:', logEntry.service);
    console.log('Newsletter Signup:', logEntry.newsletter);
    console.log('============================');
    
    // In a real application, you would:
    // 1. Send this data to your backend server
    // 2. Store it in a database
    // 3. Send confirmation emails
    // 4. Integrate with your CRM/scheduling system
    // 5. Set up automated follow-up workflows
}

// Add some interactive animations when elements come into view
function observeElements() {
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
    
    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe contact items
    document.querySelectorAll('.contact-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', observeElements);

// Add a simple counter animation for stats
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
                
                if (!isNaN(numericValue)) {
                    let currentValue = 0;
                    const increment = Math.ceil(numericValue / 60); // Animate over ~1 second at 60fps
                    
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= numericValue) {
                            currentValue = numericValue;
                            clearInterval(timer);
                        }
                        target.textContent = currentValue + (finalValue.includes('+') ? '+' : '') + (finalValue.includes('%') ? '%' : '');
                    }, 16); // ~60fps
                }
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// Initialize stat animations
document.addEventListener('DOMContentLoaded', animateStats);

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});
