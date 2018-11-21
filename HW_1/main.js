var PHONE_COLOR_BLACK  = 1;
var PHONE_COLOR_SILVER = 2;
var PHONE_COLOR_GOLD   = 3;

var PHONE_MEMORY_32G  = 32;
var PHONE_MEMORY_64G  = 64;
var PHONE_MEMORY_128G = 128;
var PHONE_MEMORY_256G = 256;

var PHONE_PRICE_32G   = 300;
var PHONE_PRICE_64G   = 500;
var PHONE_PRICE_128G  = 700;
var PHONE_PRICE_256G  = 900;

var PHONE_IMG_BLACK   = 'black.png';
var PHONE_IMG_SILVER  = 'silver.png';
var PHONE_IMG_GOLD    = 'gold.png';
var PHONE_IMG_DEFAULT = 'default.png';

var cancelStr = '<p>Нам жаль, что Вы отменили выбор телефона!</p>';

var phoneColor = prompt('Введите, пожалуйста, номер цвета телефона: 1-BLACK, 2-SILVER, 3-GOLD', '');

if (phoneColor !== null) {
    phoneColor = +phoneColor;

    if (phoneColor === PHONE_COLOR_BLACK) {
        document.write('<img src="./img/' + PHONE_IMG_BLACK + '" alt="' + PHONE_IMG_BLACK + '">');
    } else if (phoneColor === PHONE_COLOR_SILVER) {
        document.write('<img src="./img/' + PHONE_IMG_SILVER + '" alt="' + PHONE_IMG_SILVER + '">');
    } else if (phoneColor === PHONE_COLOR_GOLD) {
        document.write('<img src="./img/' + PHONE_IMG_GOLD + '" alt="' + PHONE_IMG_GOLD + '">'); 
    } else {
        phoneColor = -1;
        document.write('<img src="./img/' + PHONE_IMG_DEFAULT + '" alt="' + PHONE_IMG_DEFAULT + '">');    
        document.write('<p>Телефона с данным цветом нет в продаже!</p>'); 
    }

    if (phoneColor > 0) {
        var phoneMemory = prompt('Введите, пожалуйста, значение памяти телефона: 32; 64; 128 или 256 Гигабайт', '');
    
        if (phoneMemory !== null) {
            var answer = 'Цена телефона с памятью ' + phoneMemory + 'Г: $';    
            phoneMemory = +phoneMemory;
            
            if (phoneMemory === PHONE_MEMORY_32G) {
                document.write('<p>' + answer + PHONE_PRICE_32G + '</p>');
            } else if (phoneMemory === PHONE_MEMORY_64G) {
                document.write('<p>' + answer + PHONE_PRICE_64G + '</p>');
            } else if (phoneMemory === PHONE_MEMORY_128G) {
                document.write('<p>' + answer + PHONE_PRICE_128G + '</p>');
            } else if (phoneMemory === PHONE_MEMORY_256G) {
                document.write('<p>' + answer + PHONE_PRICE_256G + '</p>');
            } else {
                document.write('<p>Телефона с данными цветом и объемом памяти нет в продаже!</p>');    
            }
        } else {
            document.write(cancelStr); 
        }
    }    
}
else {
    document.write(cancelStr);    
}

