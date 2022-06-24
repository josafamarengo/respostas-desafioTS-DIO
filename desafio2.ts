enum Profissao {
    Atriz,
    Padeiro
}

interface Pessoa {
    nome: string,
    idade: number,
    profissao: Profissao
}

const pessoa1: Pessoa =  {
    nome: "maria",
    idade: 29,
    profissao: Profissao.Atriz
};

const pessoa2: Pessoa = {
    nome: "roberto",
    idade: 19,
    profissao: Profissao.Padeiro
}


const pessoa3: Pessoa = {
    nome: "laura",
    idade: 32,
    profissao: Profissao.Atriz
};

const pessoa4: Pessoa = {
    nome: "carlos",
    idade: 19,
    profissao: Profissao.Padeiro
}