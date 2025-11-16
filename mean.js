// =====================
// INDEX 1
// =====================
$(document).ready(function () {
  $(".faq-question").on("click", function () {
    var $faqItem = $(this).closest(".faq-item");

    $(".faq-item").not($faqItem).removeClass("active");

    $faqItem.toggleClass("active");
  });

  $("#phone").on("input", function () {
    var value = $(this).val().replace(/\D/g, "");
    var formatted = "+7";

    if (value.length > 1) {
      formatted += " (" + value.substring(1, 4);
    }
    if (value.length >= 4) {
      formatted += ") " + value.substring(4, 7);
    }
    if (value.length >= 7) {
      formatted += "-" + value.substring(7, 9);
    }
    if (value.length >= 9) {
      formatted += "-" + value.substring(9, 11);
    }

    $(this).val(formatted);
  });

  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    var phone = $("#phone").val();
    var email = $("#email").val();
    var question = $("#question").val();

    if (phone && email && question) {
      $("#successMessage").fadeIn(400);

      setTimeout(function () {
        $("#contactForm")[0].reset();
        $("#successMessage").fadeOut(400);
      }, 3000);

      console.log("Form submitted:", {
        phone: phone,
        email: email,
        question: question,
      });
    } else {
      alert("Пожалуйста, заполните все поля");
    }
  });

  $(".form-input, .form-textarea").on("focus", function () {
    $(this).animate(
      {
        boxShadow: "0 0 0 3px rgba(255,255,255,0.3)",
      },
      200
    );
  });

  $(".form-input, .form-textarea").on("blur", function () {
    $(this).animate(
      {
        boxShadow: "none",
      },
      200
    );
  });
});

// =====================
// INDEX 2
// =====================
$(document).ready(function () {
  let currentIndex = 0;
  const certificates = [
    "certificate1.jpg",
    "certificate2.jpg",
    "certificate3.jpg",
    "certificate4.jpg",
  ];

  function updateCertificates() {
    $(".certificate")
      .eq(0)
      .fadeOut(300, function () {
        $(this).find("img").attr("src", certificates[currentIndex]);
        $(this).fadeIn(300);
      });

    $(".certificate")
      .eq(1)
      .fadeOut(300, function () {
        let nextIndex = (currentIndex + 1) % certificates.length;
        $(this).find("img").attr("src", certificates[nextIndex]);
        $(this).fadeIn(300);
      });
  }

  $(".nav-arrow.right").on("click", function () {
    currentIndex = (currentIndex + 1) % certificates.length;
    updateCertificates();
  });

  $(".nav-arrow.left").on("click", function () {
    currentIndex =
      (currentIndex - 1 + certificates.length) % certificates.length;
    updateCertificates();
  });

  $(".certificate").on("click", function () {
    $(this).toggleClass("zoomed");
  });

  $(".cta-button").hover(
    function () {
      $(this).css("transform", "translateY(-2px)");
    },
    function () {
      $(this).css("transform", "translateY(0)");
    }
  );
});

// =====================
// INDEX 3
// =====================
$(document).ready(function () {
  let currentSlide = 0;
  let currentTab = "yandex";

  $(".tab").on("click", function () {
    const tabName = $(this).data("tab");

    $(".tab").removeClass("active");
    $(this).addClass("active");

    $(".tab-content").removeClass("active");
    $("#" + tabName).addClass("active");

    currentTab = tabName;
    currentSlide = 0;
    updateSlider();
  });

  function updateSlider() {
    const $activeContent = $(".tab-content.active");
    const $container = $activeContent.find(".reviews-container");
    const $cards = $container.find(".review-card");
    const cardWidth = $cards.outerWidth(true);
    const offset = -currentSlide * cardWidth;

    $container.css({
      transform: `translateX(${offset}px)`,
      transition: "transform 0.5s ease",
    });
  }

  $(".nav-arrow.right").on("click", function () {
    const $activeContent = $(".tab-content.active");
    const $cards = $activeContent.find(".review-card");
    const maxSlide = $cards.length - 2;

    if (currentSlide < maxSlide) {
      currentSlide++;
      updateSlider();
    }
  });

  $(".nav-arrow.left").on("click", function () {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlider();
    }
  });

  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  $(".reviews-container").on("mousedown touchstart", function (e) {
    isDragging = true;
    startX =
      e.type === "mousedown" ? e.pageX : e.originalEvent.touches[0].pageX;
    $(this).css("transition", "none");
  });

  $(document).on("mousemove touchmove", function (e) {
    if (!isDragging) return;

    currentX =
      e.type === "mousemove" ? e.pageX : e.originalEvent.touches[0].pageX;
    const diff = currentX - startX;

    const $activeContent = $(".tab-content.active");
    const $container = $activeContent.find(".reviews-container");
    const $cards = $container.find(".review-card");
    const cardWidth = $cards.outerWidth(true);
    const offset = -currentSlide * cardWidth + diff;

    $container.css("transform", `translateX(${offset}px)`);
  });

  $(document).on("mouseup touchend", function () {
    if (!isDragging) return;
    isDragging = false;

    const diff = currentX - startX;

    if (Math.abs(diff) > 100) {
      if (diff > 0 && currentSlide > 0) {
        currentSlide--;
      } else if (diff < 0) {
        const $activeContent = $(".tab-content.active");
        const $cards = $activeContent.find(".review-card");
        const maxSlide = $cards.length - 2;
        if (currentSlide < maxSlide) {
          currentSlide++;
        }
      }
    }

    updateSlider();
  });

  $(document).on("keydown", function (e) {
    if (e.keyCode === 37) {
      $(".nav-arrow.left").trigger("click");
    } else if (e.keyCode === 39) {
      $(".nav-arrow.right").trigger("click");
    }
  });

  $(window).on("resize", function () {
    updateSlider();
  });
});




// =====================
// INDEX 4
// =====================$

$(document).ready(function () {

    /* ============================
       Drawer OPEN / CLOSE
    ============================= */

    function openDrawer() {
        $('.drawer-menu, .drawer-overlay').addClass('active');
        $('body').css('overflow', 'hidden');

        // Hamburger → X animatsiya
        $('.drawer-btn span').eq(0).css({ transform: 'translateY(9px) rotate(45deg)' });
        $('.drawer-btn span').eq(1).css({ opacity: '0' });
        $('.drawer-btn span').eq(2).css({ transform: 'translateY(-9px) rotate(-45deg)' });
    }

    function closeDrawer() {
        $('.drawer-menu, .drawer-overlay').removeClass('active');
        $('body').css('overflow', 'auto');

        // Hamburgerni qaytarish
        $('.drawer-btn span').css({ transform: 'none', opacity: '1' });
    }

    // Button
    $('.drawer-btn').on('click', openDrawer);
    $('.drawer-close, .drawer-overlay').on('click', closeDrawer);

    // ESC bilan yopish
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && $('.drawer-menu').hasClass('active')) {
            closeDrawer();
        }
    });

    /* ============================
       Anchor link bosilganda yopish
    ============================= */
    $('.drawer-content a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        let target = $(this).attr('href');

        closeDrawer();

        if ($(target).length) {
            setTimeout(() => {
                $('html, body').animate({
                    scrollTop: $(target).offset().top - 100
                }, 700);
            }, 300);
        }
    });

    /* ============================
       Scroll paytida Drawer button effekti
    ============================= */

    $(window).on('scroll', function () {
        $('.drawer-btn').css({
            opacity: $(this).scrollTop() > 100 ? '0.8' : '1'
        });
    });

    /* ============================
        Drawer scroll shadow effekti
    ============================= */

    $('.drawer-menu').on('scroll', function () {
        $('.drawer-close').css({
            boxShadow: $(this).scrollTop() > 50
                ? '0 6px 20px rgba(231,76,60,0.5)'
                : '0 4px 15px rgba(231,76,60,0.4)'
        });
    });

    /* ============================
        Responsive — 1024px dan katta bo'lsa yopish
    ============================= */
    $(window).on('resize', function () {
        if ($(window).width() > 1024) closeDrawer();
    });

    /* ============================
        Touch Swipe → drawer yopish
    ============================= */

    let startX = 0;

    $('.drawer-menu').on('touchstart', function (e) {
        startX = e.changedTouches[0].screenX;
    });

    $('.drawer-menu').on('touchend', function (e) {
        let endX = e.changedTouches[0].screenX;
        if (startX - endX > 50) closeDrawer();
    });

    /* ============================
        Drawer open → fade content
    ============================= */

    $('.drawer-menu').on('transitionend', function () {
        $(this).find('.drawer-content').css({
            opacity: $(this).hasClass('active') ? '1' : '0'
        });
    });

    /* ============================
        Hover animatsiya
    ============================= */

    $('.drawer-btn').hover(
        function () {
            if (!$('.drawer-menu').hasClass('active')) {
                $(this).css({ transform: 'scale(1.05)' });
            }
        },
        function () {
            if (!$('.drawer-menu').hasClass('active')) {
                $(this).css({ transform: 'scale(1)' });
            }
        }
    );

    /* ============================
        Initial animation
    ============================= */
    setTimeout(() => {
        $('.drawer-btn').css({ opacity: '1' });
    }, 400);

});
