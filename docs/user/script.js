// Function to copy code to clipboard and navigate to IDE
function runCode(codeElement, filename = 'main.spdl') {
  // Get the code content
  const code = codeElement.textContent || codeElement.innerText;
  
  // Copy to clipboard
  navigator.clipboard.writeText(code).then(() => {
    console.log('Code copied to clipboard');
    
    // Show a brief notification
    showNotification('Code copied! Loading into IDE...');
    
    // Encode the code for URL parameter
    const encodedCode = encodeURIComponent(code);
    
    // Navigate to the text IDE with the code as a URL parameter
    setTimeout(() => {
      window.location.href = `/ide/text/?code=${encodedCode}`;
    }, 1000);
  }).catch(err => {
    console.error('Failed to copy code: ', err);
    showNotification('Failed to copy code. Please try again.');
  });
}

// Function to show a notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: var(--md-sys-color-primary-container);
    color: var(--md-sys-color-on-primary-container);
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    font-size: 0.9rem;
    font-weight: 500;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  notification.textContent = message;
  
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

// Function to initialize all code containers
function initializeCodeContainers() {
  // Find all code containers
  const codeContainers = document.querySelectorAll('.code-container');
  
  codeContainers.forEach(container => {
    const runButton = container.querySelector('.run-button');
    const codeElement = container.querySelector('code');
    
    if (runButton && codeElement) {
      runButton.addEventListener('click', (e) => {
        e.preventDefault();
        runCode(codeElement);
      });
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCodeContainers); 