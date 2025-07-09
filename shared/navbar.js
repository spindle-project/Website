// Shared Navbar Component for Spindle
function createNavbar() {
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

document.addEventListener('DOMContentLoaded', createNavbar); 