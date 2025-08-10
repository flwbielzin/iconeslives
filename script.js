// Efeitos de interação para os ícones das redes sociais
document.addEventListener("DOMContentLoaded", function () {
  const iconContainers = document.querySelectorAll(".icon-container");

  // Adiciona efeito de clique
  iconContainers.forEach((container) => {
    container.addEventListener("click", function () {
      // Efeito de ripple
      createRippleEffect(this, event);

      // Efeito de bounce
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });

  // Sequência de animação especial
  startEntranceSequence(iconContainers);
});

// Função para iniciar sequência de entrada
function startEntranceSequence(containers) {
  containers.forEach((container, index) => {
    // Inicia com opacidade 0
    container.style.opacity = "0";
    container.style.transform = "scale(0.5) translateY(50px)";
    
    // Adiciona classe de animação com delay
    setTimeout(() => {
      container.classList.add("entrance-animation");
      container.style.opacity = "1";
    }, index * 300);
    
    // Remove classe após animação e inicia efeitos normais
    setTimeout(() => {
      container.classList.remove("entrance-animation");
      startNormalEffects(container);
    }, 8000 + (index * 300));
  });
}

// Função para iniciar efeitos normais
function startNormalEffects(container) {
  // Inicia o loop de partículas
  startParticleLoop(container);
  
  // Adiciona animações normais
  const icon = container.querySelector('.social-icon');
  const username = container.querySelector('.username');
  
  // Restaura animações originais
  if (container.classList.contains('twitch')) {
    icon.style.animation = 'twitchPulse 2s ease-in-out infinite';
  } else if (container.classList.contains('instagram')) {
    icon.style.animation = 'instagramRotate 3s ease-in-out infinite';
  } else if (container.classList.contains('x-twitter')) {
    icon.style.animation = 'xFloat 2.5s ease-in-out infinite';
  }
}

// Função para criar efeito de ripple
function createRippleEffect(element, event) {
  const ripple = document.createElement("div");
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1000;
    `;

  element.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Função para criar efeito de partículas
function createParticleEffect(element) {
  const particleCount = 4; // Reduzido para ser mais sutil
  const rect = element.getBoundingClientRect();

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    const angle = (i / particleCount) * Math.PI * 2;

    particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: ${getRandomColor()};
            border-radius: 50%;
            left: ${rect.width / 2}px;
            top: ${rect.height / 2}px;
            pointer-events: none;
            z-index: 999;
        `;

    element.appendChild(particle);

    // Animação da partícula mais suave
    const animation = particle.animate(
      [
        {
          transform: "translate(0, 0) scale(1)",
          opacity: 0.8,
        },
        {
          transform: `translate(${Math.cos(angle) * 30}px, ${
            Math.sin(angle) * 30
          }px) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: 1500,
        easing: "ease-out",
      }
    );

    animation.onfinish = () => particle.remove();
  }
}

// Função para gerar cores aleatórias
function getRandomColor() {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
    "#98D8C8",
    "#F7DC6F",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Função para iniciar loop contínuo de partículas
function startParticleLoop(container) {
  setInterval(() => {
    createParticleEffect(container);
  }, 1200); // Cria partículas a cada 1.2 segundos para ser mais fluido
}

// Adiciona CSS para a animação de ripple
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Efeito de movimento suave com o mouse
document.addEventListener("mousemove", function (e) {
  const containers = document.querySelectorAll(".icon-container");
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  containers.forEach((container, index) => {
    const offsetX = (mouseX - 0.5) * (index + 1) * 5;
    const offsetY = (mouseY - 0.5) * (index + 1) * 3;

    container.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });
});

// Remove o efeito de movimento quando o mouse para
let mouseTimeout;
document.addEventListener("mousemove", function () {
  clearTimeout(mouseTimeout);
  mouseTimeout = setTimeout(() => {
    const containers = document.querySelectorAll(".icon-container");
    containers.forEach((container) => {
      container.style.transform = "";
    });
  }, 100);
});
