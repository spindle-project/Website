// Combined Navigation Component for Spindle
function createNavigation() {
  const navBar = document.getElementById('navBar');
  if (!navBar) return;

  const navHtml = `
    <a class="page-link" href="/"><div id="logoMark">Spindle</div></a>
    <div id="pageOptions">
      <a class="page-link" href="/ide">IDE</a>
      <a class="page-link" href="/docs">Docs</a>
      <a class="page-link" href="/study">Learn</a>
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

// Insert footer at the bottom of every page
const footer = document.createElement('footer');
footer.style = 'width: 100%; text-align: center; padding: 1.2rem 0; font-size: 0.98rem; color: var(--text-secondary); background: var(--md-sys-color-surface-container-low); margin-top: 3rem;';
footer.innerHTML = `
  <div style="margin-bottom: 0.4rem;">
    AP® is a trademark registered by the College Board, which is not affiliated with, and does not endorse, this product/site.
  </div>
  <a href="https://www.instagram.com/the_spindle_project/" target="_blank" rel="noopener" style="color: var(--accent-blue); text-decoration: underline; font-weight: 500;">Follow us on Instagram</a>
`;
document.body.appendChild(footer); 