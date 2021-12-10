// Variáveis que serão usadas posteriormente
let cores;
let botaoLimpar;
let botaoVQV;
let boardSize;
let pixels;
let mouseClicado = false;

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
  if (event.button === 0) {
    mouseClicado = true;
    const corSelecionada = document.querySelector('.color.selected');
    const cor = window.getComputedStyle(corSelecionada, null).backgroundColor;
    const pixel = event.target;
    const corPixel = window.getComputedStyle(pixel, null).backgroundColor;
    if (corPixel === 'rgb(255, 255, 255)') {
      pixel.style.backgroundColor = cor;
    } else if (corPixel !== cor) {
      pixel.style.backgroundColor = cor;
    } else {
      pixel.style.backgroundColor = 'white';
    }
  }
}

// Muda a cor do pixel continuamente
function mudarCorPixelContinuamente(event) {
  if (mouseClicado) {
    mudarCorPixel(event);
  }
}

// Desativa o click do mouse ao sair do quadro
function desativarClick() {
  mouseClicado = false;
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
  // Adiciona ouvinte para mudar a cor do pixel
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].addEventListener('mousedown', mudarCorPixel);
    pixels[i].addEventListener('mouseover', mudarCorPixelContinuamente);
  }
  // Adiciona ouvinte para desativar o click do mouse
  quadroPixel.addEventListener('mouseleave', desativarClick);
  window.addEventListener('mouseup', desativarClick);
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

// Altera tamanho do quadro apertando enter
function enterApertado(event) {
  if (event.key === 'Enter') {
    alterarTamanhoQuadro();
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

// Adicionar ouvintes
function adicionaOuvintes() {
  // Adiciona opcao de selecionar a cor
  for (let i = 0; i < cores.length; i += 1) {
    cores[i].addEventListener('click', selecionaCor);
  }
  // Define cor aleatória na paleta de cores
  for (let i = 1; i < cores.length; i += 1) {
    cores[i].style.backgroundColor = gerarCor();
  }
  // Adiciona ouvinte para limpar o quadro
  botaoLimpar.addEventListener('click', limparQuadro);
  // Adiciona ouvinte para alterar o tamanho do quadro
  botaoVQV.addEventListener('click', alterarTamanhoQuadro);
  // Adiciona ouvinte para alterar o tamanho do quadro quando apertar "Enter"
  boardSize.addEventListener('keypress', enterApertado);
}

// Trabalhar com os elementos após a página ser carregada
function trabalharComElementos() {
  // Pegar elementos
  cores = document.getElementsByClassName('color');
  botaoLimpar = document.getElementById('clear-board');
  botaoVQV = document.getElementById('generate-board');
  boardSize = document.getElementById('board-size');
  // Criar pixel board
  criarPixelBoard(5, 5);
  // Adicionar ouvintes
  adicionaOuvintes();
}

window.onload = trabalharComElementos;
