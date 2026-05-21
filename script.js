// Efeito de scroll suave + animação
window.addEventListener('scroll', () => {
  document.querySelectorAll('.crew-card, .arc-card').forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < window.innerHeight - 100) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }
  });
});

// Mensagem ao clicar em qualquer card
document.querySelectorAll('.crew-card').forEach(card => {
  card.addEventListener('click', () => {
    alert("Você é parte da tripulação agora! ☠️");
  });
});
