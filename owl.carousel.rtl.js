;

/*
 *  jQuery OwlCarouselRtl v.0.9.0
 *
 *  Copyright (c) 2015 Aleksandar Veljkovic
 *  https://github.com/biosonic
 *
 *  Licensed under MIT
 *
 */

(function($) {
  $.fn.owlCarouselRtl = function(config) {
    config = config || {};
    config.rtlJump = (config.rtlJump === false) ? false : true;
    var $this = $(this);
    // rtl css
    $this.addClass("owl-rtl");
    if ($('owl-rtl-css').length < 1) {
      $($('head')[0]).append("<style class='owl-rtl-css'>.owl-wrapper-outer{direction:ltr;} .owl-wrapper{direction:rtl;}</style>");
    }
    // rtl reorder & numeration
    var itemNo = 0;
    $this.children().each(function(i, o) {
      var $o = $(o);
      $o.addClass("item-no-" + itemNo);
      $o.data("no", itemNo);
      itemNo++;
      $($o.parent()).prepend($o);
    });
    // after init bug fix & jump to last
    if (config.afterInit) {
      var afterInitClone = config.afterInit;
    }
    config.afterInit = function() {
      var timeout = setInterval(function() {
        if ($this.data('owlCarousel') !== 'undefined') {
          clearInterval(timeout);
          jump2BugFig();
          if (config.rtlJump === true) {
            $this.data('owlCarousel').jumpTo(9999);
          }
          if (typeof (afterInitClone) === "function") {
            afterInitClone();
          }
        }
      }, 300);
    };

    var jump2BugFig = function() {
      var ua = window.navigator.userAgent;
      var broken = false;
      broken = broken || (ua.indexOf('GT-I9300') > -1) && (ua.indexOf('GT-I9300') > -1);
      if (broken) {
        $('.owl-controls .owl-buttons', $this).off("touchend.owlControls");
      }
    };

    // call super
    $this.owlCarousel(config);
  };
})(jQuery);
