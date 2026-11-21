import Swiper from 'swiper';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'flowbite';

// تنظیمات اسلایدر برندها
const brandElement = document.querySelector('.brandSwiper');

if (brandElement) {
  new Swiper(brandElement, {
    modules: [Autoplay, FreeMode],
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
      0: { slidesPerView: 4 },
      768: { slidesPerView: 5 },
      1024: { slidesPerView: 8 },
    },
  });
}

// اسلایدر نظرات
const commentsElement = document.querySelector('.comments-s');

if (commentsElement) {
  new Swiper(commentsElement, {
    modules: [Autoplay, Navigation],
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
      nextEl: '.comments-next',
      prevEl: '.comments-prev',
    },
  });
}

// اسلایدر مجله
const magazineElement = document.querySelector('.magazine-s');

if (magazineElement) {
  new Swiper(magazineElement, {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    navigation: {
      nextEl: '.magazine-next',
      prevEl: '.magazine-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  });
}

// اسلایدر مقالات اول
const articlesElement = document.querySelector('.Articles');

if (articlesElement) {
  new Swiper(articlesElement, {
    spaceBetween: 12,
    breakpoints: {
      0: { slidesPerView: 'auto' },
      768: { slidesPerView: 'auto' },
    },
  });
}

// اسلایدر مقالات دوم
const articlesElement2 = document.querySelector('.Articles-two');

if (articlesElement2) {
  new Swiper(articlesElement2, {
    spaceBetween: 12,
    breakpoints: {
      0: { slidesPerView: 'auto' },
      768: { slidesPerView: 'auto' },
    },
  });
}

// منوی پایین صفحه
const items = ['home', 'search', 'notification', 'profile'];

function setActive(active) {
  items.forEach((id) => {
    const btn = document.getElementById('nav-' + id);

    // اگر دکمه در صفحه وجود نداشت، از آن عبور کن
    if (!btn) return;

    const label = btn.querySelector('.nav-label');

    if (id === active) {
      btn.classList.remove('text-gray-400', 'px-3');
      btn.classList.add('bg-[#194BF0]', 'text-white', 'px-4');

      if (label) {
        label.classList.remove('max-w-0', 'opacity-0');
        label.classList.add('max-w-[80px]', 'opacity-100');
      }
    } else {
      btn.classList.remove('bg-[#194BF0]', 'text-white', 'px-4');
      btn.classList.add('text-gray-400', 'px-3');

      if (label) {
        label.classList.remove('max-w-[80px]', 'opacity-100');
        label.classList.add('max-w-0', 'opacity-0');
      }
    }
  });
}

// اسلایدر تصاویر صفحه خودرو
// فایل‌های داخل public در خروجی Vite مستقیماً در ریشه منتشر می‌شوند.
const images = [
  `${import.meta.env.BASE_URL}img/slider-black-car.png`,
  `${import.meta.env.BASE_URL}img/slider-items.jpg`,
  `${import.meta.env.BASE_URL}img/slider-items2.jpg`,
  `${import.meta.env.BASE_URL}img/slider-item3.jpg`,
  `${import.meta.env.BASE_URL}img/slider-items4.jpg`,
  `${import.meta.env.BASE_URL}img/slider-items5.jpg`,
];

let current = 0;

function updateUI(index) {
  const mainImg = document.getElementById('mainImage');
  const thumbs = document.querySelectorAll('.thumb');
  const counter = document.getElementById('counter');

  // اگر عناصر اسلایدر در صفحه نبودند، تابع متوقف شود
  if (!mainImg || !counter) return;

  if (index < 0 || index >= images.length) return;

  mainImg.classList.add('fade');

  setTimeout(() => {
    mainImg.src = images[index];
    mainImg.classList.remove('fade');
  }, 200);

  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle('border-blue-500', i === index);
    thumb.classList.toggle('border-transparent', i !== index);
  });

  counter.textContent = `${index + 1} / ${images.length}`;
  current = index;
}

function navigate(dir) {
  updateUI((current + dir + images.length) % images.length);
}

function goTo(index) {
  updateUI(Number(index));
}

const dateInputs = document.querySelectorAll('input[type="date"]');

dateInputs.forEach((input) => {
  input.addEventListener('click', () => input.showPicker());
});

// قابل دسترسی کردن توابع برای onclick داخل HTML
window.setActive = setActive;
window.navigate = navigate;
window.goTo = goTo;
