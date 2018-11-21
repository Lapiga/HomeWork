(function(){
    var arrCalc = [
    {
        sign: '+',
        calc: function(firstNum, secondNum) { return  firstNum + secondNum }
    },
    {
        sign: '-',
        calc: function(firstNum, secondNum) { return  firstNum - secondNum }        
    },
    {
        sign: '*',
        calc: function(firstNum, secondNum) { return  firstNum * secondNum }        
    },
    {
        sign: '/',
        calc: function(firstNum, secondNum) { 
            if (secondNum !== 0) {
                return  firstNum / secondNum;
            }
            return null;        
        }        
    }];    

    var firstNum  = prompt('Введите первое число: ');
    var secondNum = prompt('Введите второе число: ');
    var sign = prompt('Введите знак: ');

    if ((firstNum !== null) && (secondNum !== null) && (sign !== null) &&
        (!isNaN(firstNum)) && (!isNaN(secondNum)))   
    {
        for (var i = 0; i < arrCalc.length; i++) {
            if (sign === arrCalc[i].sign) {
                var result = arrCalc[i].calc(+firstNum, +secondNum);
                result = ((sign === '/') && (result === null)) ? 'Деление на ноль!' : result;
                document.write('Результат вычисления (' + firstNum + sign + secondNum + ') = ' + result);
                break;
            }
        }
    } else {
        document.write('Данные незаданны или заданы неверно! Вычисление невозможно!');        
    }
}())