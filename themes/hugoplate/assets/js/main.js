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
        slidesPerView: 2, // change to number of testimonials you want to show
      },
    },
  });
})();


document.getElementById("contactForm").addEventListener("submit", function (e) {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;
  if (name==="" || email==="" || subject==="" || message==="") {
    e.preventDefault();
    alert("Please fill in all required fields");
  }
});
