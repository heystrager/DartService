$( document ).ready(function() {
  $('.js-services-item').each((itemIndex, item) => {
    const $topSide = $(item).find('.js-services-item-top');

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
  
  $('.js-slide').lightSlider({
    item:2,
    vertical:true,
    pager: false,
    enableDrag: true
  });

});