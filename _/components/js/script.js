$(document).ready(function() {

//
//
//
//  Firebase
//
//
//    






//
//
//
//  UI
//
//
//    


  // Progress bar
function progress() {
  var position = window.location.hash.replace('/','') ;
  var activeStep = $(position).index() + 1;
  $('#Progress-number').text(activeStep);
  var percentWidth =  9.0909090909 * activeStep;
  $('.Progress-step').animate({
    width : percentWidth + '%'
  })
  if (activeStep == 1) {
    $('#js-prev').addClass('off');
  } else {
    $('#js-prev').removeClass('off');
  }
  if (activeStep == 11) {
    $('#js-next').addClass('off');
  } else {
    $('#js-next').removeClass('off');
  }
  $('.Menu-link').removeClass('active');
  $('.Menu-link[href="' + position + '"]').addClass('active');
}


$(function() {

  if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    var iamPortable = true;
  }

  progress();
  $(window).on('hashchange', progress);

  // Impress Not Supported
  if ($('body.impress-not-supported').length) {
    $('#fs-millbank .slide').append('<p class="paragraph smallestPaddingTop extraPaddingRight">Sorry.... your browser doesnâ€™t support the features required to view the full version of this web site. You will need the latest version of Internet Explorer, or pretty much anything else.  Donâ€™t worry, you can scroll to the site content below...</p><a href="#a-wayfinding-typeface" class="downIcon">Ã…</a>');
    $('.Menu-link, .backtoButton, .downIcon').on('click', function(e) {
      e.preventDefault();
      var section     = $(this).attr('href'),
          destination = $(section).offset().top;
      $('html:not(:animated),body:not(:animated)').animate({
        scrollTop: destination
      }, 1000);
    });
  }

  // Impress
  if (iamPortable == true) {
    $('.no-step').remove();
    $('.step').hide();
    $('.step.active').show();
    $('.step.active').nextAll(':lt(4)').show(); //next 4
    $('.step.active').prevAll(':lt(2)').show(); //prev 2
  }
  $('#js-next').on('click', function() {
    if ($(this).hasClass('off')) {
      impress().goto(22);
    } else {
      impress().next();
    }
    if (iamPortable == true) {
      $('.step.active').prev().prev().prev().hide();
      $('.step.active').next().next().next().show();
    }
  });
  $('#js-prev').on('click', function() {
    if ($(this).hasClass('off')) {
      impress().goto(0);
    } else {
      impress().prev();
    }
    if (iamPortable == true) {
      $('.step.active').prev().prev().show();
      $('.step.active').next().next().next().next().hide();
    }
  });

  if (iamPortable == true) {
    $('.js-next').on('click', function() {
      $('.step.active').prev().prev().hide();
      $('.step.active').next().next().next().next().show();
    });

    $('.js-goto').on('click', function() {
      $('.step.future, .step.past').hide();
      var goTo = $(this).attr('href');
      $(goTo).show();
      $(goTo).nextAll(':lt(4)').show(); //next 4
      $(goTo).prevAll(':lt(2)').show(); //prev 2
    });
  }

//  // Swipe
//  $(function() {
//    $("#impress").swipe( {
//      swipeLeft:function(event, direction, distance, duration, fingerCount) {
//        if ($('#js-next').hasClass('off')) {
//          impress().goto(22);
//        } else {
//          impress().next();
//        }
//        if (iamPortable == true) {
//          $('.step.active').prev().prev().prev().hide();
//          $('.step.active').next().next().next().show();
//        }
//      },
//      swipeRight:function(event, direction, distance, duration, fingerCount) {
//        if ($('#js-prev').hasClass('off')) {
//          impress().goto(0);
//        } else {
//          impress().prev();
//        }
//        if (iamPortable == true) {
//          $('.step.active').prev().prev().show();
//          $('.step.active').next().next().next().next().hide();
//        }
//      },
//      fingers:1,
//      threshold:0
//    });
//  });

  // Menu
  $('.js-menu').on('click', function() {
    $('#Menu').fadeToggle('slow');
  });

  // Overlay Panel
  var theSite;
  if (iamPortable == true) {
    var slidedownTiming = 2000;
  } else {
    var slidedownTiming = 500;
  }
  $('.js-overlay-open').on('click', function(e) {
    e.preventDefault();
    var theOne = $(this).attr('href');
    $('.Overlay-content').hide();
    $(theOne).show();
    var winHeight  = $(window).height(),
        overHeight = $('.Overlay').height();
    if (overHeight > winHeight) {
      $('.Overlay').css('height', overHeight);
      $('#Site').fadeOut('slow', function() {
        theSite = $('#Site').detach();
        $('.Overlay').slideDown(slidedownTiming);
      });
    } else {
      $('.Overlay').css('height', '100%');
      $('#Site').fadeOut('slow', function() {
        theSite = $('#Site').detach();
        $('.Overlay').slideDown(1000);
      });
    }
    if ($('body.impress-not-supported').length) {
      wasHere = $(this).parent().parent().offset().top;
    }
  });
  $('.js-overlay-close').on('click', function(e) {
    e.preventDefault();
    $('.Overlay').slideUp('slow', function() {
      theSite.appendTo('body');
      theSite = null;
      $('#Site').delay(200).fadeIn('slow');
      $('.Overlay').css('height', 'auto');
      $('.Overlay-content').show();
      setTimeout(function() {
        if ($('body.impress-not-supported').length) {
          $('html:not(:animated),body:not(:animated)').animate({
            scrollTop: wasHere
          }, 0);
        }
      }, 1000);
    });
  });

  // Weights panel
  $('.fontExample-name').on('click', function() {
    var classSet = $(this).attr('id');
    $('.fontExample-list').removeClass('is-active');
    $('.fontExample-list.' + classSet ).addClass('is-active');
  });

  // Text Views
  showTime();
  $(window).on('hashchange', showTime);
  var swapping;
  function showTime() {
    if ($('#typeface-details').is('.active')) {
      $('#exampleArea').delay(500).addClass('detailing');
      var state = ['angle', 'distance', 'detailing'],
          index = 0,
          el    = $('#exampleArea');
      swapping = setInterval(function() {
        index < state.length || (index = 0);
        el.attr('class', state[index++]);
      }, 5000);
    } else {
      if(swapping !== undefined) {
        clearInterval(swapping);
        $('#exampleArea').removeClass();
      }
    }
  }
  $('.exampleOption').on('click', function() {
    var effect = $(this).attr('id');
    $('#exampleArea').removeClass().addClass(effect);
    if(swapping !== undefined) {
      clearInterval(swapping);
    }
  });

  // Sharing
  if(window.FS === undefined) { var FS = {}; }
  FS.initialise_sharing = function() {
    "use strict";
    MRT.sharing('.js-share-link', function(a, type) {
      return {
        title   : 'FS Millbank - A wayfinding typeface from @Fontsmith',
     // title   : document.title,
        media   : '',
        url     : 'http://www.fsmillbank.com',
     // url     : window.location.href,
        subject : 'FS Millbank - A wayfinding typeface from Fontsmith'
      };
    }, true);
  };
  window.MRT = window.MRT || {};
  MRT.sharing = function(selector, callback, is_production, options) {
    "use strict";
    options           = options           || {};
    options.templates = options.templates || {};
    var remote_urls = $.extend({
      fb : 'http://www.facebook.com/sharer.php?u=URL&t=TITLE',
      tw : 'http://twitter.com/share?url=URL&text=TITLE',
    //tu : 'http://www.tumblr.com/share/link?url=URL&description=TITLE',
    //pi : 'http://pinterest.com/pin/create/link/?url=URL&description=TITLE',
      gp : 'http://plus.google.com/share?url=URL'
    }, options.templates);
    function remote_url(type, values) {
      var url = remote_urls[type];
      $.each(values, function(key, value) {
        url = url.replace(key.toUpperCase(), encodeURIComponent(value));
      });
      return url;
    }
    function open_popup(url) {
      window.open(url, 'social', 'width=550,height=450,menubar=no,toolbar=no');
    }
    function alert_url(id, url) {
      console.log(['Sharing with ', id, ': "', url, '"'].join(''));
    }
    function visit_url(url) {
      if(url.match(/^mailto/)) {
        window.location.href = url;
      } else {
        open_popup(url);
      }
    }
    function click_handler(event) {
      event.preventDefault();
      var a     = event.currentTarget,
          type  = $(a).data('social'),
          url   = remote_url(type, callback(a, type));

      is_production ? visit_url(url) : alert_url(type, url);
    }
    function initialise() {
      $(selector).click(click_handler);
    }
    initialise();
  };
  FS.initialise_sharing();


  // Icon Carousel
//  $(function iconCarousel() {
//    $('.iconSet').each(function() {
//      var indexSet = $(this).index();
//      var $set     = $(this).children('span');
//      if (indexSet == 0) {
//        var icons = [ ':', '1', '2', '5', '6', '3', '4', '8', '9', '7', ';', 'Ã', 'Ä±', 'L', '0', 'C'];
//      }
//      if (indexSet == 1) {
//        var icons = [ 'Ë™', 'S', 'p', 'N', 'w', 'G', 'r', 'â€¦', 'a', 'Ã§', 'u', 'Æ’', 'Ã’', 'j', '!', 'Å“'];
//      }
//      if (indexSet == 2) {
//        var icons = [ 'Â»', 'ÃŠ', 'â€™', 'Â«', '@', 'g', 'âˆ‘', 'â€¹', '*', 'â€º', '&', 'â€ž', 'âˆš', 'âˆ«', 'â€¡', ']'];
//      }
//
//      setTimeout(function() {
//        var i=0;
//        setInterval(function() {
//          if (i > 15) {
//            i=0;
//          }
//          $set.fadeOut(500, function() {
//            $set.text(icons[i]).fadeIn(500);
//            i++;
//          });
//        }, 3000);
//      }, (300 * indexSet));
//    });
//  });

});

// Plus Minus buttons
$('.plusButton').click(function(){
  $('#slider').val(1);
  $('.positiveExample, .positiveText').animate({
    'opacity' : 1
  });
  $('.negativeExample').animate({
    'opacity' : 0
  });
  $('.negativeText').animate({
      'opacity' : 0.2
    });
});
$('.minusButton').click(function(){
  $('#slider').val(100);
  $('.positiveExample').animate({
    'opacity' : 0
  });
  $('.positiveText').animate({
      'opacity' : 0.2
    });
  $('.negativeExample, .negativeText').animate({
    'opacity' : 1
  });
});

// Range slider
$('#slider').on('change input', function(event) {
  var newValue             = parseInt(event.target.value, 10);
  var newValuePlus         = 100 - newValue;
  var newValueMinusDecimal = newValue / 100;
  var newValuePlusDecimal  = newValuePlus / 100;
  $('.positiveExample').stop().animate({
    'opacity' : newValuePlusDecimal
  });
  $('.negativeExample').stop().animate({
    'opacity' : newValueMinusDecimal
  });
  if (newValuePlusDecimal > 0.5) {
    $('.positiveText').stop().animate({
      'opacity' : newValuePlusDecimal
    });
    $('.negativeText').stop().animate({
      'opacity' : 0.2
    });
  } else {
    $('.negativeText').stop().animate({
      'opacity' : newValueMinusDecimal
    });
    $('.positiveText').stop().animate({
      'opacity' : 0.2
    });
  }
});


});
