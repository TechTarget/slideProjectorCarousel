#!
# * Slide Projector Carousel v1.0.1 (https://github.com/okize)
# * A jQuery plugin that displays a large 'hero image' and a navigable thumbnail list
# * Copyright (c) 2012 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
# 

# use AMD or browser globals to create a jQuery plugin.
((factory) ->
  if typeof define is "function" and define.amd
    define ["jquery"], factory
  else
    factory jQuery
) ($) ->
  
  # the default settings
  
  # plugin constructor
  Plugin = (element, options) ->
    @element = element
    @options = $.extend({}, defaults, options)
    @_defaults = defaults
    @_name = pluginName
    @init()
  pluginName = "slideProjectorCarousel"
  defaults =
    autoplay: true
    autoplaySpeed: 5000
    slidesToShow: 3
    slidesToMove: 3

  Plugin::init = ->
    
    # plugin vars
    o = @options
    carousel = $(@element)
    projectionContainer = carousel.find(".projection")
    projections = projectionContainer.find("li")
    slidesContainer = carousel.find(".slides")
    slidesList = slidesContainer.find("ul")
    slides = slidesList.find("li")
    slideWidth = 0 # can't get width here since width will depend on whether there are navigation controls or not
    slideCount = slides.length
    currentSlide = -1
    nextSlide = 0
    autoplayOverride = carousel.data("autoplay")
    navigation = {} # the navigation object
    
    # creates the html that compromises the navigation elements
    # inserts itself into dom and binds event handlers to arrows
    addNavigation = ->
      
      # @todo
      navigation.btnPrevious = $("<a>",
        class: "slideControls previous disabled"
        href: "#"
        title: "Previous"
        text: "Previous"
      ).on("click", (e) ->
        e.preventDefault()
        slidesContainer.trigger "slides.move", "previous"  unless $(this).hasClass("disabled")
      )
      
      # @todo
      navigation.btnNext = $("<a>",
        class: "slideControls next"
        href: "#"
        title: "Next"
        text: "Next"
      ).on("click", (e) ->
        e.preventDefault()
        slidesContainer.trigger "slides.move", "next"  unless $(this).hasClass("disabled")
      )
      
      # @todo
      slidesContainer.addClass("hasControls").append navigation.btnPrevious, navigation.btnNext
      
      # @todo
      slideWidth = slides.outerWidth()

    
    # @todo
    moveStrip = (e, direction) ->
      if direction is "previous"
        navigation.btnPrevious.addClass "disabled"
        navigation.btnNext.removeClass "disabled"
        slidesList.css "left", 0
      if direction is "next"
        navigation.btnPrevious.removeClass "disabled"
        navigation.btnNext.addClass "disabled"
        slidesList.css "left", -(slideWidth * o.slidesToMove)

    
    # inline override for autoplay; use the attribute 'data-autoplay' to control autoplay speed in the view layer
    # setting 'data-autoplay' to 0 will disable autoplay
    if typeof autoplayOverride isnt "undefined"
      if autoplayOverride > 0
        o.autoplay = true
        o.autoplaySpeed = autoplayOverride
      else
        o.autoplay = false
        o.autoplaySpeed = 0
    
    # autoplay object
    autoplay =
      
      # initialize autoplay
      start: ->
        @timer = setTimeout($.proxy(@getNextSlide, this), o.autoplaySpeed)

      
      # determine the next item to select
      getNextSlide: ->
        
        # increment the next item index or reset if at end of list
        nextSlide = (if (nextSlide is slideCount - 1) then 0 else nextSlide + 1)
        
        # select next item in list
        slides.eq(nextSlide).trigger "click"

      
      # stop autoplay
      stop: ->
        clearTimeout @timer

    
    # @todo
    slides.on "click", (e) ->
      e.preventDefault()
      autoplay.stop()  if o.autoplay
      slides.removeClass "active"
      $this = $(this)
      $this.addClass "active"
      index = $this.index()
      currentSlide = index
      nextSlide = index
      projections.css "z-index", 0
      projections.eq(index).css
        "z-index": 1
        top: 0

      
      # restart autplay
      autoplay.start()  if o.autoplay

    
    # @todo
    projections.on "click", (e) ->
      e.preventDefault()
      link = $(this).find("a")
      openIn = (if !!link.attr("target") then "_blank" else "_self")
      window.open link.attr("href"), openIn

    
    # if there are more slides than the amount set in slidesToShow, add navigation to slides
    addNavigation()  if slideCount > o.slidesToShow
    
    # restart autplay
    autoplay.start()  if o.autoplay
    
    # bind handlers
    slidesContainer.on "slides.move", moveStrip

  
  # a lightweight plugin wrapper around the constructor preventing against multiple instantiations
  $.fn[pluginName] = (options) ->
    @each ->
      $.data this, "plugin_" + pluginName, new Plugin(this, options)  unless $.data(this, "plugin_" + pluginName)


