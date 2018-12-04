var size = [{
  name: 'small',
  price: 50,
  kk: 20
},
{
  name: 'large',
  price: 100,
  kk: 40
}];


var stuffing = [{
  name: 'cheese',
  price: 10,
  kk: 20
},
{
  name: 'potato',
  price: 15,
  kk: 10
},
{
  name: 'salad',
  price: 20,
  kk: 5
}];

var topping = [{
  name: 'spice',
  price: 15,
  kk: 0
},
{
  name: 'mayo',
  price: 20,
  kk: 5
}];

var compareObjects = function (o1, o2, key) {
  if (!key) key = 'name';
  return o1[key] === o2[key] ? true : false;
}

var Hamburger = function (size, stuffing) {
  this._size = size;
  this._stuffing = stuffing;
  this._toppings = [];
}

var Hamburger = function () {
  this._size = null;
  this._stuffing = null;
  this._toppings = [];
}

Hamburger.prototype.getSize = function () {
  if (this._size !== null) {
    return this._size.name;
  }
  return null;
}

Hamburger.prototype.setSize = function (size_name) {
  for (const key of size) {
    if (key.name === size_name) {
      this._size = key;
    }
  }
}

Hamburger.prototype.getStuffing = function () {
  if (this._stuffing !== null) {
    return this._stuffing.name;
  }
  return null;
}

Hamburger.prototype.setStuffing = function (stuffing_name) {
  for (const key of stuffing) {
    if (key.name === stuffing_name) {
      this._stuffing = key;
    }
  }
}

Hamburger.prototype.getToppings = function () {
  return this._toppings;
}

Hamburger.prototype.addTopping = function (topping_name) {
  for (const key of topping) {
    if (key.name === topping_name) {
      for (const top_key of this._toppings) {
        if (compareObjects(key, top_key)) {
          return false;
        }
      }
      this._toppings.push(key);
    }
  }
  return true;
}

Hamburger.prototype.removeTopping = function (topping_name) {
  for (const key of topping) {
    if (key.name === topping_name) {
      for (const top_key of this._toppings) {
        if (compareObjects(key, top_key)) {
          this._toppings.splice(i, 1);
          return true;
        }
      }
    }
  }
  return false;
}

Hamburger.prototype.calculatePrice = function () {
  var price = this._size.price + this._stuffing.price;
  for (var i = 0; i < this._toppings.length; i++) {
    price += this._toppings[i].price;
  }
  return price;
}

Hamburger.prototype.calculateKk = function () {
  var kk = this._size.kk + this._stuffing.kk;
  for (var i = 0; i < this._toppings.length; i++) {
    kk += this._toppings[i].kk;
  }
  return kk;
}

var burger;

var btn = document.getElementById('btn-calculate');
btn.addEventListener('click', function () {
  var result;
  burger = new Hamburger();
  var radioSize = document.getElementsByName('hamburger-size');
  for (const key_size of radioSize) {
    if (key_size.checked) {
      burger.setSize(key_size.value);
      break;
    }
  }

  var radioStuffing = document.getElementsByName('hamburger-stuffing');
  for (const key_stuffing of radioStuffing) {
    if (key_stuffing.checked) {
      burger.setStuffing(key_stuffing.value);
      break;
    }
  }
  if (burger.getSize() === null) {
    result = '<p>Error! Size of hamburger is not chosen!</p>';
  } else if (burger.getStuffing() === null) {
    result = '<p>Error! Stuffing of hamburger is not chosen!</p>';
  }
  else {
    var cbx_topping = document.getElementsByName('hamburger-topping');
    for (const key_topping of cbx_topping) {
      if (key_topping.checked) {
        burger.addTopping(key_topping.value);
      }
      else if (burger.getToppings().length > 0) {
        burger.removeTopping(key_topping.value);
      }
    }
    result = '<p>Hamburger price: ' + burger.calculatePrice() + 'UAH</p>' +
      '<p>Calories: ' + burger.calculateKk() + 'ckal</p>';
  }
  document.querySelector('#total').innerHTML = result;
})
