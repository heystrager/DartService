$( document ).ready(function() {
  $('.js-services-item').each((itemIndex, item) => {

    const $topSide = $(item).find('.js-services-item-top');
    // const $bottomSide = $(item).find('.js-services-item-bottom');
    // console.log($link, $bottomSide);

    $topSide.off('.topSide').on('click.topSide', function (event) {
      event.preventDefault();
      const $clickedTopSide = $(this);
      const $clickedBottomSide = $clickedTopSide.parent().find('.js-services-item-bottom');
      
      if ($clickedBottomSide.hasClass('opened')) {
        $clickedBottomSide.slideUp();
        $clickedBottomSide.removeClass('opened');
      }
      else {
        $clickedBottomSide.slideDown('slow easeInElastic')
        $clickedBottomSide.addClass('opened');
      }
    });
  });
});