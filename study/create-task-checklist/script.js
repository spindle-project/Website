// Create Task Guide JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializePage();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load saved progress
    loadProgress();
});

function initializePage() {
    // Set up checkboxes with unique IDs if they don't exist
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
        if (!checkbox.id) {
            checkbox.id = `requirement-${index + 1}`;
        }
    });
    
    // Update progress display
    updateProgress();
}

function setupEventListeners() {
    // Add event listeners to all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            handleCheckboxChange(this);
        });
    });
    
    // Add event listener to reset button
    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
        resetButton.addEventListener('click', resetProgress);
    }
    
    // Add click event listeners to labels for better UX
    const labels = document.querySelectorAll('.requirement-item label');
    labels.forEach(label => {
        label.addEventListener('click', function() {
            const checkbox = this.previousElementSibling;
            if (checkbox && checkbox.type === 'checkbox') {
                checkbox.checked = !checkbox.checked;
                handleCheckboxChange(checkbox);
            }
        });
    });
}

function handleCheckboxChange(checkbox) {
    const requirementItem = checkbox.closest('.requirement-item');
    
    if (checkbox.checked) {
        requirementItem.classList.add('completed');
        requirementItem.setAttribute('data-completed', 'true');
    } else {
        requirementItem.classList.remove('completed');
        requirementItem.setAttribute('data-completed', 'false');
    }
    
    // Save progress to localStorage
    saveProgress();
    
    // Update progress display
    updateProgress();
    
    // Add visual feedback
    addVisualFeedback(checkbox);
}

function addVisualFeedback(checkbox) {
    // Add a brief animation or visual feedback
    if (checkbox.checked) {
        checkbox.style.transform = 'scale(1.1)';
        setTimeout(() => {
            checkbox.style.transform = 'scale(1)';
        }, 200);
    }
}

function updateProgress() {
    const totalRequirements = document.querySelectorAll('input[type="checkbox"]').length;
    const completedRequirements = document.querySelectorAll('input[type="checkbox"]:checked').length;
    const progressPercentage = (completedRequirements / totalRequirements) * 100;
    
    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = `${progressPercentage}%`;
    }
    
    // Update progress text
    const completedCount = document.getElementById('completedCount');
    const totalCount = document.getElementById('totalCount');
    
    if (completedCount) {
        completedCount.textContent = completedRequirements;
    }
    if (totalCount) {
        totalCount.textContent = totalRequirements;
    }
    
    // Add motivational messages based on progress
    updateMotivationalMessage(progressPercentage);
}

function updateMotivationalMessage(percentage) {
    const progressSection = document.querySelector('.progress-section');
    let message = '';
    
    if (percentage === 0) {
        message = 'Get started! Check off requirements as you complete them.';
    } else if (percentage < 25) {
        message = 'Great start! Keep going, you\'re making progress.';
    } else if (percentage < 50) {
        message = 'You\'re almost halfway there! Keep up the good work.';
    } else if (percentage < 75) {
        message = 'Excellent progress! You\'re in the home stretch.';
    } else if (percentage < 100) {
        message = 'Almost done! Just a few more requirements to go.';
    } else {
        message = '🎉 Congratulations! You\'ve completed all requirements!';
    }
    
    // Update or create motivational message element
    let messageElement = progressSection.querySelector('.motivational-message');
    if (!messageElement) {
        messageElement = document.createElement('p');
        messageElement.className = 'motivational-message';
        messageElement.style.marginTop = '1rem';
        messageElement.style.fontStyle = 'italic';
        messageElement.style.color = 'var(--text-secondary)';
        progressSection.appendChild(messageElement);
    }
    messageElement.textContent = message;
}

function saveProgress() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const progress = {};
    
    checkboxes.forEach(checkbox => {
        progress[checkbox.id] = checkbox.checked;
    });
    
    localStorage.setItem('createTaskProgress', JSON.stringify(progress));
}

function loadProgress() {
    const savedProgress = localStorage.getItem('createTaskProgress');
    
    if (savedProgress) {
        try {
            const progress = JSON.parse(savedProgress);
            
            Object.keys(progress).forEach(checkboxId => {
                const checkbox = document.getElementById(checkboxId);
                if (checkbox) {
                    checkbox.checked = progress[checkboxId];
                    const requirementItem = checkbox.closest('.requirement-item');
                    if (progress[checkboxId]) {
                        requirementItem.classList.add('completed');
                        requirementItem.setAttribute('data-completed', 'true');
                    }
                }
            });
            
            updateProgress();
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    }
}

function resetProgress() {
    // Show confirmation dialog
    if (confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
        // Uncheck all checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            const requirementItem = checkbox.closest('.requirement-item');
            requirementItem.classList.remove('completed');
            requirementItem.setAttribute('data-completed', 'false');
        });
        
        // Clear localStorage
        localStorage.removeItem('createTaskProgress');
        
        // Update progress display
        updateProgress();
        
        // Show reset confirmation
        showNotification('Progress reset successfully!', 'success');
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = '8px';
    notification.style.color = 'white';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '1000';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#10b981';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            break;
        case 'warning':
            notification.style.backgroundColor = '#f59e0b';
            break;
        default:
            notification.style.backgroundColor = 'var(--accent-blue)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + R to reset progress
    if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        event.preventDefault();
        resetProgress();
    }
    
    // Space bar to toggle checkboxes when focused
    if (event.key === ' ' && document.activeElement.type === 'checkbox') {
        event.preventDefault();
        document.activeElement.checked = !document.activeElement.checked;
        handleCheckboxChange(document.activeElement);
    }
});

// Add accessibility improvements
function improveAccessibility() {
    // Add ARIA labels to checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
        const label = checkbox.nextElementSibling;
        if (label) {
            checkbox.setAttribute('aria-label', label.textContent);
        }
    });
    
    // Add keyboard navigation
    const requirementItems = document.querySelectorAll('.requirement-item');
    requirementItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                const checkbox = this.querySelector('input[type="checkbox"]');
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    handleCheckboxChange(checkbox);
                }
            }
        });
    });
}

// Initialize accessibility improvements
improveAccessibility();

// Export functions for potential external use
window.CreateTaskGuide = {
    resetProgress,
    saveProgress,
    loadProgress,
    updateProgress
}; 