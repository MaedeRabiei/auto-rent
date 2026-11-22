const mapElement = document.getElementById('map');

if (mapElement && window.L) {
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

  let marker;

  if (searchButton && addressInput && message) {
    async function searchAddress() {
      const address = addressInput.value.trim();

      if (!address) {
        message.textContent = 'ابتدا آدرس را وارد کن.';
        return;
      }

      message.textContent = 'در حال جست‌وجوی آدرس...';

      try {
        const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(address)}`;

        const response = await fetch(url);
        const results = await response.json();

        if (!results.length) {
          message.textContent = 'آدرسی پیدا نشد.';
          return;
        }

        const place = results[0];
        const lat = Number(place.lat);
        const lng = Number(place.lon);

        map.setView([lat, lng], 16);

        if (marker) {
          marker.setLatLng([lat, lng]);
        } else {
          marker = window.L.marker([lat, lng]).addTo(map);
        }

        marker.bindPopup(place.display_name).openPopup();

        if (latitudeInput) latitudeInput.value = lat;
        if (longitudeInput) longitudeInput.value = lng;
        if (selectedAddress) {
          selectedAddress.value = place.display_name;
        }

        message.textContent = 'موقعیت پیدا شد.';
      } catch (error) {
        message.textContent = 'خطا در دریافت اطلاعات نقشه.';
        console.error(error);
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

    if (marker) {
      marker.setLatLng(event.latlng);
    } else {
      marker = window.L.marker(event.latlng).addTo(map);
    }

    if (latitudeInput) latitudeInput.value = lat;
    if (longitudeInput) longitudeInput.value = lng;

    if (message) {
      message.textContent = 'موقعیت جدید انتخاب شد.';
    }
  });
}
