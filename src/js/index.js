"use strict";

let link = "http://localhost:5000/products/";

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
let ordem = null
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

const listaCards = (color, size, price, order, sort) => {
  console.log('chegou na função')
  let colorFilter = color ? `&color=${color}` : '';
  let sizeFilter = size ? `&size=${size}` : '';
  let priceFilter = price ? `&price=${price}` : '';
  let orderFilter = order ? `&_order=${order}` : '';
  let sortFilter = sort ? `?_sort=${sort}` : '';
  let data = produtoGet(`http://localhost:5000/products/${sortFilter}${colorFilter}${sizeFilter}${priceFilter}${orderFilter}`);
  let products = JSON.parse(data)
  const card = document.querySelector("card");
  document.querySelector("card").replaceChildren();
  products.forEach(element => {
    let dados = criaCard(element);
    card.appendChild(dados)
  });
}

function main() {
  switch (value) {
    case "maisRecentes":
      return
    case "menorPreco":
      ordem = 'asc';
      return listaCards(cor, tamanho, '', ordem, 'price');
    case "maiorPreco":
      ordem = 'desc';
      return listaCards(cor, tamanho, '', ordem, 'price');
    default:
      return listaCards(cor, tamanho, '', 'desc', 'id');
  }
}
const filtroCores = () => {
  listaCores.forEach(element => {
    var input = document.createElement("input")
    var div = document.createElement("div")

    input.type = "checkbox"
    input.value = `${element.name}`
    input.name = "filtro-cor"
    
    div.innerText = `${element.name}`

    document.getElementById("filtro-cores").appendChild(input);
    document.getElementById("filtro-cores").appendChild(div);
    input.addEventListener("click", (event) => {
      cor = element.name
    listaCards(cor, tamanho, '', ordem, 'id');
    })
  })

  listaTamanhos.forEach(element => {
    var input = document.createElement("input")
    var div = document.createElement("div")

    input.type = "radio"
    input.value = `${element.name}`
    input.name = `${element.name}`
    input.id = `${element.id}`
    input.addEventListener("click", (event) => {
      tamanho = element.name
      listaCards(cor, tamanho, '', ordem, 'id')
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
      filtros(element.name);
    })
    div.innerText = `${element.name}`

    document.getElementById("filtro-precos").appendChild(input);
    document.getElementById("filtro-precos").appendChild(div);
  })
}

main()
filtroCores()
filtroTamanhos()
filtros()