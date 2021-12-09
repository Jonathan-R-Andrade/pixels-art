function criarLinha(celulasTotais) {
  let linha = document.createElement('div');
  linha.id = 'pixel_line';
  for (let i = 0; i < celulasTotais; i += 1) {
    const celula = document.createElement('div');
    celula.className = 'pixel';
    celula.style.backgroundColor = 'rgb(255,255,255)';
    linha.appendChild(celula);
  }
  return linha;
}

function criarPixelBoard(board, linhasTotais, colunasTotais) {
  if (linhasTotais > 0 && colunasTotais > 0) {
    for (let i = 0; i < linhasTotais; i += 1) {
      board.appendChild(criarLinha(colunasTotais));
    }
  }
}

window.onload = function () {
  // Pegar elementos
  const quadroPixel = document.getElementById('pixel-board');
  const cores = document.getElementsByClassName('color');

  // Criar pixel board
  criarPixelBoard(quadroPixel, 5, 5);

  // Adiciona opcao de selecionar a cor
  function selecionaCor(event) {
    document.querySelector('.color.selected').classList.remove('selected');
    event.target.classList.add('selected');
  }
  for (let i = 0; i < cores.length; i += 1) {
    cores[i].addEventListener('click', selecionaCor);
  }
}