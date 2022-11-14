const produtoGet = (url) => {
  let request = new XMLHttpRequest()
  request.open("GET", url, false)
  request.send();
  return request.responseText
}

const createCard = (products) => {
  const card = document.createElement("div");
  card.classList.add("card-container");//verificar se removendo essa parte a organização dos products vai ser feita

  card.innerHTML = `
  <div class="card-info" style="display: flex; align-items:center; flex-direction: column;"
   >
    <img src="${products.image}"/>
    <div style="font-weight: bold;">R$ ${products.price}</div>
    <div style="color: #666666">até ${products.parcelamento[0]}x de R$ ${products.parcelamento[1]}</div>
    <button 
      onClick="saveCarShop()";
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

const sortCard = () => {
  const boxSort = document.createElement("div");

  boxSort.innerHTML = `
    <select name="OrdenarPor" id="OrdenarPor">
      <option value="" disabled selected>Ordenar por:</option>
      <option value="maisRecentes">Mais Recentes</option>
      <option value="menorPreco">Menor Preço</option>
      <option value="maiorPreco">Maior Preço</option>
    </select>
  `;


}

const main = () => {
  let data = produtoGet(`http://localhost:5000/products`)
  let products = JSON.parse(data)
  const card = document.querySelector("card");
  products.forEach(element => {
    let dados = createCard(element);
    card.appendChild(dados)
  });
}

const filter = (filtroOrdenacao, maiorMenor, filtroCor, filtroTamanho) => {
  var filtroOrdenacao = "date"
  var maiorMenor = "desc"
  var filtroCor = "Rosa"
  var filtroTamanho = "GG"

  if (filtroOrdenacao === "date") {
    ordenaPor = "date"
    descAsc = "desc"
  }
  else if (filtroOrdenacao === "price") {
    ordenaPor = "price"
    if (maiorMenor === "asc") {
      descAsc = "asc"
    } else {
      descAsc = "desc"
    }
  }


  let data = produtoGet(`http://localhost:5000/products/?_sort=${ordenaPor}&_order=${descAsc}&color=${filtroCor}&size=${filtroTamanho}`)
  let products = JSON.parse(data)
  const card = document.querySelector("card");
  products.forEach(element => {
    let dados = createCard(element);
    card.appendChild(dados)
  });
}

filter()