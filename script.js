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

const commentsSwiper = new Swiper(".comments-s", {
    spaceBetween: 20,
    centeredSlides: true,



    breakpoints: {
        0: {
            slidesPerView: 1,
        },

        768: {
            slidesPerView: 2,
            centeredSlides: false,
        },
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    speed: 800,

    navigation: {
        nextEl: ".comments-next",
        prevEl: ".comments-prev",
    },

});
const magazineSwiper = new Swiper(".magazine-s", {
    spaceBetween: 40,
    centeredSlides: true,



    breakpoints: {
        0: {
            slidesPerView:2,
        },

        768: {
            slidesPerView: 3,
            centeredSlides: false,
        },
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    speed: 800,

    navigation: {
        nextEl: ".magazine-prev",
        prevEl: ".magazine-next",
    },

});