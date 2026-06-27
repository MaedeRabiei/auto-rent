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
    centeredSlidesBounds: true,



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


const ArticlesSwiper = new Swiper(".Articles", {
    spaceBetween: 12,
    dir: "rtl",
    breakpoints: {
        0: {
            slidesPerView: "auto",
        },
        768: {
            slidesPerView: "auto",
        },
    },
});
// autoplay: {
//     delay: 3000,
//     disableOnInteraction: false,
// },
// speed: 800,


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


// slider page2 
const images = [
    "/public/img/slider-black-car.png",
    "/public/img/slider-items.jpg",
    "./public/img/slider-items2.jpg",
    "./public/img/slider-item3.jpg",
    "./public/img/slider-items4.jpg",
    "./public/img/slider-items5.jpg"
];

let current = 0;

function updateUI(index) {
    const mainImg = document.getElementById('mainImage');
    const thumbs = document.querySelectorAll('.thumb');
    const counter = document.getElementById('counter');

    mainImg.classList.add('fade');
    setTimeout(() => {
        mainImg.src = images[index];
        mainImg.classList.remove('fade');
    }, 200);

    thumbs.forEach((t, i) => {
        t.classList.toggle('border-blue-500', i === index);
        t.classList.toggle('border-transparent', i !== index);
    });

    counter.textContent = (index + 1) + ' / ' + images.length;
    current = index;
}

function navigate(dir) {
    updateUI((current + dir + images.length) % images.length);
}

function goTo(index) {
    updateUI(index);
}