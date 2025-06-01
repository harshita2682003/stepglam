/*  jQuery Nice Select - v1.0
https://github.com/hernansartorio/jquery-nice-select
Made by Hernán Sartorio  */
!function (e) { e.fn.niceSelect = function (t) { function s(t) { t.after(e("<div></div>").addClass("nice-select").addClass(t.attr("class") || "").addClass(t.attr("disabled") ? "disabled" : "").attr("tabindex", t.attr("disabled") ? null : "0").html('<span class="current"></span><ul class="list"></ul>')); var s = t.next(), n = t.find("option"), i = t.find("option:selected"); s.find(".current").html(i.data("display") || i.text()), n.each(function (t) { var n = e(this), i = n.data("display"); s.find("ul").append(e("<li></li>").attr("data-value", n.val()).attr("data-display", i || null).addClass("option" + (n.is(":selected") ? " selected" : "") + (n.is(":disabled") ? " disabled" : "")).html(n.text())) }) } if ("string" == typeof t) return "update" == t ? this.each(function () { var t = e(this), n = e(this).next(".nice-select"), i = n.hasClass("open"); n.length && (n.remove(), s(t), i && t.next().trigger("click")) }) : "destroy" == t ? (this.each(function () { var t = e(this), s = e(this).next(".nice-select"); s.length && (s.remove(), t.css("display", "")) }), 0 == e(".nice-select").length && e(document).off(".nice_select")) : console.log('Method "' + t + '" does not exist.'), this; this.hide(), this.each(function () { var t = e(this); t.next().hasClass("nice-select") || s(t) }), e(document).off(".nice_select"), e(document).on("click.nice_select", ".nice-select", function (t) { var s = e(this); e(".nice-select").not(s).removeClass("open"), s.toggleClass("open"), s.hasClass("open") ? (s.find(".option"), s.find(".focus").removeClass("focus"), s.find(".selected").addClass("focus")) : s.focus() }), e(document).on("click.nice_select", function (t) { 0 === e(t.target).closest(".nice-select").length && e(".nice-select").removeClass("open").find(".option") }), e(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function (t) { var s = e(this), n = s.closest(".nice-select"); n.find(".selected").removeClass("selected"), s.addClass("selected"); var i = s.data("display") || s.text(); n.find(".current").text(i), n.prev("select").val(s.data("value")).trigger("change") }), e(document).on("keydown.nice_select", ".nice-select", function (t) { var s = e(this), n = e(s.find(".focus") || s.find(".list .option.selected")); if (32 == t.keyCode || 13 == t.keyCode) return s.hasClass("open") ? n.trigger("click") : s.trigger("click"), !1; if (40 == t.keyCode) { if (s.hasClass("open")) { var i = n.nextAll(".option:not(.disabled)").first(); i.length > 0 && (s.find(".focus").removeClass("focus"), i.addClass("focus")) } else s.trigger("click"); return !1 } if (38 == t.keyCode) { if (s.hasClass("open")) { var l = n.prevAll(".option:not(.disabled)").first(); l.length > 0 && (s.find(".focus").removeClass("focus"), l.addClass("focus")) } else s.trigger("click"); return !1 } if (27 == t.keyCode) s.hasClass("open") && s.trigger("click"); else if (9 == t.keyCode && s.hasClass("open")) return !1 }); var n = document.createElement("a").style; return n.cssText = "pointer-events:auto", "auto" !== n.pointerEvents && e("html").addClass("no-csspointerevents"), this } }(jQuery);

$(document).ready(function () {

    /******  Nice Select  ******/
    $('select').niceSelect();

    // /********* On scroll heder Sticky *********/
    function initHeaderSticky() {
        if (jQuery(document).height() > jQuery(window).height()) {
            if (jQuery(this).scrollTop() > 100) {
              jQuery('.site-header').addClass("fixed");
            } else {
              jQuery('.site-header').removeClass("fixed");
            }
          } 
        }
  
      $(document).ready(function () {
        initHeaderSticky()
      });
      $(window).on('resize scroll', function () {
        initHeaderSticky()
      });

          // /********* On scroll heder back *********/
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("header-sticky").style.top = "0";
      } else {
        document.getElementById("header-sticky").style.top = "-100px";
      }
      prevScrollpos = currentScrollPos;
    }

       /******  menu hover  ******/
       $(".menu-lnk.has-item").hover(function () {
        $(this).toggleClass("menu_active");
        $(this).find(".menu-dropdown").toggleClass("open_menu");
        $("body").toggleClass("no_scroll");
      });

    /********* Mobile Menu ********/
    $('.mobile-menu-button').on('click', function (e) {
        e.preventDefault();
        setTimeout(function () {
          $('body').addClass('no_scroll active_menu');
          $(".mobile-menu-wrapper").toggleClass("active_menu");
          $('.overlay').addClass('active');
        }, 50);
      });
  
      $('body').on('click', '.overlay, .menu-close-icon svg', function (e) {
        e.preventDefault();
        $('body').removeClass('no_scroll active_menu');
        $(".mobile-menu-wrapper").removeClass("active_menu");
        $('.overlay').removeClass('active');
      });
  
      /********* mobile stickybar ********/
      $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
          $(".mobile-stickybar").addClass('show');
        } else {
          $(".mobile-stickybar").removeClass('show');
        }
      });

      /*********  Multi-level accordion nav (header & faq) ********/
    $('.acnav-label').click(function () {
        var label = $(this);
        var parent = label.parent('.has-children');
        var list = label.siblings('.acnav-list');
        if (parent.hasClass('is-open')) {
          list.slideUp('fast');
          parent.removeClass('is-open');
        }
        else {
          list.slideDown('fast');
          parent.addClass('is-open');
        }
      });

    
    $('.faqs-acnav-label').click(function () {
      var label = $(this);
      var parent = label.parent('.faqs-has-children');
      var list = label.siblings('.faqs-acnav-list');

      // Close all other open sections
      $('.faqs-has-children').not(parent).removeClass('is-open');
      $('.faqs-acnav-list').not(list).slideUp('fast');

      // Toggle the clicked section
      if (parent.hasClass('is-open')) {
          list.slideUp('fast');
          parent.removeClass('is-open');
      } else {
          list.slideDown('fast');
          parent.addClass('is-open');
      }
  });
      /**************************/
       //  Header Search Popup  // 
      /**************************/
  
      $(".search-header a").click(function () {
        $(".search-popup").toggleClass("active");
        $("body").toggleClass("no_scroll");
        $('.overlay').addClass('active');
        $('body').addClass('search-overlay');
      });
      $(".close-search ,.overlay").click(function () {
        $(".search-popup").removeClass("active");
        $("body").removeClass("no_scroll"); +
        $('.overlay').removeClass('active');
        $('body').removeClass('search-overlay');
      });
  
      /**************************/
          //  cartdrawer Js // 
      /**************************/
  
        /********* Cart Popup ********/
      $('.main-cart').on('click', function (e) {
        e.preventDefault();
        setTimeout(function () {
          $('body').addClass('no_scroll cartopen');
          $('.overlay').addClass('active');
        }, 50);
      });
  
      $(document).on('click', '.overlay, .mini-cart-header .closecart', function (e) {
        e.preventDefault();
        $('.overlay').removeClass('active');
        $('body').removeClass('no_scroll cartopen');
        $('.coupon-popup').removeClass('active');
        $('.gift-popup').removeClass('active');
      });
  
      /********* qty spinner ********/
      var quantity = 0;
      $('.quantity-increment').click(function () {
        ;
        var t = $(this).siblings('.quantity');
        var quantity = parseInt($(t).val());
        $(t).val(quantity + 1);
      });
      $('.quantity-decrement').click(function () {
        var t = $(this).siblings('.quantity');
        var quantity = parseInt($(t).val());
        if (quantity > 1) {
          $(t).val(quantity - 1);
        }
      });
  
      /*********coupon popup ********/
      $(".coupon-icon").click(function () {
        $(".coupon-popup").addClass("active");
        $(".gift-popup").removeClass("active");
      });
      $(".close-coupon").click(function () {
        $(".coupon-popup").removeClass("active");
      });
  
      /********* gift popup ********/
      $(".gift-icon").click(function () {
        $(".gift-popup").addClass("active");
        $(".coupon-popup").removeClass("active");
      });
      $(".close-gift").click(function () {
        $(".gift-popup").removeClass("active");
      });

      /**************************/
        // footer acnav // 
  /**************************/

    $(".footer-acnav").on("click", function () {
    if ($(window).width() < 768) {
      if ($(this).hasClass("is-open")) {
          $(this).removeClass("is-open");
          $(this).siblings(".footer-acnav-list").slideUp(200);
      } else {
          $(".footer-acnav").removeClass("is-open");
          $(this).addClass("is-open");
          $(".footer-acnav-list").slideUp(200);
          $(this).siblings(".footer-acnav-list").slideDown(200);
      }
    }
  });

   /****  TAB Js ****/
   $("ul.tabs li").click(function () {
    var $this = $(this);
    var $theTab = $(this).attr("data-tab");
    if ($this.hasClass("active")) {
    } else {
        $this
            .closest(".tabs-wrapper")
            .find("ul.tabs li, .tabs-container .tab-content")
            .removeClass("active");
        $(
            '.tabs-container .tab-content[id="' +
            $theTab +
            '"], ul.tabs li[data-tab="' +
            $theTab +
            "]"
        ).addClass("active");
    }
    $(this).addClass("active");
});
 /**************************/
  //Subscribe popup Js // 
  /**************************/
  $('.subscribe-close-btn').click(function () {
    $('.subscribe-popup').slideUp();

  });
  // $('.subscribe-popup').hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 400) {
      $('.subscribe-popup').addClass('is-active');
    } else {
      $('.subscribe-popup').removeClass('is-active');
    }
  });

/********* mobile stickybar ********/
$(window).scroll(function () {
  if ($(window).scrollTop() > 100) {
    $(".mobile-stickybar").addClass('show');
  } else {
    $(".mobile-stickybar").removeClass('show');
  }
});

    /******* Cookie Js *******/
    $('.cookie-btn').click(function () {
      $('.cookie-popup').removeClass("active");
  });

   /******* Cookie Js *******/
   $('.notification-close-btn ').click(function () {
    $('.product-notification-popup').removeClass("active");
});


  /******* quick-view-popup Js *******/

  $(".qv-btn").click(function () {
    $(".quick-view-popup").toggleClass("active");
    $("body").toggleClass("no_scroll");
  });
  $(".quick-close-btn").click(function () {
    $(".quick-view-popup").removeClass("active");
    $("body").removeClass("no_scroll");
  });

  /**quickview-slider**/
  var swiper = new Swiper(".quickview-image-slider", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 800,
    navigation: {
      nextEl: ".quickview-btn-next.swiper-button-next",
      prevEl: ".quickview-btn-prev.swiper-button-prev",
    },
  });  

/*********  ask qustion Popup  ********/
$(".pro-features li a.ask-qus").click(function () {
  $(".ask-qus-popup").addClass("active");
  $("body").addClass("no_scroll");
  $('.overlay').addClass('active');
});
$('body').on('click', '.overlay , .close-btn', function () {
  $(".ask-qus-popup").removeClass("active");
  $("body").removeClass("no_scroll");
  $('.overlay').removeClass('active');
});
/**************************/
     /** Timer Counter **/
  /**************************/
  function makeTimer() {

    var endTime = new Date("05 july 2024 9:56:00 GMT+01:00");
    endTime = (Date.parse(endTime) / 1000);

    var now = new Date();
    now = (Date.parse(now) / 1000);

    var timeLeft = endTime - now;

    var days = Math.floor(timeLeft / 86400);
    var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
    var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
    var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

    if (hours < "10") { hours = "0" + hours; }
    if (minutes < "10") { minutes = "0" + minutes; }
    if (seconds < "10") { seconds = "0" + seconds; }

    $(".count-days").html(days);
    $(".count-hours").html(hours);
    $(".count-minites").html(minutes);
    $(".count-seconds").html(seconds);
  }
  setInterval(function () { makeTimer(); }, 1000);
 /**** categories-info-slider*****/
 var swiper = new Swiper(".categories-info-slider", {
  spaceBetween: 0,
  centeredSlides: true,
  speed: 2000,
  autoplay: {
    delay: 1,
  },
  loop: true,
  slidesPerView: 'auto',
  allowTouchMove: false,
  disableOnInteraction: true,
  Infinity:true,
});

  
/*** home banner slider **/
// var swiper1 = new Swiper(".testi-pdp-slider", {
//   speed: 800,
//   loop: true,
//   spaceBetween: 10,
//   slideToClickedSlide: true,
//   breakpoints: {
//     320: {
//       slidesPerView: 1,
//     },
//   },

// });
// var swiper2 = new Swiper(".testi-client-slider", {
//   speed: 800,
//   loop: true,
//   spaceBetween: 10,
//   slideToClickedSlide: true,
//   breakpoints: {
//     320: {
//       slidesPerView: 1,
//     },
//   },

// });
// swiper1.controller.control = swiper3;
// swiper2.controller.control = swiper3;
// var swiper3 = new Swiper(".testimonial-content-slider", {
//   speed: 800,
//   loop: true,
//   pagination: {
//     el: ".swiper-pagination",
//     type: "progressbar",
//   },
//   breakpoints: {
//     320: {
//       slidesPerView: 1,
//     },
//   },
  
// });
// swiper3.on('slideChange', function () {
//   console.log('slider moved');
//   var activeslide = swiper3.realIndex;
//   var totalslide = swiper3.slides.length;
//   console.log(activeslide);
//   $(".activeslide").html(activeslide + 1);
//   $(".totalslide").html(totalslide - 2);
// });


var swiper1 = new Swiper(".testi-pdp-slider", {
  speed: 800,
  loop: true,
  spaceBetween: 10,
  slidesPerView: 1,
  slideToClickedSlide: true,
  effect: "fade",
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
  },
});

var swiper2 = new Swiper(".testi-client-slider", {
  speed: 800,
  loop: true,
  slidesPerView: 1,
  spaceBetween: 0,
  slideToClickedSlide: true,
  effect: "fade",
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
  },
});

var swiper3 = new Swiper(".testimonial-content-slider", {
  speed: 800,
  loop: true,
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
  },
});

// Set controls after initializing all Swipers
swiper1.controller.control = swiper3;
swiper2.controller.control = swiper3;
swiper3.controller.control = [swiper1, swiper2];

// Add event listener for slide change
swiper3.on('slideChange', function () {
  console.log('slider moved');
  var activeslide = swiper3.realIndex;
  var totalslide = swiper3.slides.length;
  console.log(activeslide);
  $(".activeslide").html(activeslide + 1);
  $(".totalslide").html(totalslide - 2);
});

/** partner logo slider **/
var swiper = new Swiper(".partner-logo-slider", {
  spaceBetween: 20,
  slidesPerView: 6,
  loop: true,
  autoplay:true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    1200: {
      slidesPerView: 6,
    },
    992: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 3,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    0: {
      slidesPerView: 1,
    }
  },
});

/** partner logo slider **/
var swiper = new Swiper(".home-blog-slider", {
  spaceBetween: 20,
  slidesPerView: 3,
  loop: true,
  autoplay:true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    1200: {
      slidesPerView:3,
    },
    992: {
      slidesPerView: 3,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    0: {
      slidesPerView: 1,
    }
  },
  
});
/** portfolio-slider  **/
var swiper = new Swiper('.portfolio-slider ', {
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 6,
  slidesPerView: 6,
  centeredSlides: true,
  speed: 5000,
  autoplay: {
    delay: 1,
  },
  allowTouchMove: false,
  Infinity:true,
  breakpoints: {
    1200: {
      slidesPerView:6,
    },
    992: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 3,
    },
    576: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 2,
    }
  },
});


// /*********  product sec & product page slider *********/
var swiperProMain = null;
var swiperProduct = null;
var isSwiperProMainInitialized = false;
var isSwiperProductInitialized = false;

function initProMainSwiper() {
  swiperProMain = new Swiper(".pro-main-slider", {
    slidesPerView: 1,
    spaceBetween: 10,
    freeMode: false,
    simulateTouch: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: "auto",
        spaceBetween: 0,
        freeMode: false,
        simulateTouch: false,
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      420: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
    },
  });
}

function initProductSwiper() {
  swiperProduct = new Swiper(".product-slider", {
    spaceBetween: 20,
    slidesPerView: 3,
    autoHeight: true,
    loop: true,
    centeredSlides: true,
    navigation: {
      nextEl: ".product-arrow.swiper-button-next",
      prevEl: ".product-arrow.swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        centeredSlides: true,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 15,
        centeredSlides: false,
      },
      0: {
        slidesPerView: 1,
      }
    },
  });
}

function destroySwiper(swiperInstance) {
  if (swiperInstance !== null) {
    swiperInstance.destroy();
    swiperInstance = null;
  }
}

function handleSwiper() {
  if (jQuery(window).width() < 768) {
    if (!isSwiperProMainInitialized && $('.swiper').hasClass('pro-main-slider')) {
      initProMainSwiper();
      isSwiperProMainInitialized = true;
    }
    if (!isSwiperProductInitialized && $('.swiper').hasClass('product-slider')) {
      initProductSwiper();
      isSwiperProductInitialized = true;
    }
  } else {
    if (isSwiperProMainInitialized) {
      destroySwiper(swiperProMain);
      isSwiperProMainInitialized = false;
    }
    if (isSwiperProductInitialized) {
      destroySwiper(swiperProduct);
      isSwiperProductInitialized = false;
    }
  }
}

// Function to handle resizing
function handleResize() {
  $(window).resize(function () {
    handleSwiper();
  }).trigger('resize'); // Trigger resize event on page load
}

// Call handleResize function on page load
$(document).ready(function () {
  handleResize();
});

//** product review js **//
$('.product-review').click(function () {
  $('.product-review-form').toggleClass("showform");
});

/***** product-add-cart-stickey *****/
if($('body').hasClass('product')){
  $.fn.isInViewport = function() {
      var elementTop = this.offset().top;
      var elementBottom = elementTop + this.outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();
      return elementBottom > viewportTop && elementTop < viewportBottom;
  };
  $(window).scroll(function() {
      if ($('.pro-cart-btn').isInViewport()) {
        $('.products-add-cart-sticky').removeClass('show_btn');
      } else {
        $('.products-add-cart-sticky').addClass('show_btn');
      }
  });
}

 /*********************************/
       /** Collection Filter **/
  /*********************************/

  if ($('.product-listing-section').hasClass('product-listing-section')) {
    $('.filter-title').on('click', function (e) {
      e.preventDefault();
      setTimeout(function () {
        $('body').addClass('no_scroll filter_open');
        $('.overlay').addClass('active');
      }, 50);
    });
    $('body').on('click', '.overlay, .close-filter', function (e) {
      e.preventDefault();
      $('.overlay').removeClass('active');
      $('body').removeClass('no_scroll filter_open');
    });
  }

  /********* Mobile Filter Popup ********/
  if ($('.product-listing-section').hasClass('collection-leftbar') ) {
    // $(window).resize(function () {
    $(window).on('resize load', function () {
      if ($(window).width() < 768) {
        $('.filter-title').on('click', function (e) {
          e.preventDefault();
          setTimeout(function () {
            $('body').addClass('no_scroll filter_open');
            $('.overlay').addClass('active');
          }, 50);
        });
        $('body').on('click', '.overlay , .close-filter', function (e) {
          e.preventDefault();
          $('.overlay').removeClass('active');
          $('body').removeClass('no_scroll filter_open');
        });
      } else {
        $('.filter-title').off('click');
        $('.overlay').removeClass('active');
        $('body').removeClass('no_scroll filter_open');
      }
    });
  }

  /**************************/
        /** counter js **/
  /**************************/

  $('.counting').each(function () {
    var $this = $(this),
      countTo = $this.attr('data-count');

    $({ countNum: $this.text() }).animate({
      countNum: countTo
    },

      {
        duration: 3000,
        easing: 'linear',
        step: function () {
          $this.text(Math.floor(this.countNum));
        },
        complete: function () {
          $this.text(this.countNum);
        }

      });
  });
 /** Team slider **/
 var swiper = new Swiper(".about-team-slider", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  speed: 800,
  autoplay:true,
  navigation: {
    nextEl: ".team-arrow.swiper-button-next",
    prevEl: ".team-arrow.swiper-button-prev",
  },
  breakpoints: {
    1200: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 3,
    },
    576: {
      slidesPerView: 2,
    }
  },
});


});