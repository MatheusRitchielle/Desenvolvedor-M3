"use strict";

const serverurl = process.env.SERVER_API;

console.log("Dev m3", serverurl);


function produtoGet(url) {
  let request = new XMLHttpRequest()
  request.open("GET", url, false)
  request.send();
  return request.responseText
}

const criaCard = (produtos) => {
  const card = document.createElement("div");
  card.classList.add("card-container");

  card.innerHTML = `
  <div class="card-info" style="display:flex; justify-self: center; flex-direction: column">
  <a href="#" class="card-image"
  > 
  <img src=${produtos.image}>
  </a>
    <div>R$ ${produtos.price}<div>
    <div>até ${produtos.parcelamento[0]}x de ${produtos.parcelamento[1]}<div>
    <button 
      style="background-color: black; 
      color: #fff; 
      width: 100%;
      cursor: pointer"
      >
        COMPRAR
    </button>
  </div>
  `
  return card;
}

const main = () => {
  let data = produtoGet("http://localhost:5000/products")
  let  produtos = JSON.parse(data)
  const card = document.querySelector("card");
  
  produtos.forEach(element => {
    let dados = criaCard(element);
    card.appendChild(dados)
  });
  console.log(produtos)

}

main()