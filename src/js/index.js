const btnteste = document.getElementById(".ver-cores");

function teste(){
  alert("Agora foi")
}

const produtoGet = (url) => {
  let request = new XMLHttpRequest()
  request.open("GET", url, false)
  request.send();
  return request.responseText
}

const createCard = (products) => {
  const card = document.createElement("div");
  card.classList.add("card-container");

  card.innerHTML = `
  <div class="card-info" style="display: flex; align-items:center; flex-direction: column;"
   >
    <img src="${products.image}"/>
    <div style="font-weight: bold;">R$ ${products.price}</div>
    <div style="color: #666666">até ${products.parcelamento[0]}x de R$ ${products.parcelamento[1]}</div>
    <button 
      style="background-color: black; 
      color: #fff; 
      height: 2.3rem;
      font-weight: bold;
      width: 100%;
      cursor: pointer"
      >
      <script>saveCarShop()</script>
        COMPRAR
    </button>
  </div>
  `
  return card;
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
  var filtroOrdenacao = "date"//||price
  var maiorMenor = "desc" //|| asc
  var filtroCor = "Rosa"
  var filtroTamanho = "P"

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

const filterPrice = (precoMin, precoMax) => {
  precoMin = 0;
  precoMax = 50;

  let data = produtoGet(`http://localhost:5000/products/?price>${precoMin}&price>${precoMax}`)
  let products = JSON.parse(data)
  const card = document.querySelector("card");
  products.forEach(element => {
    let dados = createCard(element);
    card.appendChild(dados)
  });
}

main()

//