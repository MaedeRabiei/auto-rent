import 'flowbite';
import Swiper from 'swiper';

import { Autoplay, FreeMode, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

if (document.querySelector('.brandSwiper')) {
  new Swiper('.brandSwiper', {
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
      0: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 5,
      },
      1024: {
        slidesPerView: 8,
      },
    },
  });
}

/* =====================================
   اسلایدر نظرات
===================================== */

if (document.querySelector('.comments-s')) {
  new Swiper('.comments-s', {
    modules: [Autoplay, Navigation],

    spaceBetween: 20,
    centeredSlides: true,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    speed: 800,

    navigation: {
      nextEl: '.comments-next',
      prevEl: '.comments-prev',
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
    },
  });
}

/* =====================================
   اسلایدر مجله
===================================== */

if (document.querySelector('.magazine-s')) {
  new Swiper('.magazine-s', {
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

/* =====================================
   اسلایدر مقالات
===================================== */

if (document.querySelector('.Articles')) {
  new Swiper('.Articles', {
    spaceBetween: 12,

    breakpoints: {
      0: {
        slidesPerView: 'auto',
      },
      768: {
        slidesPerView: 'auto',
      },
    },
  });
}

/* =====================================
   اسلایدر مقالات دوم
===================================== */

if (document.querySelector('.Articles-two')) {
  new Swiper('.Articles-two', {
    spaceBetween: 12,

    breakpoints: {
      0: {
        slidesPerView: 'auto',
      },
      768: {
        slidesPerView: 'auto',
      },
    },
  });
}

/* =====================================
   منوی پایین موبایل
===================================== */

const items = ['home', 'search', 'notification', 'profile'];

window.setActive = function (active) {
  items.forEach((id) => {
    const btn = document.getElementById('nav-' + id);

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
};

/* =====================================
   گالری تصاویر خودرو - صفحه دوم
===================================== */

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

  if (!mainImg) return;

  if (!images.length) return;

  current = (index + images.length) % images.length;

  mainImg.classList.add('fade');

  setTimeout(() => {
    mainImg.src = images[current];
    mainImg.classList.remove('fade');
  }, 200);

  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle('border-blue-500', i === current);
    thumb.classList.toggle('border-transparent', i !== current);
  });

  if (counter) {
    counter.textContent = `${current + 1} / ${images.length}`;
  }
}

// تصویر قبلی و بعدی
window.navigate = function (dir) {
  updateUI(current + Number(dir));
};

// انتخاب مستقیم تصویر
window.goTo = function (index) {
  updateUI(Number(index));
};

// نمایش تصویر اول
if (document.getElementById('mainImage')) {
  updateUI(0);
}

/* =====================================
   نقشه صفحه تماس با ما - Leaflet
===================================== */

(() => {
  const mapElement = document.getElementById('map');

  // فقط در صفحه‌ای اجرا شود که نقشه دارد
  if (!mapElement) return;

  // دریافت Leaflet
  const L = window.L;

  if (!L) {
    console.error('Leaflet لود نشده است.');
    return;
  }

  const addressInput = document.getElementById('addressInput');
  const searchButton = document.getElementById('searchAddress');
  const mapMessage = document.getElementById('mapMessage');

  const latitudeInput = document.getElementById('latitude');
  const longitudeInput = document.getElementById('longitude');
  const selectedAddressInput = document.getElementById('selectedAddress');

  // ساخت نقشه و موقعیت اولیه تهران
  const map = L.map('map').setView([35.6892, 51.389], 12);

  // نمایش نقشه
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map);

  // نشانگر انتخاب موقعیت
  let marker = null;

  // نمایش پیام
  function showMessage(message, error = false) {
    if (!mapMessage) return;

    mapMessage.textContent = message;
    mapMessage.classList.toggle('text-red-500', error);
    mapMessage.classList.toggle('text-gray-500', !error);
  }

  // ثبت موقعیت انتخاب‌شده
  async function selectLocation(lat, lng, address = '') {
    latitudeInput.value = lat;
    longitudeInput.value = lng;

    if (marker) {
      marker.setLatLng([lat, lng]);
    } else {
      marker = L.marker([lat, lng], {
        draggable: true,
      }).addTo(map);

      // تغییر موقعیت با کشیدن نشانگر
      marker.on('dragend', async function () {
        const position = marker.getLatLng();
        await getAddress(position.lat, position.lng);
      });
    }

    if (address) {
      addressInput.value = address;
      selectedAddressInput.value = address;
    }

    map.setView([lat, lng], 16);
  }

  // تبدیل مختصات به آدرس
  async function getAddress(lat, lng) {
    showMessage('در حال دریافت آدرس...');

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );

      if (!response.ok) {
        throw new Error('خطا در دریافت آدرس');
      }

      const data = await response.json();
      const address = data.display_name || 'آدرس پیدا نشد';

      await selectLocation(lat, lng, address);
      showMessage('موقعیت با موفقیت انتخاب شد.');
    } catch (error) {
      console.error(error);
      latitudeInput.value = lat;
      longitudeInput.value = lng;
      selectedAddressInput.value = '';
      showMessage('دریافت آدرس انجام نشد؛ مختصات ثبت شد.', true);
    }
  }

  // جست‌وجوی آدرس
  async function searchLocation() {
    const query = addressInput.value.trim();

    if (!query) {
      showMessage('ابتدا آدرس موردنظر را وارد کنید.', true);
      return;
    }

    showMessage('در حال جست‌وجوی آدرس...');

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error('خطا در جست‌وجوی آدرس');
      }

      const data = await response.json();

      if (!data.length) {
        showMessage('آدرسی پیدا نشد. عبارت دیگری وارد کنید.', true);
        return;
      }

      const result = data[0];
      const lat = Number(result.lat);
      const lng = Number(result.lon);

      await selectLocation(lat, lng, result.display_name);
      showMessage('آدرس پیدا شد و روی نقشه ثبت شد.');
    } catch (error) {
      console.error(error);
      showMessage('جست‌وجوی آدرس با خطا مواجه شد.', true);
    }
  }

  // کلیک روی دکمه جست‌وجو
  if (searchButton) {
    searchButton.addEventListener('click', searchLocation);
  }

  // جست‌وجو با کلید Enter
  if (addressInput) {
    addressInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        searchLocation();
      }
    });
  }

  // انتخاب موقعیت با کلیک روی نقشه
  map.on('click', async (event) => {
    await getAddress(event.latlng.lat, event.latlng.lng);
  });

  // انتخاب موقعیت اولیه دفتر مرکزی
  const officeAddress =
    'خیابان شادمان، خیابان آزادی، میدان آزادی، تهران، ایران';

  if (addressInput) {
    addressInput.value = officeAddress;
  }

  searchLocation();

  // اصلاح اندازه نقشه پس از نمایش
  setTimeout(() => {
    map.invalidateSize();
  }, 300);
})();

/* =====================================
   باز شدن تقویم و انتخاب‌گر ساعت
===================================== */

(() => {
  const dateTimeInputs = document.querySelectorAll(
    'input[type="date"], input[type="time"]'
  );

  dateTimeInputs.forEach((input) => {
    const container = input.closest('.rent-time');

    if (!container) return;

    container.addEventListener('click', () => {
      if (typeof input.showPicker === 'function') {
        input.showPicker();
      } else {
        input.focus();
      }
    });
  });
})();

const searchPanel = document.getElementById('search-panel');
const searchClose = document.getElementById('search-close');
const searchOverlay = document.getElementById('search-overlay');
const searchInput = document.getElementById('search-input');
const searchClear = document.getElementById('search-clear');
const searchHistory = document.getElementById('search-history');
const searchTriggers = document.querySelectorAll('[data-search-open]');

function openSearch() {
  searchPanel.classList.remove('hidden');
  searchTriggers.forEach((b) => b.setAttribute('aria-expanded', 'true'));
  searchInput.focus();
  if (typeof setActive === 'function') setActive('search');
}

function closeSearch() {
  searchPanel.classList.add('hidden');
  searchTriggers.forEach((b) => b.setAttribute('aria-expanded', 'false'));
  if (typeof setActive === 'function') setActive('home');
}

searchTriggers.forEach((btn) =>
  btn.addEventListener('click', () => {
    searchPanel.classList.contains('hidden') ? openSearch() : closeSearch();
  })
);

searchClose.addEventListener('click', closeSearch);
searchOverlay.addEventListener('click', closeSearch);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSearch();
});

document.querySelectorAll('.search-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    searchInput.value = chip.dataset.search;
    searchInput.focus();
  });
});

searchClear.addEventListener('click', () => searchHistory.remove());
