// Smooth Scroll para links da navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Efeito na navbar ao rolar
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.backgroundColor = 'rgba(10, 15, 10, 0.98)';
  } else {
    nav.style.backgroundColor = 'rgba(10, 15, 10, 0.95)';
  }
});
