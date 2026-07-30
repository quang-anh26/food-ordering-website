let ckMap = null;
let ckMapMarker = null;
let ckPickedLocation = null; // { lat, lng, address }

const CK_MAP_DEFAULT_CENTER = [10.7769, 106.7009]; 

function initCkMapIfNeeded() {
   if (ckMap || typeof L === 'undefined') return;
   ckMap = L.map('ck-map').setView(CK_MAP_DEFAULT_CENTER, 13);
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19,
   }).addTo(ckMap);
   ckMap.on('click', (e) => placeCkMarker(e.latlng.lat, e.latlng.lng));
}

function placeCkMarker(lat, lng) {
   ckPickedLocation = { lat, lng, address: null };
   if (ckMapMarker) {
      ckMapMarker.setLatLng([lat, lng]);
   } else {
      ckMapMarker = L.marker([lat, lng], { draggable: true }).addTo(ckMap);
      ckMapMarker.on('dragend', () => {
         const pos = ckMapMarker.getLatLng();
         ckPickedLocation = { lat: pos.lat, lng: pos.lng, address: null };
         reverseGeocodeCkLocation(pos.lat, pos.lng);
      });
   }
   ckMap.panTo([lat, lng]);
   reverseGeocodeCkLocation(lat, lng);
}

async function reverseGeocodeCkLocation(lat, lng) {
   const box = document.getElementById('ck-map-resolved-address');
   if (box) box.textContent = 'Đang xác định địa chỉ...';
   try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=vi`);
      const data = await res.json();
      const address = data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      if (box) box.textContent = address;
      if (ckPickedLocation) ckPickedLocation.address = address;
   } catch (err) {
      const fallback = `Toạ độ: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      if (box) box.textContent = fallback;
      if (ckPickedLocation) ckPickedLocation.address = fallback;
   }
}

function openCkMapModal() {
   const modal = document.getElementById('ck-map-modal');
   if (!modal) return;
   modal.classList.add('show');
   document.body.style.overflow = 'hidden';

   setTimeout(() => {
      initCkMapIfNeeded();
      ckMap.invalidateSize();
   }, 50);
}
function closeCkMapModal() {
   const modal = document.getElementById('ck-map-modal');
   if (modal) modal.classList.remove('show');
   document.body.style.overflow = '';
}

function resetCkMapField() {
   const openBtn = document.getElementById('ck-open-map-btn');
   const field = document.getElementById('ck-map-field');
   if (openBtn) {
      openBtn.textContent = '📍 Chọn vị trí trên bản đồ';
      openBtn.classList.remove('has-location');
   }
   if (field) field.classList.remove('invalid');
   ckPickedLocation = null;
   window.ckSelectedLatLng = null;
}

document.addEventListener('DOMContentLoaded', () => {
   const openBtn = document.getElementById('ck-open-map-btn');
   const modal = document.getElementById('ck-map-modal');
   if (!openBtn || !modal) return; 

   const closeBtn = document.getElementById('ck-map-close');
   const useMyLocationBtn = document.getElementById('ck-use-my-location');
   const confirmBtn = document.getElementById('ck-confirm-location');

   openBtn.addEventListener('click', openCkMapModal);
   closeBtn.addEventListener('click', closeCkMapModal);
   modal.addEventListener('click', (e) => { if (e.target === modal) closeCkMapModal(); });

   useMyLocationBtn.addEventListener('click', () => {
      if (!navigator.geolocation) {
         showToast('Trình duyệt không hỗ trợ định vị.', 'error');
         return;
      }
      useMyLocationBtn.textContent = 'Đang định vị...';
      navigator.geolocation.getCurrentPosition(
         (pos) => {
            useMyLocationBtn.textContent = '📍 Dùng vị trí hiện tại của tôi';
            ckMap.setView([pos.coords.latitude, pos.coords.longitude], 16);
            placeCkMarker(pos.coords.latitude, pos.coords.longitude);
         },
         () => {
            useMyLocationBtn.textContent = '📍 Dùng vị trí hiện tại của tôi';
            showToast('Không lấy được vị trí hiện tại. Vui lòng cho phép quyền truy cập vị trí.', 'error');
         }
      );
   });

   confirmBtn.addEventListener('click', () => {
      if (!ckPickedLocation) {
         showToast('Vui lòng chọn 1 vị trí trên bản đồ.', 'error');
         return;
      }
      const resolvedAddress = ckPickedLocation.address || `${ckPickedLocation.lat.toFixed(5)}, ${ckPickedLocation.lng.toFixed(5)}`;
      const addressInput = document.getElementById('ck-address');
      if (addressInput) {
         addressInput.value = resolvedAddress;
         addressInput.closest('.field')?.classList.remove('invalid');
      }
      if (openBtn) {
         openBtn.textContent = `📍 ${resolvedAddress}`;
         openBtn.classList.add('has-location');
      }
      document.getElementById('ck-map-field')?.classList.remove('invalid');
     
      window.ckSelectedLatLng = { lat: ckPickedLocation.lat, lng: ckPickedLocation.lng };
      closeCkMapModal();
      showToast('Đã chọn vị trí trên bản đồ!', 'success');
   });
});
