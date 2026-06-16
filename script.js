const swiper = new Swiper(".brandSwiper", {
    loop: true,
    freeMode: true,
    speed: 5000,
    allowTouchMove: false,
    spaceBetween: 30,

    autoplay: {
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: true,
    },

    breakpoints: {
        0: {
            slidesPerView: 4,
        },
        768: {
            slidesPerView: 5, 
        },
        1024: {
            slidesPerView: 8 
        },
    },
});