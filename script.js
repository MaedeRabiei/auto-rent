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
            slidesPerView: 2,
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


const items = ['home', 'search', 'notification', 'profile'];

function setActive(active) {
    items.forEach(id => {
        const btn = document.getElementById('nav-' + id);
        const label = btn.querySelector('.nav-label');

        if (id === active) {
            btn.classList.remove('text-gray-400', 'px-3');
            btn.classList.add('bg-[#194BF0]', 'text-white', 'px-4');
            label.classList.remove('max-w-0', 'opacity-0');
            label.classList.add('max-w-[80px]', 'opacity-100');
        } else {
            btn.classList.remove('bg-[#194BF0]', 'text-white', 'px-4');
            btn.classList.add('text-gray-400', 'px-3');
            label.classList.remove('max-w-[80px]', 'opacity-100');
            label.classList.add('max-w-0', 'opacity-0');
        }
    });
}
