import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

window.L = L;



(() => {
  function initCarGallery() {
    const mainImage = document.getElementById('mainImage');
    const thumbnailsContainer = document.getElementById('thumbnails');
    const counter = document.getElementById('counter');

    if (!mainImage || !thumbnailsContainer) return;

    const thumbnails = Array.from(
      thumbnailsContainer.querySelectorAll('.thumb img')
    );

    if (thumbnails.length === 0) return;

    let currentIndex = 0;

    function showImage(index) {
      currentIndex = (index + thumbnails.length) % thumbnails.length;

      const selectedImage = thumbnails[currentIndex];

      mainImage.src = selectedImage.src;
      mainImage.alt = selectedImage.alt || `تصویر خودرو ${currentIndex + 1}`;

      if (counter) {
        counter.textContent = `${currentIndex + 1} / ${thumbnails.length}`;
      }

      thumbnails.forEach((image, imageIndex) => {
        const thumbnail = image.closest('.thumb');

        if (!thumbnail) return;

        thumbnail.classList.toggle(
          'border-blue-500',
          imageIndex === currentIndex
        );

        thumbnail.classList.toggle(
          'border-transparent',
          imageIndex !== currentIndex
        );

        thumbnail.setAttribute(
          'aria-current',
          imageIndex === currentIndex ? 'true' : 'false'
        );
      });
    }

    window.navigate = function (step) {
      showImage(currentIndex + Number(step || 0));
    };

    window.goTo = function (index) {
      showImage(Number(index));
    };

    thumbnails.forEach((image, index) => {
      const thumbnail = image.closest('.thumb');

      if (!thumbnail) return;

      thumbnail.setAttribute('role', 'button');
      thumbnail.setAttribute('tabindex', '0');
      thumbnail.setAttribute('aria-label', `نمایش تصویر ${index + 1}`);

      thumbnail.addEventListener('click', () => {
        showImage(index);
      });

      thumbnail.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          showImage(index);
        }
      });
    });

    showImage(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarGallery);
  } else {
    initCarGallery();
  }
})();

/* =====================================
   نقشه انتخاب آدرس با Leaflet
===================================== */

(() => {
  const mapElement = document.getElementById('map');

  if (!mapElement || !window.L) return;

  const addressInput = document.getElementById('addressInput');
  const searchButton = document.getElementById('searchAddress');
  const message = document.getElementById('mapMessage');

  const latitudeInput = document.getElementById('latitude');
  const longitudeInput = document.getElementById('longitude');
  const selectedAddress = document.getElementById('selectedAddress');

  const map = window.L.map('map').setView([35.6892, 51.389], 12);

  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
  }).addTo(map);

  let marker = null;

  function updateCoordinates(lat, lng) {
    if (latitudeInput) latitudeInput.value = lat;
    if (longitudeInput) longitudeInput.value = lng;
  }

  function updateMarker(lat, lng, address = '') {
    const position = [lat, lng];

    if (marker) {
      marker.setLatLng(position);
    } else {
      marker = window.L.marker(position).addTo(map);
    }

    if (address) {
      marker.bindPopup(address).openPopup();

      if (selectedAddress) {
        selectedAddress.value = address;
      }
    }

    updateCoordinates(lat, lng);
  }

  if (searchButton && addressInput && message) {
    async function searchAddress() {
      const address = addressInput.value.trim();

      if (!address) {
        message.textContent = 'ابتدا آدرس را وارد کن.';
        return;
      }

      message.textContent = 'در حال جست‌وجوی آدرس...';
      searchButton.disabled = true;

      try {
        const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(address)}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('خطا در دریافت اطلاعات آدرس');
        }

        const results = await response.json();

        if (!results.length) {
          message.textContent = 'آدرسی پیدا نشد.';
          return;
        }

        const place = results[0];
        const lat = Number(place.lat);
        const lng = Number(place.lon);

        map.setView([lat, lng], 16);
        updateMarker(lat, lng, place.display_name);

        message.textContent = 'موقعیت پیدا شد.';
      } catch (error) {
        message.textContent = 'خطا در دریافت اطلاعات نقشه.';
        console.error(error);
      } finally {
        searchButton.disabled = false;
      }
    }

    searchButton.addEventListener('click', searchAddress);

    addressInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        searchAddress();
      }
    });
  }

  map.on('click', (event) => {
    const { lat, lng } = event.latlng;

    updateMarker(lat, lng);

    if (message) {
      message.textContent = 'موقعیت جدید انتخاب شد.';
    }
  });

  setTimeout(() => {
    map.invalidateSize();
  }, 200);
})();
