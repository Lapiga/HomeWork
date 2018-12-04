var man = {
  name: 'Sergei',
  age: '40',
  email: 'crocodile22558@gmail.com',
  job: 'taxi driver',
  hobby: 'drive a car'
};

function cloneObject(obj, fields) {
  var newObj = { ...obj };
  fields.forEach((key) => delete newObj[key]);
  return newObj;
}

console.log(cloneObject(man, ['age', 'hobby']));
