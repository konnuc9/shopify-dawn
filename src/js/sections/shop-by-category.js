import $ from '../vendor/jquery';
import 'slick-carousel';

const SELECTOR = '[data-shop-by-category]';

function initShopByCategory(container) {
  const $root = $(container);
  const $slider = $root.find('.shop-by-category__slider');
  if (!$slider.length || $slider.hasClass('slick-initialized')) return;

  const peek = $root.data('peek') === true ? 0.15 : 0;
  const desktop = Number($root.data('slides-desktop')) || 5;
  const tablet = Number($root.data('slides-tablet')) || 3;
  const mobile = Number($root.data('slides-mobile')) || 2;

  $slider.slick({
    slidesToShow: desktop + peek,
    slidesToScroll: 1,
    infinite: false,
    arrows: true,
    prevArrow: $root.find('.shop-by-category__arrow--prev'),
    nextArrow: $root.find('.shop-by-category__arrow--next'),
    dots: false,
    speed: 400,
    autoplay: $root.data('autoplay') === true,
    autoplaySpeed: Number($root.data('autoplay-speed')) || 4000,
    responsive: [
      { breakpoint: 990, settings: { slidesToShow: tablet + peek } },
      { breakpoint: 750, settings: { slidesToShow: mobile + peek } },
    ],
  });
}

function destroyShopByCategory(container) {
  const $slider = $(container).find('.shop-by-category__slider.slick-initialized');
  if ($slider.length) $slider.slick('unslick');
}

export default function shopByCategory() {
  $(SELECTOR).each((_, el) => initShopByCategory(el));

  // Theme editor: re-init when the section is added/edited, clean up on removal.
  $(document)
    .on('shopify:section:load', (e) => {
      $(e.target).find(SELECTOR).each((_, el) => initShopByCategory(el));
    })
    .on('shopify:section:unload', (e) => {
      $(e.target).find(SELECTOR).each((_, el) => destroyShopByCategory(el));
    })
    .on('shopify:block:select', (e) => {
      const $slide = $(e.target).closest('.slick-slide');
      const $slider = $slide.closest('.shop-by-category__slider.slick-initialized');
      if ($slider.length) $slider.slick('slickGoTo', $slide.data('slick-index'));
    });
}
