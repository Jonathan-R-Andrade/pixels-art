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

// Muda a cor do pixel clicado
function mudarCorPixel(event) {
  const corSelecionada = document.querySelector('.color.selected');
  const cor = window.getComputedStyle(corSelecionada, null).backgroundColor;
  const pixel = event.target;
  pixel.style.backgroundColor = cor;
}

// Coloar linhas no quadro
function criarPixelBoard(linhasTotais, colunasTotais) {
  const quadroPixel = document.getElementById('pixel-board');
  quadroPixel.innerHTML = '';
  if (linhasTotais > 0 && colunasTotais > 0) {
    for (let i = 0; i < linhasTotais; i += 1) {
      quadroPixel.appendChild(criarLinha(colunasTotais));
    }
  }
  pixels = document.getElementsByClassName('pixel');
  // Adiciona opcao de mudar a cor do pixel
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].addEventListener('click', mudarCorPixel);
  }
}

// Seleciona a cor clicada
function selecionaCor(event) {
  document.querySelector('.color.selected').classList.remove('selected');
  event.target.classList.add('selected');
}

// Limpa o quadro
function limparQuadro() {
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].style.backgroundColor = 'white';
  }
}

// Altera tamanho do quadro
function alterarTamanhoQuadro() {
  const boardSize = document.getElementById('board-size');
  let tamanho = parseInt(boardSize.value, 10);
  if (tamanho.toString() === 'NaN') {
    window.alert('Board inválido!');
  } else {
    if (tamanho < 5) {
      tamanho = 5;
    } else if (tamanho > 50) {
      tamanho = 50;
    }
    criarPixelBoard(tamanho, tamanho);
  }
}

// Gerar cor aleatória
function gerarCor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);
  let cor = 'rgb('.concat(r).concat(', ');
  cor = cor.concat(g).concat(', ');
  cor = cor.concat(b).concat(')');
  return cor;
}

// Trabalhar com os elementos após a página ser carregada
function trabalharComElementos() {
  // Pegar elementos
  const cores = document.getElementsByClassName('color');
  const botaoLimpar = document.getElementById('clear-board');
  const botaoVQV = document.getElementById('generate-board');
  // Criar pixel board
  criarPixelBoard(5, 5);
  // Adiciona opcao de selecionar a cor
  for (let i = 0; i < cores.length; i += 1) {
    cores[i].addEventListener('click', selecionaCor);
  }
  // Define cor aleatória na paleta de cores
  for (let i = 1; i < cores.length; i += 1) {
    cores[i].style.backgroundColor = gerarCor();
  }
  // Adiciona opcao de limpar o quadro
  botaoLimpar.addEventListener('click', limparQuadro);
  // Adiciona opcao de alterar o tamanho do quadro
  botaoVQV.addEventListener('click', alterarTamanhoQuadro);
}

window.onload = trabalharComElementos;
