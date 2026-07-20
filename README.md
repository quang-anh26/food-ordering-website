# 🍜 Foodio — Khung Project (Skeleton)

Đây là **khung rỗng** của đồ án Website Đặt Đồ Ăn "Foodio" — đã dựng sẵn đúng cấu trúc thư mục/file theo yêu cầu đề bài, nhưng **chưa có nội dung**. Cả nhóm dựa vào khung này để code song song theo từng module.

## 📁 Cấu trúc

```
foodio-khung/
├── index.html            → Trang chủ
├── menu.html              → Thực đơn
├── food-detail.html       → Chi tiết món ăn
├── restaurant.html        → Nhà hàng
├── cart.html               → Giỏ hàng
├── checkout.html           → Thanh toán
├── login.html               → Đăng nhập
├── register.html            → Đăng ký
├── profile.html              → Hồ sơ cá nhân
├── orders.html                → Lịch sử đơn hàng
├── about.html                  → Giới thiệu
├── contact.html                 → Liên hệ
├── css/                     → 10 file CSS (rỗng, có sẵn tên + comment)
├── js/                      → 9 file JS (rỗng, có sẵn tên + comment)
├── images/                  → Thư mục ảnh (foods/restaurants/users/banners/icons)
├── PHAN-CONG.md              → Bảng phân công 5 người + quy trình Git
└── .gitignore
```

Mỗi file `.html` đã có sẵn:
- Link đầy đủ tới 10 file CSS và 9 file JS (đúng thứ tự).
- Khung `<header>`, `<main>`, `<footer>` với comment `TODO` đánh dấu ai phụ trách phần nào.

Mỗi file `.css` / `.js` chỉ có comment tiêu đề, chưa có code — thành viên phụ trách tự viết vào.

## 🚀 Cách bắt đầu

1. Đọc kỹ **`PHAN-CONG.md`** để biết mình phụ trách module nào.
2. Clone repo, tạo nhánh riêng: `git checkout -b feature/<module>`.
3. Viết CSS/JS vào đúng file đã được đặt tên sẵn.
4. Viết nội dung HTML vào đúng vị trí `<main>...</main>` của (các) trang mình phụ trách.
5. Push nhánh, tạo Pull Request để trưởng nhóm review & merge vào `main`.

## ⚠️ Lưu ý quan trọng

- **Header/Footer phải giống hệt nhau ở mọi trang** — Thành viên 1 làm xong phần này trước, các thành viên khác copy nguyên bản `<header>...</header>` và `<footer>...</footer>` vào trang của mình, chỉ thêm class `active` cho đúng mục menu.
- Dữ liệu món ăn/nhà hàng nên khai báo **một lần duy nhất** trong `js/app.js` (mảng `FOODS`, `RESTAURANTS`...) để tất cả các trang dùng chung, tránh lặp dữ liệu.
- Toàn bộ nội dung hiển thị phải là **tiếng Việt có dấu**.
