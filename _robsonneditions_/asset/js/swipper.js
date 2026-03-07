var swiper = new Swiper(".mySwiper", {
    speed: 800,
    slidesPerView: 3,
    spaceBetween: 30,
    centeredSlides: true,
    fade: true,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev",
    // },
  });