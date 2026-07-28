# 🍜 FoodKTAHP — Website Đặt Đồ Ăn Trực Tuyến

FoodKTAHP là website đặt đồ ăn trực tuyến (kiểu GrabFood/ShopeeFood) được xây dựng bằng **HTML/CSS/JavaScript thuần** (không dùng framework, không cần backend/database — toàn bộ dữ liệu người dùng được lưu bằng `localStorage`/`sessionStorage` của trình duyệt).

## 🔗 Link Demo

👉 **https://foodktahp.vercel.app**

---

## 📁 Cấu trúc thư mục

```
BaiTapLon_Web/
├── index.html              → Trang chủ
├── menu.html                → Thực đơn (lọc, sắp xếp, tìm kiếm)
├── food-detail.html         → Chi tiết món ăn
├── restaurant.html          → Danh sách & thông tin nhà hàng
├── cart.html                 → Giỏ hàng
├── checkout.html              → Thanh toán
├── login.html                  → Đăng nhập
├── register.html                → Đăng ký
├── profile.html                  → Hồ sơ cá nhân
├── change-password.html           → Đổi mật khẩu
├── orders.html                     → Lịch sử đơn hàng
├── about.html                       → Giới thiệu
├── contact.html                      → Liên hệ
│
├── css/
│   ├── style.css              → Biến màu (CSS variables), reset, style dùng chung
│   ├── header.css             → Header, thanh điều hướng, ô tìm kiếm
│   ├── hero.css                → Banner trang chủ
│   ├── menu.css                 → Trang thực đơn, bộ lọc, food card
│   ├── cart.css                  → Giỏ hàng & thanh toán
│   ├── login.css                   → Đăng nhập/Đăng ký
│   ├── profile.css                  → Hồ sơ cá nhân, đơn hàng
│   ├── footer.css                    → Footer
│   ├── animation.css                  → Hiệu ứng chuyển động, reveal on scroll
│   └── responsive.css                  → Responsive Desktop/Tablet/Mobile
│
├── js/
│   ├── app.js              → Dữ liệu (món ăn, nhà hàng, đánh giá...), hàm dùng chung, khởi tạo trang chủ
│   ├── auth.js              → Đăng nhập/Đăng ký/Đăng xuất, quản lý phiên, địa chỉ giao hàng
│   ├── cart.js                → Giỏ hàng, yêu thích, mã giảm giá, đặt hàng
│   ├── filter.js                → Lọc & sắp xếp món ăn (danh mục, giá, đánh giá)
│   ├── search.js                  → Tìm kiếm món ăn (gợi ý trực tiếp trên header + hero)
│   ├── validation.js                → Kiểm tra hợp lệ các form (đăng ký, đăng nhập, thanh toán, liên hệ...)
│   ├── slider.js                      → Carousel đánh giá khách hàng
│   ├── animation.js                    → Menu mobile, FAQ accordion, bộ đếm số liệu, tab, gallery
│   ├── darkmode.js                      → Chuyển đổi & lưu chế độ Sáng/Tối
│   └── map-picker.js                     → Chọn vị trí giao hàng trên bản đồ (Leaflet + OpenStreetMap)
│
├── images/
│   ├── foods/            → Ảnh 100 món ăn
│   ├── restaurants/       → Ảnh 10 nhà hàng
│   ├── banners/            → Ảnh banner trang chủ
│   ├── developer/           → Ảnh trang giới thiệu
│   ├── favicon/               → Favicon
│   └── icons/                  → Icon dùng chung
│
├── PHAN-CONG.md      → Phân công công việc nhóm & quy trình Git
└── README.md          → Tài liệu này
```

---

## 🚀 Cách chạy project

**Cách 1 — Mở trực tiếp:** mở file `index.html` bằng trình duyệt (Chrome/Edge/Firefox).

**Cách 2 — Live Server (khuyến nghị, tránh lỗi CORS khi load ảnh/dữ liệu):**
1. Mở project bằng VS Code
2. Cài extension **Live Server**
3. Click phải vào `index.html` → **Open with Live Server**

**Tài khoản demo có sẵn** để chấm bài / test nhanh (không cần đăng ký):
- Email: `demo@foodio.com`
- Mật khẩu: `123456`

---

## ✨ Tính năng chính

### 🏠 Trang chủ (`index.html`)
- Banner giới thiệu, thanh tìm kiếm nhanh
- Danh mục món ăn dạng cuộn ngang (8 danh mục: Phở & Bún, Cơm, Bánh Mì & Bánh, Món Cuốn, Lẩu & Hải Sản, Chè & Tráng Miệng, Cà Phê, Trà Sữa & Nước Ép)
- Món ăn nổi bật lọc theo tab danh mục
- Danh sách nhà hàng nổi bật (trạng thái đang mở/đã đóng cửa)
- Carousel đánh giá khách hàng (tự động trượt, có nút điều hướng + chấm trang)
- Bộ đếm số liệu thống kê (chạy số khi cuộn tới)
- Câu hỏi thường gặp (FAQ) dạng accordion

### 🍽️ Thực đơn (`menu.html`)
- **100 món ăn** thuộc 10 nhà hàng, 8 danh mục
- Lọc theo: danh mục, khoảng giá, đánh giá tối thiểu
- Sắp xếp theo: phổ biến, giá tăng/giảm, đánh giá cao nhất
- Tìm kiếm theo tên món / danh mục / mô tả (đồng bộ với ô tìm kiếm ở header)
- Lọc theo nhà hàng cụ thể (khi vào từ trang nhà hàng)
- Hiển thị trạng thái "Không tìm thấy món ăn" khi bộ lọc không có kết quả

### 🍲 Chi tiết món ăn (`food-detail.html`)
- Hình ảnh, mô tả, giá, đánh giá sao, thời gian chuẩn bị
- Chọn tùy chọn món ăn (size, topping...) và số lượng
- Thêm vào giỏ hàng / thêm vào yêu thích
- Tab thông tin chi tiết (mô tả, thành phần, đánh giá...)

### 🏬 Nhà hàng (`restaurant.html`)
- Danh sách 10 nhà hàng kèm đánh giá, thời gian giao hàng, khoảng cách
- Trạng thái đang mở cửa / đã đóng cửa
- Xem món ăn theo từng nhà hàng

### 🛒 Giỏ hàng (`cart.html`)
- Thêm/xóa/cập nhật số lượng món trong giỏ
- Tính tổng tiền tự động (tạm tính, thuế, phí giao hàng)
- Áp dụng **mã giảm giá** (promo code), giới hạn số lần sử dụng mỗi mã
- Đồng hồ đếm ngược khuyến mãi
- Danh sách món yêu thích (wishlist)

### 💳 Thanh toán (`checkout.html`)
- Chọn/lưu **địa chỉ giao hàng** (nhiều địa chỉ, đặt địa chỉ mặc định)
- **Chọn vị trí trên bản đồ** bằng Leaflet + OpenStreetMap (kéo ghim, tự động reverse-geocode ra địa chỉ)
- Chọn phương thức giao hàng: Giao nhanh / Giao hỏa tốc (phí ngẫu nhiên mỗi phiên, giao hỏa tốc luôn đắt hơn)
- Nhiều phương thức thanh toán (COD, thẻ, ví điện tử)
- Kiểm tra hợp lệ toàn bộ form trước khi đặt hàng
- Tạo đơn hàng và lưu vào lịch sử

### 🔐 Tài khoản (`login.html`, `register.html`, `profile.html`, `change-password.html`)
- Đăng ký / Đăng nhập / Đăng xuất, ghi nhớ đăng nhập
- Quên mật khẩu (popup)
- Modal **"Yêu cầu đăng nhập"** khi thao tác cần tài khoản (thêm giỏ hàng, thanh toán...)
- Chỉnh sửa hồ sơ cá nhân, đổi mật khẩu
- Quản lý danh sách địa chỉ giao hàng đã lưu

### 📦 Đơn hàng (`orders.html`)
- Lịch sử đơn hàng đã đặt
- Xem chi tiết từng đơn (món, tổng tiền, địa chỉ, trạng thái)
- Hủy đơn trong vòng 5 phút sau khi đặt (trước khi nhà hàng xác nhận)

### ℹ️ Giới thiệu & Liên hệ (`about.html`, `contact.html`)
- Giới thiệu về FoodKTAHP, đội ngũ phát triển
- Form liên hệ / đăng ký nhận bản tin (có kiểm tra hợp lệ)

### 🎨 Giao diện & Trải nghiệm chung (mọi trang)
- **Chế độ Sáng/Tối (Dark Mode)** — lưu lựa chọn, áp dụng lại khi quay lại trang
- **Responsive** đầy đủ Desktop / Tablet / Mobile, menu dạng hamburger trên mobile
- Tìm kiếm trực tiếp (live search) với gợi ý món ăn ngay khi gõ
- Thông báo dạng toast (thành công / lỗi / thông tin)
- Hiệu ứng cuộn: thanh tiến trình cuộn trang, nút "về đầu trang", hiệu ứng xuất hiện khi cuộn tới (reveal on scroll)
- Badge số lượng món trong giỏ hàng hiển thị đồng bộ ở mọi trang

---

## 🧠 Dữ liệu & Lưu trữ

Toàn bộ dữ liệu người dùng được lưu trong **`localStorage`** của trình duyệt (không cần server/database):

| Key | Nội dung |
|---|---|
| `foodio_users` | Danh sách tài khoản đã đăng ký |
| `foodio_session` | Phiên đăng nhập hiện tại |
| `foodio_cart` | Giỏ hàng |
| `foodio_wishlist` | Danh sách món yêu thích |
| `foodio_orders` | Lịch sử đơn hàng |
| `foodio_theme` | Chế độ Sáng/Tối đã chọn |
| `foodio_promo_timers` | Trạng thái mã giảm giá |

Dữ liệu **món ăn (100 món)**, **nhà hàng (10 nhà hàng)**, **danh mục**, **đánh giá khách hàng**, **FAQ** được khai báo sẵn (mock data) trong `js/app.js`, dùng chung cho toàn bộ website.

> ⚠️ Vì dữ liệu lưu trên `localStorage`, xóa cache/đổi trình duyệt sẽ mất tài khoản & đơn hàng đã tạo (trừ tài khoản demo được tự seed lại mỗi lần tải trang).

---

## 🛠️ Công nghệ sử dụng

- **HTML5 / CSS3** — thuần, có biến CSS (`css/style.css`) để đồng bộ màu sắc & dễ đổi theme
- **JavaScript (Vanilla ES6+)** — không dùng framework
- **Leaflet.js + OpenStreetMap** — chọn vị trí giao hàng trên bản đồ (miễn phí, không cần API key)
- **localStorage / sessionStorage** — lưu trữ dữ liệu phía client
- **Vercel** — hosting & deploy

---

## 👥 Phân công nhóm

Xem chi tiết phân công module theo từng thành viên và quy trình làm việc Git tại file [`PHAN-CONG.md`](./PHAN-CONG.md).

---

## 📌 Lưu ý

- Toàn bộ nội dung hiển thị bằng **tiếng Việt có dấu**.
- Header/Footer đồng nhất trên mọi trang.
- Đây là project mô phỏng (demo) phục vụ mục đích học tập — không xử lý thanh toán thật, không có backend thật.