import $ from 'jquery';

// slick-carousel 1.8.1 still calls $.type, which jQuery 4 removed.
if (typeof $.type !== 'function') {
  $.type = (obj) => {
    if (obj == null) return String(obj);
    if (Array.isArray(obj)) return 'array';
    return typeof obj === 'object' || typeof obj === 'function'
      ? Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
      : typeof obj;
  };
}

window.jQuery = window.$ = $;

export default $;
