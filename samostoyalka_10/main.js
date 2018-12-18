/*
1) При изменениее цвета меняется картинка (под соответствующий цвет). Для примера можно взять идею интернет-магазина
2) При нажатии на кнопку more открывается описание товара
3) При изменении цвета и если описание было открыто - оно закрывается (разные описания под разные цвета можно не делать)
*/

const IMAGES = [
  { img: 'black.png', color: 'black' },
  { img: 'gold.png', color: 'gold' },
  { img: 'silver.png', color: 'silver' }];
let currItem = 0;

let hideDescription = function () {
  $('.c-product-description__text').hide();
  $('.c-product-btn').html('More');
}

let showDescription = function () {
  $('.c-product-description__text').hide();
  $('#descr_' + IMAGES[currItem].color).show();
  $('.c-product-btn').html('Hide');
}

let updateImg = function () {
  $('.c-product-slider__container').css('background-image', 'url("./img/' + IMAGES[currItem].img + '")');
  $('.c-product-slider__control').removeClass('c-product-slider__control--isActive');
  $('.c-product-slider__control[data-index="' + currItem + '"]').addClass('c-product-slider__control--isActive');

  hideDescription();
}


for (let i = 0; i < IMAGES.length; i++) {
  $('.c-product-slider__controls').append('<div data-index="' + i +
    '" class="c-product-slider__control" style="background-color: ' + IMAGES[i].color + '">');
}

updateImg();

$('.c-product-slider__control').click(function () {
  currItem = $(this).attr('data-index');
  updateImg();
});

$('.c-product-btn').click(function () {
  if ($('#descr_' + IMAGES[currItem].color).css('display') !== 'none') {
    hideDescription();
  } else {
    showDescription();
  }
});
