$(document).ready(() => {
  $('.c-accordion__header').on('click', foo)
});

function foo() {
  $('.c-accordion__context').not($(this).next()).slideUp(500);
  $(this).next().slideToggle(500);
}