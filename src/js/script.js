// Variáveis que serão usadas posteriormente
let cores;
let botaoLimpar;
let botaoVQV;
let botaoBorracha;
let boardSize;
let pixels;
let botaoMouseClicado = -1;
// Flag de controle da borracha
let borrachaSelecionada = false;
// Última cor selecionada
let ultimaCorSelecionada;

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

// Pintar pixel
function pintarPixel(pixel, cor) {
  const pixelPintado = pixel;
  pixelPintado.style.backgroundColor = cor;
}

// Retorna a cor selecionada na paleta
function obterCorNaPaleta() {
  const corSelecionada = document.querySelector('.selected');
  return window.getComputedStyle(corSelecionada, null).backgroundColor;
}

// Retorna a cor da tinta ou borracha caso selecionada
function obterCorDaTintaOuBorracha() {
  let cor;
  if (borrachaSelecionada) {
    cor = 'white';
  } else {
    cor = obterCorNaPaleta();
  }
  return cor;
}

// Muda a cor do pixel clicado
function mudarCorPixel(event) {
  if (event.button === 0) {
    botaoMouseClicado = event.button;
    pintarPixel(event.target, obterCorDaTintaOuBorracha());
  } else if (event.button === 2) {
    botaoMouseClicado = event.button;
    pintarPixel(event.target, 'white');
  }
}

// Muda a cor do pixel continuamente
function mudarCorPixelContinuamente(event) {
  if (botaoMouseClicado === 0) {
    pintarPixel(event.target, obterCorDaTintaOuBorracha());
  } else if (botaoMouseClicado === 2) {
    pintarPixel(event.target, 'white');
  }
}

// Desativa o click do mouse
function desativarClick() {
  botaoMouseClicado = -1;
}

// Desativa o menu de contexto
function desativarMenuContexto(event) {
  event.preventDefault();
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
    pixels[i].addEventListener('contextmenu', desativarMenuContexto);
    pixels[i].addEventListener('mousedown', mudarCorPixel);
    pixels[i].addEventListener('mouseover', mudarCorPixelContinuamente);
  }
  // Adiciona ouvinte para desativar o click do mouse
  window.addEventListener('mouseup', desativarClick);
}

// Quando chamada remove a classe CSS selected do elemento que a possui
function removerSelected() {
  const selected = document.querySelector('.selected');
  if (selected !== null) {
    selected.classList.remove('selected');
  }
}

// Ativa ou desativa o flag da borracha
function ativaDesativaBorracha(ativar) {
  if (ativar) {
    borrachaSelecionada = true;
    botaoBorracha.classList.add('eraserActive');
  } else {
    borrachaSelecionada = false;
    botaoBorracha.classList.remove('eraserActive');
  }
}

// Seleciona a cor clicada e desativa a borracha
function selecionaCor(event) {
  ativaDesativaBorracha(false);
  removerSelected();
  event.target.classList.add('selected');
}

// Limpa o quadro
function limparQuadro() {
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].style.backgroundColor = 'white';
  }
}

// Ao clicar no botão borracha altera sua aparecia e a cor selecionada
function borrachaClicada() {
  if (borrachaSelecionada) {
    ativaDesativaBorracha(false);
    // Seleciona a última cor
    ultimaCorSelecionada.classList.add('selected');
  } else {
    ativaDesativaBorracha(true);
    // Pega a última cor para selecioná-la novamento quando desativar a borracha
    ultimaCorSelecionada = document.querySelector('.selected');
    // Desseleciona a cor selecionada
    removerSelected();
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
  const rgb = [];
  rgb.push(Math.round(Math.random() * 255));
  rgb.push(Math.round(Math.random() * 255));
  rgb.push(Math.round(Math.random() * 255));
  // Se a cor gerada for 100% branca altera para outra cor que não é branca
  if (rgb[0] === 255 && rgb[1] === 255 && rgb[2] === 255) {
    // Escolhe aleatóriamente se vai alterar a cor red, green ou blue
    const i = Math.round(Math.random() * 2);
    // O floor vai arredondar para baixo evitando o número 255
    rgb[i] = Math.floor(Math.random() * 255);
  }
  // Define uma string com a cor rgb
  let cor = 'rgb('.concat(rgb[0]).concat(', ');
  cor = cor.concat(rgb[1]).concat(', ');
  cor = cor.concat(rgb[2]).concat(')');
  return cor;
}

// Definir cores aleatórias na paleta de cores
function definirCoresNaPaleta() {
  // Armazena as cores geradas para verificar se repetem
  const coresDefinidas = [];
  // Pega a cor selecionada na paleta
  const primeiraCor = obterCorNaPaleta();
  // Coloca a cor no array para não repetir
  coresDefinidas.push(primeiraCor);
  // Inicia do 1 porque a primeira cor(índice 0) é padrão
  for (let i = 1; i < cores.length; i += 1) {
    let cor = null;
    // Enquanto a cor for repetida tentar de novo
    do {
      cor = gerarCor();
    } while (coresDefinidas.indexOf(cor) !== -1);
    // Coloca a cor no array para não repetir
    coresDefinidas.push(cor);
    // Define a cor na paleta
    cores[i].style.backgroundColor = cor;
  }
}

// Adicionar ouvintes
function adicionaOuvintes() {
  // Adiciona ouvinte para selecionar a cor na paleta
  for (let i = 0; i < cores.length; i += 1) {
    cores[i].addEventListener('click', selecionaCor);
  }
  // Adiciona ouvinte para limpar o quadro
  botaoLimpar.addEventListener('click', limparQuadro);
  // Adiciona ouvinte para alterar o tamanho do quadro
  botaoVQV.addEventListener('click', alterarTamanhoQuadro);
  // Adiciona ouvinte para alterar o tamanho do quadro quando apertar "Enter"
  boardSize.addEventListener('keypress', enterApertado);
  // Adiciona ouvinte para ativar a borracha
  botaoBorracha.addEventListener('click', borrachaClicada);
}

// Obter elementos da página
function obterElementos() {
  cores = document.getElementsByClassName('color');
  botaoLimpar = document.getElementById('clear-board');
  botaoVQV = document.getElementById('generate-board');
  botaoBorracha = document.querySelector('.eraser');
  boardSize = document.getElementById('board-size');
}

// Executar o código após a página ser carregada
function executarCodigo() {
  // Pegar elementos
  obterElementos();
  // Criar pixel board
  criarPixelBoard(5, 5);
  // Adicionar ouvintes
  adicionaOuvintes();
  // Definer cores da paleta
  definirCoresNaPaleta();
}

window.onload = executarCodigo;
