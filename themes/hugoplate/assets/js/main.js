// main script
(function () {
  "use strict";

  // ####################### Testimonial Slider #########################
  new Swiper(".testimonial-slider", {
    spaceBetween: 24,
    loop: true,
    pagination: {
      el: ".testimonial-slider-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 1, // change to number of testimonials you want to show
      },
    },
  });
})();
