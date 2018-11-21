var PHONE_COLOR_BLACK  = 1;
var PHONE_COLOR_SILVER = 2;
var PHONE_COLOR_GOLD   = 3;

var PHONE_IMG_BLACK   = 'black.png';
var PHONE_IMG_SILVER  = 'silver.png';
var PHONE_IMG_GOLD    = 'gold.png';
var PHONE_IMG_DEFAULT = 'default.png';

phoneMemory = [
    {
        size: 32,
        price: 300
    },
    {
        size: 64,
        price: 500
    },
    {
        size: 128,
        price: 700
    },
    {
        size: 256,
        price: 900
    },        
]

phoneColor = [
    {
        color: PHONE_COLOR_BLACK,
        image: PHONE_IMG_BLACK,
        priceCoeff: 25
    },
    {
        color: PHONE_COLOR_SILVER,
        image: PHONE_IMG_SILVER,
        priceCoeff: 50
    },
    {
        color: PHONE_COLOR_GOLD,
        image: PHONE_IMG_GOLD,
        priceCoeff: 75
    }       
]

var cancelStr = '<p>Нам жаль, что Вы отменили выбор телефона!</p>';

var isColorChoosen = false;
var isMemoryChoosen = false;

var price = 0;
var coeff = 0;
var image = PHONE_IMG_DEFAULT;
var color;

while(!isColorChoosen) {
    color = prompt('Введите, пожалуйста, номер цвета телефона: 1-BLACK, 2-SILVER, 3-GOLD', '');    
    if (color === null) {
        document.write(cancelStr); 
        break;
    }

    color = +color;        
    for (var i = 0; i < phoneColor.length; i++) {
        if (phoneColor[i].color === color) {
            image = phoneColor[i].image;
            coeff = phoneColor[i].priceCoeff;
            isColorChoosen = true;
            break;
        }
    }    
}

if (isColorChoosen) {
    var memory;
    
    while(!isMemoryChoosen) {
       memory = prompt('Введите, пожалуйста, значение памяти телефона: 32; 64; 128 или 256 Гигабайт', '');       
       if (memory === null) {
          document.write(cancelStr);            
          break;
       }
    
       memory = +memory;
       for (var i = 0; i < phoneMemory.length; i++) {
           if (phoneMemory[i].size === memory) {
               price = phoneMemory[i].price;
               isMemoryChoosen = true;
               break;
           }
       }       
    }

    if (isMemoryChoosen) {
        price += coeff;
        document.write('<img src="./img/' + image + '" alt="' + image + '">');  
        document.write('<p>Цена телефона с памятью ' + memory + 'ГБ: $' + price + '</p>');                            
    }
}

