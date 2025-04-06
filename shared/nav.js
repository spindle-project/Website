// Shared Navigation Component
function createNavigation() {
  const navBar = document.getElementById('navBar');
  if (!navBar) return;

  const navHtml = `
    <a class="page-link" href="/"><div id="logoMark">Spindle</div></a>
    <div id="pageOptions">
      <a class="page-link" href="/features">Features</a>
      <a class="page-link" href="/docs">Documentation</a>
      <a class="page-link" href="/exam-prep">Exam Prep</a>
    </div>
  `;

  navBar.innerHTML = navHtml;

  // Add active state to current page
  const currentPath = window.location.pathname;
  const links = navBar.querySelectorAll('.page-link');
  links.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', createNavigation);
