// Exam Format JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializePage();
    
    // Start countdown timer
    startCountdown();
    
    // Set up event listeners
    setupEventListeners();
});

function initializePage() {
    // Set the exam date (May 14, 2026 at 12:00 PM)
    window.examDate = new Date('May 14, 2026 12:00:00').getTime();
    
    // Update countdown immediately
    updateCountdown();
}

function startCountdown() {
    // Update countdown every second
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = window.examDate - now;
    
    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update display
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    
    if (daysElement) daysElement.textContent = days;
    if (hoursElement) hoursElement.textContent = hours;
    if (minutesElement) minutesElement.textContent = minutes;
    
    // Add leading zeros for single digits
    if (daysElement && days < 10) daysElement.textContent = '0' + days;
    if (hoursElement && hours < 10) hoursElement.textContent = '0' + hours;
    if (minutesElement && minutes < 10) minutesElement.textContent = '0' + minutes;
    
    // Check if exam has passed
    if (distance < 0) {
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.innerHTML = '<div class="exam-passed">Exam Date Has Passed</div>';
        }
    }
}

function setupEventListeners() {
    // Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effects for cards
    const cards = document.querySelectorAll('.overview-card, .structure-card, .big-idea-card, .scoring-card, .task-card, .info-card, .tip-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Add animation for countdown numbers
function animateCountdown() {
    const countdownNumbers = document.querySelectorAll('.countdown-number');
    countdownNumbers.forEach(number => {
        number.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => {
            number.style.animation = '';
        }, 1000);
    });
}

// Add CSS animation for pulse effect
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .exam-passed {
        color: var(--accent-blue);
        font-size: 1.5rem;
        font-weight: 700;
        text-align: center;
        padding: 2rem;
    }
`;
document.head.appendChild(style);

// Add progress tracking for Big Ideas
function updateBigIdeasProgress() {
    const bigIdeaCards = document.querySelectorAll('.big-idea-card');
    bigIdeaCards.forEach(card => {
        const coverageFill = card.querySelector('.coverage-fill');
        if (coverageFill) {
            const width = coverageFill.style.width;
            // Animate the progress bar on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        coverageFill.style.width = '0%';
                        setTimeout(() => {
                            coverageFill.style.width = width;
                        }, 100);
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(card);
        }
    });
}

// Initialize progress animations
document.addEventListener('DOMContentLoaded', function() {
    updateBigIdeasProgress();
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + T to scroll to test date
    if ((event.ctrlKey || event.metaKey) && event.key === 't') {
        event.preventDefault();
        const testDateBanner = document.querySelector('.test-date-banner');
        if (testDateBanner) {
            testDateBanner.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Ctrl/Cmd + S to scroll to scoring section
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        const scoringSection = document.querySelector('.scoring-section');
        if (scoringSection) {
            scoringSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add accessibility improvements
function improveAccessibility() {
    // Add ARIA labels to interactive elements
    const countdownItems = document.querySelectorAll('.countdown-item');
    countdownItems.forEach(item => {
        const number = item.querySelector('.countdown-number');
        const label = item.querySelector('.countdown-label');
        if (number && label) {
            item.setAttribute('aria-label', `${number.textContent} ${label.textContent} until exam`);
        }
    });
    
    // Add focus indicators
    const interactiveElements = document.querySelectorAll('a, button, .card, .tip-card');
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-blue)';
            this.style.outlineOffset = '2px';
        });
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Initialize accessibility improvements
improveAccessibility();

// Add smooth reveal animations for sections
function addRevealAnimations() {
    const sections = document.querySelectorAll('section, .overview-section, .structure-section, .big-ideas-section, .scoring-section, .performance-tasks-section, .test-day-section, .preparation-section');
    
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
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize reveal animations
document.addEventListener('DOMContentLoaded', function() {
    addRevealAnimations();
});

// Export functions for potential external use
window.ExamFormat = {
    updateCountdown,
    startCountdown,
    animateCountdown
}; 