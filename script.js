const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const p1HealthEl = document.getElementById('p1health');
const p2HealthEl = document.getElementById('p2health');

// Classe do Lutador
class Fighter {
  constructor(x, color, keys, isPlayer2 = false) {
    this.x = x;
    this.y = 300;
    this.width = 60;
    this.height = 120;
    this.color = color;
    this.velocityX = 0;
    this.velocityY = 0;
    this.health = 100;
    this.isAttacking = false;
    this.attackCooldown = 0;
    this.isPlayer2 = isPlayer2;
    this.keys = keys;
    this.facingRight = !isPlayer2;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Cabeça simples (pra ficar mais legal)
    ctx.fillStyle = '#ffdbac';
    ctx.fillRect(this.x + 15, this.y - 20, 30, 30);
  }

  update() {
    // Gravidade
    this.velocityY += 0.8;
    this.y += this.velocityY;
    this.x += this.velocityX;

    // Chão
    if (this.y >= 300) {
      this.y = 300;
      this.velocityY = 0;
    }

    // Limites da tela
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > 800) this.x = 800 - this.width;

    // Ataque
    if (this.attackCooldown > 0) this.attackCooldown--;

    this.draw();
  }

  attack() {
    if (this.attackCooldown > 0) return;
    this.isAttacking = true;
    this.attackCooldown = 15;

    setTimeout(() => this.isAttacking = false, 200);
  }
}

// Criando os lutadores
const player1 = new Fighter(200, '#00aaff', {
  left: 'a', right: 'd', up: 'w', attack: 'j', kick: 'k'
});

const player2 = new Fighter(500, '#ff00aa', {
  left: 'ArrowLeft', right: 'ArrowRight', up: 'ArrowUp', attack: '1', kick: '2'
}, true);

// Teclas pressionadas
const keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

function checkCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background simples
  ctx.fillStyle = '#112233';
  ctx.fillRect(0, 0, 800, 500);
  ctx.fillStyle = '#223344';
  ctx.fillRect(0, 380, 800, 120);

  // Controles Player 1
  player1.velocityX = 0;
  if (keys[player1.keys.left]) { player1.velocityX = -6; player1.facingRight = false; }
  if (keys[player1.keys.right]) { player1.velocityX = 6; player1.facingRight = true; }
  if (keys[player1.keys.up] && player1.y >= 300) player1.velocityY = -18;
  if (keys[player1.keys.attack]) player1.attack();
  if (keys[player1.keys.kick]) player1.attack();

  // Controles Player 2
  player2.velocityX = 0;
  if (keys[player2.keys.left]) { player2.velocityX = -6; player2.facingRight = false; }
  if (keys[player2.keys.right]) { player2.velocityX = 6; player2.facingRight = true; }
  if (keys[player2.keys.up] && player2.y >= 300) player2.velocityY = -18;
  if (keys[player2.keys.attack]) player2.attack();
  if (keys[player2.keys.kick]) player2.attack();

  player1.update();
  player2.update();

  // Sistema de ataque
  if (player1.isAttacking && checkCollision(player1, player2)) {
    player2.health -= 0.5;
  }
  if (player2.isAttacking && checkCollision(player2, player1)) {
    player1.health -= 0.5;
  }

  // Atualiza HUD
  p1HealthEl.textContent = Math.max(0, Math.floor(player1.health));
  p2HealthEl.textContent = Math.max(0, Math.floor(player2.health));

  // Fim de jogo
  if (player1.health <= 0 || player2.health <= 0) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, 800, 500);
    ctx.font = '50px Arial';
    ctx.fillStyle = '#ff00ff';
    ctx.textAlign = 'center';
    ctx.fillText(player1.health <= 0 ? 'PLAYER 2 VENCEU!' : 'PLAYER 1 VENCEU!', 400, 250);
    return;
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
