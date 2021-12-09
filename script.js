// Declara pixels para ser usado posteriormente
let pixels;

// Fazer linhas do quadro
function criarLinha(celulasTotais) {
  const linha = document.createElement('div');
  linha.id = 'pixel_line';
  for (let i = 0; i < celulasTotais; i += 1) {
    const celula = document.createElement('div');
    celula.className = 'pixel';
    celula.style.backgroundColor = 'white';
    linha.appendChild(celula);
  }
  return linha;
}

// Coloar linhas no quadro
function criarPixelBoard(board, linhasTotais, colunasTotais) {
  if (linhasTotais > 0 && colunasTotais > 0) {
    for (let i = 0; i < linhasTotais; i += 1) {
      board.appendChild(criarLinha(colunasTotais));
    }
  }
}

// Seleciona a cor clicada
function selecionaCor(event) {
  document.querySelector('.color.selected').classList.remove('selected');
  event.target.classList.add('selected');
}

// Muda a cor do pixel clicado
function mudarCorPixel(event) {
  const corSelecionada = document.querySelector('.color.selected');
  const cor = window.getComputedStyle(corSelecionada, null).backgroundColor;
  const pixel = event.target;
  pixel.style.backgroundColor = cor;
}

// Limpa o quadro
function limparQuadro() {
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].style.backgroundColor = 'white';
  }
}

// Trabalhar com os elementos após a página ser carregada
function trabalharComElementos() {
  // Pegar elementos
  const quadroPixel = document.getElementById('pixel-board');
  const cores = document.getElementsByClassName('color');
  const botaoLimpar = document.getElementById('clear-board');
  pixels = document.getElementsByClassName('pixel');
  // Criar pixel board
  criarPixelBoard(quadroPixel, 5, 5);
  // Adiciona opcao de selecionar a cor
  for (let i = 0; i < cores.length; i += 1) {
    cores[i].addEventListener('click', selecionaCor);
  }
  // Adiciona opcao de mudar a cor do pixel
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].addEventListener('click', mudarCorPixel);
  }
  // Adiciona opcao de limpar o quadro
  botaoLimpar.addEventListener('click', limparQuadro);
}

window.onload = trabalharComElementos;
