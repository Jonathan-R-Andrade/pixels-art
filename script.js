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
  const pixelBoard = document.getElementById('pixel-board');

  // Criar pixel board
  criarPixelBoard(pixelBoard, 5, 5);
}