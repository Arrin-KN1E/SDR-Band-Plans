/**
 * widgets.js
 * 
 * Description:
 * This file contains code to initialize CMS widgets.
 * 
 * 
 * Requirements:
 * jQuery 1.9+ and jQuery UI 1.11+
 * 
 * colorbox - Colorbox jQuery plugin (jquery.colorbox-min.js)
 * looper - Cycle2 jQuery plugin (jquery.cycle2.min.js)
 * 
 * 
 * @author Jeffrey Swofford
 */

(function ($) {

    /**
     * Polyfill for lack of .bind() in IE8.  Should probably be relocated.
     */
    if (!Function.prototype.bind) {
      Function.prototype.bind = function(oThis) {
        if (typeof this !== 'function') {
          // closest thing possible to the ECMAScript 5
          // internal IsCallable function
          throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs   = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP    = function() {},
            fBound  = function() {
              return fToBind.apply(this instanceof fNOP && oThis
                     ? this
                     : oThis,
                     aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
      };
    }

    /**
     *  Helper function for generating unique IDs for widget groupings.
     */
    var generateUniqueId = (function() {
        var counter = 1;
        return function() { return counter++; };
    })();
    
    /**
     * Helper to disable text selection for certain elements for aesthetic purposes.
     */
    $.fn.disableSelection = function() {
        return this
            .attr('unselectable', 'on')
            .css('user-select', 'none')
            .on('selectstart', false);
    };

    /**
     * jQuery plugin for initializing NIDS widgets under an element.
     */
    $.fn.initializeNidsWidgets = function() {
        this.find('[data-cms-widget]:not(.ckeditable *)').each(function (index, element) {
            var element = $(element);
            var name = $(element).attr('data-cms-widget');
            var initFunction = 'cms' + name.charAt(0).toUpperCase() + name.slice(1);
            if (typeof element[initFunction] === 'function') {
                element[initFunction]();
            }
        });
        return this;
    };
    
    /* Auto-initialization of widgets */
    $(document).ready(function() {
        // Slight hack to ensure that this runs AFTER CKeditor is finished setting things up.
        $(document).ready(function() {
            $('body').initializeNidsWidgets();
        });
    });


    /***** COLORBOX *****/

    $.fn.cmsColorbox = function() {
        var colorbox_options = {
            loop: this.data('cms-colorbox-loop'),
            transition: this.data('cms-colorbox-transition'),
            speed: this.data('cms-colorbox-transition-speed'),
            slideshow: this.data('cms-colorbox-slideshow'),
            slideshowSpeed: this.data('cms-colorbox-slideshow-speed'),
            rel: 'cms-colorbox-group-' + generateUniqueId(),
            current: '{current} / {total}',
            previous: 'Previous',
            next: 'Next',
            close: 'Close',
            slideshowStart: 'Start',
            slideshowStop: 'Stop'
        };
        this.find('li > a').addClass(colorbox_options['rel']).colorbox(colorbox_options);
    };

    /***** LOOPER  *****/

    $.fn.cmsLooper = function() {
        var modalMask = $('<div>').addClass("cms-looper-modal-mask").hide().appendTo($("body"));
        // set the height/width of the slideshow element since that's how cycle2 works
        var slideshow = this.find(".cms-looper-slideshow").css({
            height: this.data("cms-looper-image-height"),
            width: this.data("cms-looper-image-width")
        });
        
        var start = function () {
            slideshow.cycle("resume");
        }.bind(this);
        
        var stop = function () {
            slideshow.cycle("pause");
        }.bind(this);
        
        var prev = function () {
            slideshow.cycle("pause");
            slideshow.cycle("prev");
        }.bind(this);
        
        var next = function () {
            slideshow.cycle("pause");
            slideshow.cycle("next");
        }.bind(this);
        
        var toggleModal = function () {
            setModal(!isModal());
        }.bind(this);
        
        var isModal = function () {
            return this.hasClass("cms-looper-modal");
        }.bind(this);
        
        var setModal = function (enableModal) {
            if (enableModal) {
                this.addClass("cms-looper-modal");
                modalMask.fadeIn(250, "easeOutExpo");
            } else {
                this.removeClass("cms-looper-modal");
                modalMask.fadeOut(250, "easeInExpo");
            }
        }.bind(this);
        
        this.find(".cms-looper-control-bar").disableSelection();
        this.find(".cms-looper-control-modal").disableSelection().click(function() {
            toggleModal();
        });
        this.find(".cms-looper-control-prev").click(function() {
            prev();
        });
        this.find(".cms-looper-control-next").click(function() {
            next();
        });
        
        var controlStart = this.find(".cms-looper-control-start").click(function() {
            start();
        });
        var controlStop = this.find(".cms-looper-control-stop").click(function() {
            stop();
        });
        var controlSpeed = this.find(".cms-looper-control-speed").slider({
            min: 400,
            max: 900,
            value: 700,
            step: 50,
            slide: function (event, ui) {
                var speed = 1000 - ui.value;
                var api = slideshow.data("cycle.API");
                if (api) {
                    var opts = api.opts();
                    opts.timeout = speed;
                    for (var i = 0; i < opts.slides.length; i++) {
                        var slide = opts.slides[i];
                        $(slide).data("cycle.opts").timeout = speed;
                    }
                }
            }
        });

        slideshow.on("cycle-paused", function (event) {
                controlStart.show();
                controlStop.hide();
        });
        slideshow.on("cycle-resumed", function (event) {
                controlStart.hide();
                controlStop.show();
        });
        slideshow.cycle({speed: 10, timeout: controlSpeed.slider("value")});
    };

}(jQuery));
