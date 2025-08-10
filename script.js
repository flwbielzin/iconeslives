// Efeitos de interação para os ícones das redes sociais
document.addEventListener("DOMContentLoaded", function () {
  const iconContainers = document.querySelectorAll(".icon-container");

  // Sequência de animação especial
  startEntranceSequence(iconContainers);
});

// Função para iniciar sequência de entrada
function startEntranceSequence(containers) {
  containers.forEach((container, index) => {
    // Inicia com opacidade 0
    container.style.opacity = "0";

    // Adiciona classe de animação com delay
    setTimeout(() => {
      container.classList.add("entrance-animation");
      container.style.opacity = "1";
    }, index * 300);

    // Inicia o ciclo de rotação após 5 segundos
    startRotationCycle(container, 5000 + index * 300);
  });
}

// Função para controlar o ciclo de rotação
function startRotationCycle(container, initialDelay) {
  setTimeout(() => {
    // Adiciona classe para girar
    container.classList.add("start-rotation");

    // Remove a classe após 3 segundos (uma volta completa)
    setTimeout(() => {
      container.classList.remove("start-rotation");

      // Reinicia o ciclo após 5 segundos
      startRotationCycle(container, 5000);
    }, 3000);
  }, initialDelay);
}
