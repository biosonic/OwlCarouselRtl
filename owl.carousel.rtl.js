;

/*
 *  jQuery OwlCarouselRtl 
 *  version in git tag
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
    if ($('.owl-rtl-css').length < 1) {
      $($('head')[0]).append("<style class='owl-rtl-css'>.owl-wrapper-outer{direction:ltr;opacity:0.001;} .owl-wrapper{direction:rtl;}</style>");
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
      var interval = setInterval(function() {
        if ($this.data('owlCarousel') !== 'undefined') {
          clearInterval(interval);
          rtlEnumeration();
          afterInitBindings();
          jump2BugFig();
          if (config.rtlJump === true) {
            $this.data('owlCarousel').jumpTo(9999);
          }
          rtlEnumeration();
          if (typeof (afterInitClone) === "function") {
            afterInitClone();
          }
          rtlEnumeration();
          $this.find('.owl-wrapper-outer').animate({opacity:1},800);
        }
      }, 300);
    };
    // after Action
    if (config.afterAction) {
      var afterAfterActionClone = config.afterAction;
    }
    config.afterAction = function() {
      rtlEnumeration();
      if (typeof (afterAfterActionClone) === "function") {
        afterAfterActionClone();
      }
    };

    // RTL METHODS
    var afterInitBindings = function() {      
      var owl = $this.data('owl-carousel');      
      owl.jumpToRtl = function(num) {        
        var numRtl = owl.itemsAmount - num - 1;
        owl.jumpTo(numRtl);
      };     
      owl.goToRtl = function(num) {        
        var numRtl = owl.itemsAmount - num - 1;
        owl.goTo(numRtl);
      };
    };
    // RTL ENUMERATION
    var rtlEnumeration = function() {
      var owl = $this.data('owl-carousel');
      if (!owl) {
        return false;
      }
      owl.currentItemRtl = owl.maximumItem - owl.currentItem;
      owl.currentPositionRtl = owl.maximumItem - owl.currentItem + 1;
    };

    var jump2BugFig = function() {
      var ua = window.navigator.userAgent;
      var broken = false;
      broken = broken || (ua.indexOf('GT-I9300') > -1) && (ua.indexOf('GT-I9300') > -1) && (ua.indexOf('Chrome') === -1);
      broken = broken || (ua.indexOf('SM-T110') > -1) && (ua.indexOf('Android 4.2.2') > -1) && (ua.indexOf('Chrome') === -1); // Galxy Tab 3

      if (broken) {
        $('.owl-controls .owl-buttons', $this).off("touchend.owlControls");
      }
    };

    // call super
    $this.owlCarousel(config);
  };
})(jQuery);
