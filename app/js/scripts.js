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
        $clickedBottomSide.slideDown();
        $clickedBottomSide.addClass('opened');
      }
    });
  });
  
  var slider = $('.js-slide').lightSlider({
    item:2,
    vertical:true,
    pager: false,
    enableDrag: true,
    controls: false,
    verticalHeight: 477,
    enableTouch: true,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          item: 1,
          verticalHeight: 280
        }
      },
      {
        breakpoint: 500,
        settings: {
          item: 1,
          verticalHeight: 350,
          slideMargin: 20,
        }
      }
    ]
  });

  $('.js-burger').each((i, el) => {
    $(el).off('menu').on('click.menu', function(event) {
      $(el).toggleClass('is-active');
      $('.js-menu').fadeToggle();
    });
  });

});