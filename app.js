//Declaração e atribuição de variáveis
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//Declarando função para economizar linha de texto
function exibirTextoNaTela(tag, texto) { // função com parâmetro e sem retorno
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate:1.2} ); //Faz com que seja lido o que está na tela.
}

//Função que exibe a mensagem inicial
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10:');
}

exibirMensagemInicial();

//Chamamando função do HTML, função sem parâmetro e sem retorno;
function verificarChute() { 
    let chute = document.querySelector('input').value; //value, quero o valor ali armazenado
    
    if(chute == numeroSecreto) {
        exibirTextoNaTela('h1' ,'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p' , mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); //seleciona pelo ID e remove seu atributo
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor.');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }
    tentativas ++;
    limparCampo();
    }
} 

//Função com retorno e sem parâmetro, geração de número aleatório
function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); 
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

   if(quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
   }
   if (listaDeNumerosSorteados.includes(numeroEscolhido)){ //includes verifica o que está na lista
       return gerarNumeroAleatorio();
   } else {
       listaDeNumerosSorteados.push(numeroEscolhido) //push adiciona algo na lista
       console.log(listaDeNumerosSorteados);
       return numeroEscolhido;
   }
}

//Função que limpa o input após errar o número
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);

}