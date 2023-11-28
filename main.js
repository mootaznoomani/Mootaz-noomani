function generateID() {
  var count = 0;
   return function () {
     return count++;
  };
}
var id=generateID()

function makeaccount(address, password) {
  var obj = {};
  obj.address = address;
  obj.password = password;
  return obj;
}
function makeproduct(name,image,price) {
  var obj = {};
  obj.id=id()
  obj.name = name;
  obj.image = image;
  obj.price = price;
  return obj;
}

function Makeshop() {
  var obj = {};
  obj.list = [];
  obj.listProduct = [];
  obj.addProduct=function(name,image,price) {
    var p = makeproduct(name,image,price);
    this.listProduct.push(p);
  };
  obj.addPerson = function(address, password) {
    var p = makeaccount(address, password);
    this.list.push(p);
  };
  return obj;
}

var person = Makeshop();
person.addPerson('mootaz@gmail.com', '123456');
person.addProduct('ebay gift card','https://dundle.com/cdn-cgi/image/format=auto,width=110,fit=cover,quality=85/https://cdn.dundle.com/resources/images/products/480w/ebay-480w.png','10.00')
person.addProduct('roblox gift card','https://dundle.com/cdn-cgi/image/format=auto,width=110,fit=cover,quality=85/https://cdn.dundle.com/resources/images/products/480w/roblox-480w.png','5.00')
person.addProduct('free fire gift card','https://dundle.com/cdn-cgi/image/format=auto,width=110,fit=cover,quality=85/https://cdn.dundle.com/resources/images/products/480w/free-fire-diamonds-480w.png','25.00')
person.addProduct('apple gift card','https://dundle.com/cdn-cgi/image/format=auto,width=110,fit=cover,quality=85/https://cdn.dundle.com/resources/images/products/480w/itunes-480w.png','40.00')
$('#login').on('click', function() {
  const add = $('#address').val();
  const pass = $('#password').val();
  let loggedIn = false;

  for (let index = 0; index < person.list.length; index++) {
    if (add === person.list[index].address && pass === person.list[index].password) {
      loggedIn = true;
      break;
    }
  }

  if (loggedIn) {
    window.location.href = 'card.html';
  } else {
    $('#password').css({'border-color': 'red'});
    $('#address').css({'border-color': 'red'});
    $('#erreur').append('<p>Address or Password incorrect')
  }
});

 
function displayall(){
  $(".cards-container").empty()
  for (let index = 0; index < person.listProduct.length; index++) {
    $('.cards-container').append(`<div class="card" >
    <img src="${person.listProduct[index].image}" id='imagesize'>
    <h2>${person.listProduct[index].name}</h2>
    <p>$ ${person.listProduct[index].price}</p>
    <button class="buy" id="${person.listProduct[index].id}">Buy Now</button>
  </div>`)
  }
}
displayall()
console.log(person.listProduct)
let total = 0;
$('.buy').click(function() {
  const id= $(this).attr('id');
  console.log(id)
  for (let index = 0; index < person.listProduct.length; index++) {
      if(person.listProduct[index].id == id){
          total+=parseInt(person.listProduct[index].price);
          $('.cart-items').append(`<li><div><p>${person.listProduct[index].name} - ${person.listProduct[index].price}</p> <img src='remove-ellipse-svgrepo-com.svg' id="remove"><div></li> `);
      }
  }  
  $('#total').text(total);
});
$('.cart-items').on('click', 'li img', function() {
  const list = $(this).parent();
  const price = parseInt(list.find('p').text().split(' - ')[1]);
  total -= price;
  list.remove();
  $('#total').text(total);
});

