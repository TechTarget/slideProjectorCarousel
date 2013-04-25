# slideProjectorCarousel

## Summary

A plugin for adding a simple image slideshow component to a microsite. The component has an image and text based navigation below full size image. The component also has directional arrows to the left and right of the navigation. These arrows do not advance the slide, only the navigation.

## Options

Option | Description
--- | ---
autoplay | boolean; If set to true the slideshow will autoplay, if set to false the slideshow will not autoplay
autoplaySpeed | integer; set in milliseconds
slidesToShow | This number designates how many slides should be shown in the navigation. The default is set to show 3 slides. The css also dictates this by width. If this needs to be modified, the css will also need to be modified.
slidesToMove | This number indicates how many slides should move with each click of the arrows.

## To Implement

###JavaScript
Copy the contents of the minified javascript of this plugin into the javascript file already associated with your site. Also copy the script from the example/test.js file to initiate the slideshow. The themes in the example script file are for demonstrative purposes.

```javascript
$('.carouselSlideProjector').slideProjectorCarousel({
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToMove: 2
  });
```
###Jade

When using Jade, make sure the index.jade file has the include that references your slideProjectorCarousel.jade file. In the example files there is html in a div with a class called 'caption'. By default these do not display.

###CSS

Depending on the needs of the component, the css may need to be modified. The default for the .caption div is set to display:none. This will need to be changed if captions do need to be displayed.

## CSS

Make sure to copy the CSS associated with this component and paste it into the stylesheet associated with your website. Modify the styles as needed to match the mock-up provided.

#### Notes

The example version of this component uses colored list items as samples. This would not be the result intended for a microsite. Real images would need to be used. Text on the slides may also need to be used.