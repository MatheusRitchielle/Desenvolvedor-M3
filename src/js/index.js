const serverurl = process.env.SERVER_API;

console.log("Dev m3", serverurl);

const titulos = ["maisRecentes", "menorPreco", "maiorPreco"];

function produtoGet(url) {
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
    <div>R$ ${products.price}</div>
    <div style="color: #666666">até ${products.parcelamento[0]}x de ${products.parcelamento[1]}</div>
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
  let data = produtoGet("http://localhost:5000/products/")
  let products = JSON.parse(data)
  const card = document.querySelector("card");
  products.forEach(element => {
    let dados = createCard(element);
    card.appendChild(dados)
  });
}

const ordenaMaiorPreco = () => {
  let data = produtoGet("http://localhost:5000/products/?_sort=price&_order=desc")
  let products = JSON.parse(data)
  const card = document.querySelector("card");
  products.forEach(element => {
    let dados = createCard(element);
    card.appendChild(dados)
  });
}

const ordenaMenorPreco = () => {
  let data = produtoGet("http://localhost:5000/products/?_sort=price&_order=asc")
  let products = JSON.parse(data)
  const card = document.querySelector("card");
  products.forEach(element => {
    let dados = createCard(element);
    card.appendChild(dados)
  });
}

const ordenaRecentes = () => {
  let data = produtoGet("http://localhost:5000/products/?_sort=date&_order=desc")
  let products = JSON.parse(data)
  const card = document.querySelector("card");
  products.forEach(element => {
    let dados = createCard(element);
    card.appendChild(dados)
  });
}

const colorFilter = () => {
  let data = produtoGet("http://localhost:5000/products?color=Preto")//Descobrir como passar as cores para reaproveitar o código.
  let products = JSON.parse(data)
  const card = document.querySelector("card");
  products.forEach(element => {
    let dados = createCard(element);
      card.appendChild(dados)
  });
}

const sizeFilter = () => {
  let data = produtoGet("http://localhost:5000/products?size=M ")
  let products = JSON.parse(data)
  const card = document.querySelector("card");
  products.forEach(element => {
    let dados = createCard(element);
      card.appendChild(dados)
  });
}

const priceFilter = () => {
  let data = produtoGet("http://localhost:5000/products?price=50")
  let products = JSON.parse(data)
  const card = document.querySelector("card");
  products.forEach(element => {
    let dados = createCard(element);
      card.appendChild(dados)
  });
}

main()
