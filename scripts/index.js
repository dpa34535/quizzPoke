const arrayResposta = [];

const esperaDadoPokemon = async () => {
    addClassSome("#botao-pokemon");

    removeClassSome("#img-pokemon");

    const containerImgPokemon = document.querySelector("#img-pokemon");

    const numero = geraIdPokemon(1, 150);

    const nomePokemon = await getDadosPokemon(numero);
    const nomePokemonDois = await getDadosPokemon(geraIdPokemon(1, 150));
    const nomePokemonTres = await getDadosPokemon(geraIdPokemon(1, 150));

    containerImgPokemon.setAttribute("src", "#");
    containerImgPokemon.setAttribute("src", `https://pokeres.bastionbot.org/images/pokemon/${nomePokemon.id}.png`);

    arrayResposta.push(nomePokemon.name);
    
    alteraNomeOptions(nomePokemon.name, nomePokemonDois.name, nomePokemonTres.name);
};

const alteraNomeOptions = (nomebotaoum, nomebotaodois, nomebotaotres) => {
    removeClassSome("#options");

    const botoes = document.querySelectorAll("#options button");

    const arrayOrderButton = [];

    botoes[0].innerText = nomebotaoum;
    botoes[1].innerText = nomebotaodois;
    botoes[2].innerText = nomebotaotres;

    for(let b = 0; b < 3; b++){
        arrayOrderButton.push(geraIdPokemon(1, 3));
    }

    for(let a = 0; a < arrayOrderButton.length; a++){
        botoes[a].style.order = arrayOrderButton[a];
    }

};

const verificaResposta = (innerTextElemento) => {
    if(innerTextElemento === arrayResposta[0]){
        arrayResposta.pop();
        telaResposta("Você venceu!");
    }
    else{
        arrayResposta.pop();
        telaResposta("Você perdeu!");
    }
};

const telaResposta = (texto) => {
    addClassSome("#options");
    document.querySelector("#img-pokemon").classList.remove("brightness");
    removeClassSome(".resposta");
    document.querySelector(".resposta-Texto").innerText = texto;
};

const removeClassSome = (classe) => {
    const removeClassElemento = document.querySelector(`${classe}`);
    removeClassElemento.classList.remove("somecom");
};

const addClassSome = (classe) => {
    const addClassElemento = document.querySelector(`${classe}`);
    addClassElemento.classList.add("somecom");
};

const addClass = () => {
    addClassSome(".resposta");
    addClassBrightness();
};

const addClassBrightness = () => {
    document.querySelector("#img-pokemon").classList.add("brightness");
    addClassSome("#img-pokemon");
};

const geraIdPokemon = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getDadosPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const res = await response.json();

    return res;
};

document.addEventListener( "click", (e) => {
    const elementoAlvo = e.target;

    if(elementoAlvo.classList.contains("botao-pokemon")){
        esperaDadoPokemon();
    }
    if(elementoAlvo.classList.contains("botao-erro-acerto")){
        verificaResposta(elementoAlvo.innerText);
    }
    if(elementoAlvo.classList.contains("botao-recomecar")){
        addClass();
        esperaDadoPokemon();
    }
});