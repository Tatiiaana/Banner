var products = [
  { name: 'bag', price: 99, image: 'images/bag.png', like: true },
  { name: 'top', price: 15, image: 'images/top.png', like: false },
  { name: 'shoes', price: 99, image: 'images/shoes.png', like: false },
];

var container = document.getElementById('container');

products.forEach(function(product) {
  var elementProduct = document.createElement('div');
  elementProduct.setAttribute('id', product.name);
  var imagesProduct = document.createElement('img');
  imagesProduct.setAttribute('src', product.image);
  var namesProduct = document.createElement('h1');
  namesProduct.setAttribute('id', product.name);
  namesProduct.textContent = product.name;

  var btn = document.createElement('button');
  var textBtn = document.createTextNode('ADD TO BASKET');
  btn.setAttribute('id', product);

  var like = document.createElement('i');
  like.setAttribute('class', 'far fa-heart');

  function btnBuy() {
    document.getElementById('basket').style.color = 'darkred';
    console.log("Je mets l'article dans mon panier");
  }
  btn.addEventListener('click', function() {
    btnBuy();
  });

  function btnLike() {
    like.setAttribute('class', 'fas fa-heart');
    document.getElementsByTagName('i').className = 'fas fa-heart';
    console.log("J'aime cet article");
    //window.location.href = 'http://www.google.com';
  }
  like.addEventListener('click', function() {
    btnLike();
  });

  container.appendChild(elementProduct);
  elementProduct.appendChild(imagesProduct);
  elementProduct.appendChild(like);
  elementProduct.appendChild(namesProduct);
  elementProduct.appendChild(btn);

  btn.appendChild(textBtn);
});

var basketProduct = document.getElementById('basket');

var basket = document.createElement('i');
basket.setAttribute('class', 'fas fa-shopping-bag');

container.appendChild(basketProduct);
basketProduct.appendChild(basket);

basket.addEventListener('click', function() {
  btnBasket();
});

console.log($);

//-----------------------------------------------------

$.get('http://localhost:3000/', function(response, error) {
  console.log(response);
});

$.post('ajax/index.html', function(data) {
  $('.result').html(data);
});
