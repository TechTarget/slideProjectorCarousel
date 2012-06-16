/*!
 * Slide Projector Carousel v0.1 (http://okize.github.com/)
 * Copyright (c) 2012 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
 */

;(function ( $, window, undefined ) {

	'use strict';

	// the default settings
	var pluginName = 'slideProjectorCarousel';
	var defaults = {
		slidesToShow: 3,
		animateText: false
	};

	// plugin constructor
	function Plugin( element, options ) {
		this.element = element;
		this.options = $.extend( {}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype.init = function () {

		// plugin vars
		var o = this.options;
		var carousel = $(this.element);
		var projectionContainer = carousel.find('.projection');
		var projections = projectionContainer.find('li');
		var slidesContainer = carousel.find('.slides');
		var slides = slidesContainer.find('li');
		
		console.log();
		
		projections.eq(1).css('z-index',1).animate({top: 0}, 2000, function() {
			console.log(this);
		});
		
		
		
		

	};

	// a lightweight plugin wrapper around the constructor preventing against multiple instantiations
	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
			}
		});
	};

}(jQuery, window));