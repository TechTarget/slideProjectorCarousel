/*!
slideProjectorCarousel v1.0.3 (https://github.com/TechTarget/slideProjectorCarousel)
Author: Morgan Wigmanich <okize123@gmail.com> (http://github.com/okize)
Copyright (c) 2013 | Licensed under the MIT license
http://www.opensource.org/licenses/mit-license.php
*/


(function() {
  (function(factory) {
    if (typeof define === "function" && define.amd) {
      return define(["jquery"], factory);
    } else {
      return factory(jQuery);
    }
  })(function($) {
    var Plugin, defaults, pluginName;
    Plugin = function(element, options) {
      this.element = element;
      this.options = $.extend({}, defaults, options);
      this._defaults = defaults;
      this._name = pluginName;
      return this.init();
    };
    pluginName = "slideProjectorCarousel";
    defaults = {
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 3,
      slidesToMove: 3
    };
    Plugin.prototype.init = function() {
      var addNavigation, autoplay, autoplayOverride, carousel, currentSlide, moveStrip, navigation, nextSlide, o, projectionContainer, projections, slideCount, slideWidth, slides, slidesContainer, slidesList;
      o = this.options;
      carousel = $(this.element);
      projectionContainer = carousel.find(".projection");
      projections = projectionContainer.find("li");
      slidesContainer = carousel.find(".slides");
      slidesList = slidesContainer.find("ul");
      slides = slidesList.find("li");
      slideWidth = 0;
      slideCount = slides.length;
      currentSlide = -1;
      nextSlide = 0;
      autoplayOverride = carousel.data("autoplay");
      navigation = {};
      addNavigation = function() {
        navigation.btnPrevious = $("<a>", {
          "class": "slideControls previous disabled",
          href: "#",
          title: "Previous",
          text: "Previous"
        }).on("click", function(e) {
          e.preventDefault();
          if (!$(this).hasClass("disabled")) {
            return slidesContainer.trigger("slides.move", "previous");
          }
        });
        navigation.btnNext = $("<a>", {
          "class": "slideControls next",
          href: "#",
          title: "Next",
          text: "Next"
        }).on("click", function(e) {
          e.preventDefault();
          if (!$(this).hasClass("disabled")) {
            return slidesContainer.trigger("slides.move", "next");
          }
        });
        slidesContainer.addClass("hasControls").append(navigation.btnPrevious, navigation.btnNext);
        return slideWidth = slides.outerWidth();
      };
      moveStrip = function(e, direction) {
        if (direction === "previous") {
          navigation.btnPrevious.addClass("disabled");
          navigation.btnNext.removeClass("disabled");
          slidesList.css("left", 0);
        }
        if (direction === "next") {
          navigation.btnPrevious.removeClass("disabled");
          navigation.btnNext.addClass("disabled");
          return slidesList.css("left", -(slideWidth * o.slidesToMove));
        }
      };
      if (typeof autoplayOverride !== "undefined") {
        if (autoplayOverride > 0) {
          o.autoplay = true;
          o.autoplaySpeed = autoplayOverride;
        } else {
          o.autoplay = false;
          o.autoplaySpeed = 0;
        }
      }
      autoplay = {
        start: function() {
          return this.timer = setTimeout($.proxy(this.getNextSlide, this), o.autoplaySpeed);
        },
        getNextSlide: function() {
          nextSlide = (nextSlide === slideCount - 1 ? 0 : nextSlide + 1);
          return slides.eq(nextSlide).trigger("click");
        },
        stop: function() {
          return clearTimeout(this.timer);
        }
      };
      slides.on("click", function(e) {
        var $this, index;
        e.preventDefault();
        if (o.autoplay) {
          autoplay.stop();
        }
        slides.removeClass("active");
        $this = $(this);
        $this.addClass("active");
        index = $this.index();
        currentSlide = index;
        nextSlide = index;
        projections.css("z-index", 0);
        projections.eq(index).css({
          "z-index": 1,
          top: 0
        });
        if (o.autoplay) {
          return autoplay.start();
        }
      });
      projections.on("click", function(e) {
        var link, openIn;
        e.preventDefault();
        link = $(this).find("a");
        openIn = (!!link.attr("target") ? "_blank" : "_self");
        return window.open(link.attr("href"), openIn);
      });
      if (slideCount > o.slidesToShow) {
        addNavigation();
      }
      if (o.autoplay) {
        autoplay.start();
      }
      return slidesContainer.on("slides.move", moveStrip);
    };
    return $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
          return $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        }
      });
    };
  });

}).call(this);
