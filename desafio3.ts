let botaoAtualizar = document.getElementById('atualizar-saldo');
let botaoLimpar = document.getElementById('limpar-saldo')!;
let soma = document.getElementById('soma')! as HTMLInputElement;
let campoSaldo = document.getElementById('campo-saldo');

let total = 0

limparSaldo()

function somarAoSaldo(soma: number) {
    if(campoSaldo) {
        total += soma
        campoSaldo.innerHTML = total.toString();
        limparCampoSoma();
    }
}

function limparCampoSoma() {
    soma.value = "";
}

function limparSaldo() {
    if(campoSaldo) {
        total = 0;
        campoSaldo.innerHTML = total.toString();
    }
}

if(botaoAtualizar){

    botaoAtualizar.addEventListener('click', function () {
        somarAoSaldo(Number(soma.value));
    });

}


botaoLimpar.addEventListener('click', function () {
    limparSaldo();
});