"use strict";

const serverurl = process.env.SERVER_API;

const listaCores = [
  {
    "id": "1",
    "name": "Amarelo"
  },
  {
    "id": "2",
    "name": "Azul"
  },
  {
    "id": "3",
    "name": "Branco"
  },
  {
    "id": "5",
    "name": "Cinza"
  },
  {
    "id": "6",
    "name": "Laranja"
  },
  {
    "id": "7",
    "name": "Verde"
  },
  {
    "id": "8",
    "name": "Vermelho"
  },
  {
    "id": "9",
    "name": "Preto"
  },
  {
    "id": "10",
    "name": "Rosa"
  },
  {
    "id": "11",
    "name": "Vinho"
  }
]

const listaTamanhos = [
  {
    "id": "1",
    "name": "P"
  },
  {
    "id": "2",
    "name": "M"
  },
  {
    "id": "3",
    "name": "G"
  },
  {
    "id": "4",
    "name": "GG"
  },
  {
    "id": "5",
    "name": "U"
  },
  {
    "id": "6",
    "name": "36"
  },
  {
    "id": "7",
    "name": "38"
  },
  {
    "id": "8",
    "name": "40"
  },
  {
    "id": "9",
    "name": "36"
  },
  {
    "id": "10",
    "name": "38"
  },
  {
    "id": "11",
    "name": "40"
  }
]

const listaFxPreco = [
  {
    "id": "1",
    "name": "de R$0 até R$50",
    "value": [0, 50]
  },
  {
    "id": "2",
    "name": "de R$51 até R$150",
    "value": [51, 150]
  },
  {
    "id": "3",
    "name": "de R$151 até R$300",
    "value": [150, 300]
  },
  {
    "id": "4",
    "name": "de R$301 até R$500",
    "value": [301, 500]
  },
  {
    "id": "5",
    "name": "a partir de R$500",
    "value": [501, 999999]
  }
]


let cor = null
let tamanho = null
let fxPreco = [50, 150]

let select = document.querySelector("#ordenar-por");
const value = select.options[select.selectedIndex].value;

const produtoGet = (url) => {
  let request = new XMLHttpRequest()
  request.open("GET", url, false)
  request.send();
  return request.responseText
}

const criaCard = (products) => {
  const card = document.createElement("div");
  card.classList.add("card-container");

  card.innerHTML = `
  <div class="card-info" style="display: flex; align-items:center; flex-direction: column; "
   >
    <img src="${products.image}"/>
    <div style="font-weight: bold;">${products.name}</div>
    <div>R$ ${products.price.toFixed(2)}</div>
    <div style="color: #666666">até ${products.parcelamento[0]}x de R$ ${products.parcelamento[1].toFixed(2)}</div>
    <button 
      onClick="teste()";
      style="background-color: black; 
      color: #fff; 
      height: 2.3rem;
      font-weight: bold;
      width: 100%;
      cursor: pointer"
      >
        COMPRAR
    </button>
  </div>
  `
  return card;
}

const listaCards = (ordenaPor, descAsc) => {
  let data = produtoGet(`http://localhost:5000/products/?_sort=${ordenaPor}&_order=${descAsc}`)
  let products = JSON.parse(data)
  const card = document.querySelector("card");
  products.forEach(element => {
    let dados = criaCard(element);
    card.appendChild(dados)
  });
}

function main(cor) {
  let filtroCor = cor
  let filtroTamanho = null
  let filtroFxPreco = null

  if (cor != null) {
    filtroCor = "&color=" + cor;
  }
  else {
    filtroCor = "";
  }
  if (tamanho != null) {
    filtroTamanho = "&size=" + tamanho;
  }
  else {
    filtroTamanho = "";
  }
  // if(fxPreco =! null){
  //   filtroFxPreco = fxPreco;
  // }
  // else{
  //   filtroFxPreco = "";
  // }

  switch (value) {
    case "maisRecentes":
      returnvv
    case "menorPreco":
      return listaCards("price", `asc&${filtroCor}${filtroTamanho}`);
    case "maiorPreco":
      return listaCards("price", `desc&${filtroCor}${filtroTamanho}`);
    default:
      return listaCards("id", `asc&${filtroCor}${filtroTamanho}`);
  }

}

const filtros = (dados) => {
  console.log(dados)
}

function teste(){
  alert("deu certo")
}

const filtroCores = () => {
  listaCores.forEach(element => {
    var input = document.createElement("input")
    var div = document.createElement("div")

    input.type = "checkbox"
    input.value = `${element.name}`
    input.name = `${element.name}`
    input.addEventListener("click", (event) => {
      filtros(element.name)
    })
    div.innerText = `${element.name}`

    document.getElementById("filtro-cores").appendChild(input);
    document.getElementById("filtro-cores").appendChild(div);
  })
}

const filtroTamanhos = () => {
  listaTamanhos.forEach(element => {
    var input = document.createElement("input")
    var div = document.createElement("div")

    input.type = "radio"
    input.value = `${element.name}`
    input.name = `${element.name}`
    input.id = `${element.id}`
    input.addEventListener("click", (event) => {
      filtros(element.name)
    })
    div.innerText = `${element.name}`

    document.getElementById("filtro-tamanhos").appendChild(input);
    document.getElementById("filtro-tamanhos").appendChild(div);
  })
}

const filtroPreco = () => {
  listaFxPreco.forEach(element => {
    var input = document.createElement("input")
    var div = document.createElement("div")

    input.type = "radio"
    input.value = `${element.value}`
    input.name = `${element.value}`
    input.id = `${element.value}`
    input.addEventListener("click", (event) => {
      filtros(element.name)
    })
    div.innerText = `${element.name}`

    document.getElementById("filtro-precos").appendChild(input);
    document.getElementById("filtro-precos").appendChild(div);
  })
}

main()
filtroCores()
filtroTamanhos()
// filtroPreco()
filtros()