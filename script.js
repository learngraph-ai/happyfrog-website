document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
        
        // Open the first FAQ item by default
        faqItems[0].classList.add('active');
    }
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .benefit, .step, .testimonial, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Add animation classes to CSS
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .benefit, .step, .testimonial, .contact-form {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate, .benefit.animate, .step.animate, .testimonial.animate, .contact-form.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card:nth-child(2), .benefit:nth-child(2), .step:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .feature-card:nth-child(3), .benefit:nth-child(3), .step:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .feature-card:nth-child(4), .benefit:nth-child(4), .step:nth-child(4) {
            transition-delay: 0.6s;
        }
    `;
    document.head.appendChild(style);
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();
    
    // Enhanced form validation with visual feedback
    const form = document.getElementById('lead-form');
    if (form) {
        const formInputs = form.querySelectorAll('input, select, textarea');
        
        // Add focus and blur events for form fields
        formInputs.forEach(input => {
            // Add active class to parent when input is focused
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('active');
            });
            
            // Remove active class when input loses focus
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('active');
                }
                
                // Simple validation
                if (this.hasAttribute('required') && !this.value) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
            });
            
            // Check if field already has a value on page load
            if (input.value) {
                input.parentElement.classList.add('active');
            }
        });
        
        // Form submission handling with better UX
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Validate all required fields
            formInputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value) {
                    input.classList.add('error');
                    isValid = false;
                }
            });
            
            if (!isValid) {
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Please fill out all required fields.';
                errorMessage.style.color = '#f44336';
                errorMessage.style.marginTop = '10px';
                errorMessage.style.fontSize = '0.9rem';
                
                // Remove any existing error messages
                const existingError = form.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                form.appendChild(errorMessage);
                return;
            }
            
            // Show success message with animation
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            button.disabled = true;
            button.innerHTML = '<span class="spinner"></span> Sending...';
            
            // Add spinner style
            const spinnerStyle = document.createElement('style');
            spinnerStyle.textContent = `
                .spinner {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-radius: 50%;
                    border-top-color: white;
                    animation: spin 1s ease-in-out infinite;
                    vertical-align: middle;
                    margin-right: 5px;
                }
                
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(spinnerStyle);
            
            // Simulate server request
            setTimeout(() => {
                // Success state
                button.innerHTML = '<span style="color: white;">✓</span> Message Sent!';
                button.style.backgroundColor = '#4CAF50';
                
                // Reset form
                setTimeout(() => {
                    form.reset();
                    button.disabled = false;
                    button.textContent = originalText;
                    button.style.backgroundColor = '';
                    
                    // Show thank you message
                    const thankYou = document.createElement('div');
                    thankYou.className = 'success-message';
                    thankYou.innerHTML = '<strong>Thank you!</strong> We will contact you shortly.';
                    thankYou.style.color = '#4CAF50';
                    thankYou.style.marginTop = '15px';
                    thankYou.style.padding = '10px';
                    thankYou.style.backgroundColor = '#E8F5E9';
                    thankYou.style.borderRadius = '4px';
                    thankYou.style.textAlign = 'center';
                    
                    // Remove any existing messages
                    const existingMessages = form.querySelectorAll('.error-message, .success-message');
                    existingMessages.forEach(msg => msg.remove());
                    
                    form.appendChild(thankYou);
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        thankYou.style.opacity = '0';
                        thankYou.style.transition = 'opacity 0.5s ease';
                        setTimeout(() => thankYou.remove(), 500);
                    }, 5000);
                }, 1500);
            }, 2000);
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced testimonial slider with controls
    const testimonials = document.querySelectorAll('.testimonial');
    let currentSlide = 0;
    
    if (testimonials.length > 1) {
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'testimonial-dots';
        dotsContainer.style.textAlign = 'center';
        dotsContainer.style.marginTop = '20px';
        
        testimonials.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'testimonial-dot';
            dot.style.width = '12px';
            dot.style.height = '12px';
            dot.style.borderRadius = '50%';
            dot.style.backgroundColor = index === 0 ? '#4CAF50' : '#E0E0E0';
            dot.style.margin = '0 5px';
            dot.style.border = 'none';
            dot.style.cursor = 'pointer';
            dot.style.transition = 'background-color 0.3s ease';
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            
            dotsContainer.appendChild(dot);
        });
        
        const slider = document.querySelector('.testimonials-slider');
        if (slider) {
            slider.parentNode.insertBefore(dotsContainer, slider.nextSibling);
        }
        
        // Function to go to a specific slide
        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
        }
        
        // Update slider and dots
        function updateSlider() {
            const slider = document.querySelector('.testimonials-slider');
            if (slider) {
                slider.scrollTo({
                    left: testimonials[currentSlide].offsetLeft,
                    behavior: 'smooth'
                });
            }
            
            // Update dots
            const dots = document.querySelectorAll('.testimonial-dot');
            dots.forEach((dot, index) => {
                dot.style.backgroundColor = index === currentSlide ? '#4CAF50' : '#E0E0E0';
            });
        }
        
        // Auto-scroll testimonials every 5 seconds
        let autoScroll = setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonials.length;
            updateSlider();
        }, 5000);
        
        // Pause auto-scroll when hovering over testimonials
        const testimonialsSection = document.getElementById('testimonials');
        if (testimonialsSection) {
            testimonialsSection.addEventListener('mouseenter', () => {
                clearInterval(autoScroll);
            });
            
            testimonialsSection.addEventListener('mouseleave', () => {
                autoScroll = setInterval(() => {
                    currentSlide = (currentSlide + 1) % testimonials.length;
                    updateSlider();
                }, 5000);
            });
        }
    }
});
