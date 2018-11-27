// Task 1 and 4
area.addEventListener('click', function (e) {
  var target = this;
  var figure = document.createElement('div');
  var radio = document.getElementsByName('figure-type');

  figure.classList.add('figure');
  figure.id = 'figure_id';

  for (var i = 0; i < radio.length; i++) {
    if ((radio[i].value === 'circle') && (radio[i].checked)) {
      figure.classList.add('figure--circle');
    }
  }

  if (e.target.id !== 'figure_id') {
    figure.style.left = e.layerX + 'px';
    figure.style.top = e.layerY + 'px';
    target.appendChild(figure);
  }
})


// Task 2
function pluck(arrObj, property) {
  var resultArr = new Array(arrObj.length);
  for (var i = 0; i < arrObj.length; i++) {
    for (prop in arrObj[i]) {
      if (prop === property) {
        resultArr[i] = arrObj[i][prop];
      }
    }
  }
  return resultArr;
}

// Test 2
var characters = [
  { 'name': 'barney', 'age': 36, 'email': 'pink_pantera@gmail.com' },
  { 'name': 'fred', 'age': 40, 'email': 'fred_redcat@fff.com' },
  { 'name': 'bob', 'age': 20, 'email': 'sponge_bob@fff.com' }
];
console.log(pluck(characters, 'email'));


// Task 3
function map(fn, array) {
  var resultArr = new Array(array.length);
  for (var i = 0; i < array.length; i++) {
    resultArr[i] = fn(array[i]);
  }
  return resultArr;
}

// Test 3
var array = [3, 6, 8, 90, 56];
var foo = function (x) {
  return x * 2;
}
console.log(map(foo, array));