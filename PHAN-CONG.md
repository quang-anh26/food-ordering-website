# 📋 Phân công công việc — Nhóm 5 người

## 1. Phân chia module

| # | Vai trò | Phụ trách | File chính | Trang phụ trách |
|---|---|---|---|---|
| **1** | Layout Lead | Header, Navigation, Hero, Footer, hệ biến màu dùng chung | `css/style.css`, `css/header.css`, `css/hero.css`, `css/footer.css` | Khung `<header>`/`<footer>` của **mọi trang** |
| **2** | Product Lead | Danh mục, Món ăn nổi bật, Chi tiết món ăn | `css/menu.css`, dữ liệu `FOODS`/`CATEGORIES` trong `js/app.js` | `menu.html`, `food-detail.html` |
| **3** | Content Lead | Nhà hàng, Khuyến mãi, Đánh giá, FAQ | `restaurant.html`, dữ liệu `RESTAURANTS`/`REVIEWS`/`FAQS` trong `js/app.js`, `js/slider.js` | `restaurant.html`, `about.html`, `contact.html` |
| **4** | Auth Lead | Đăng nhập, Đăng ký, Hồ sơ, Lịch sử đơn hàng | `css/profile.css`, `css/login.css`, `js/auth.js`, `js/validation.js` | `login.html`, `register.html`, `profile.html`, `orders.html` |
| **5** | Integration Lead (Team Lead) | Giỏ hàng, Thanh toán, Tìm kiếm, Lọc, Dark Mode, Responsive, **ghép project** | `css/cart.css`, `css/responsive.css`, `css/animation.css`, `js/cart.js`, `js/search.js`, `js/filter.js`, `js/darkmode.js` | `cart.html`, `checkout.html` + review toàn bộ trước khi nộp |

> Quy tắc chung: hạn chế sửa trực tiếp `css/style.css` (file biến màu dùng chung) — nếu cần thêm biến mới, báo cả nhóm trước khi merge.

## 2. Quy trình Git cho cả nhóm

### Bước 1 — Người đẩy code đầu tiên (Thành viên 1 hoặc Team Lead)

```bash
cd food-ordering-website
git init
git add .
git commit -m "chore: khởi tạo khung project Foodio"
git branch -M main
git remote add origin <URL_REPO_GITHUB_CUA_NHOM>
git push -u origin main
```

### Bước 2 — 4 thành viên còn lại: clone về và tạo nhánh riêng

```bash
git clone <URL_REPO_GITHUB_CUA_NHOM>
cd food-ordering-website
git checkout -b feature/<ten-module>
# ví dụ: feature/auth, feature/cart, feature/menu, feature/restaurant
```

### Bước 3 — Làm việc & commit theo module của mình

```bash
git add css/profile.css js/auth.js login.html register.html
git commit -m "feat(auth): hoàn thiện đăng nhập/đăng ký"
git push origin feature/auth
```

### Bước 4 — Tạo Pull Request trên GitHub → Team Lead review & merge vào `main`

> Không `git push` thẳng lên `main` — luôn tạo Pull Request để tránh đè code của nhau.

## 3. Quy ước đặt tên nhánh & commit

**Nhánh:** `feature/<module>` — ví dụ `feature/header`, `feature/menu`, `feature/cart`

**Commit message** (theo dạng Conventional Commits):
- `feat(auth): thêm popup Login Required`
- `fix(cart): sửa lỗi tính tổng tiền sai`
- `style(header): chỉnh responsive cho mobile`
- `docs(readme): cập nhật hướng dẫn chạy project`

## 4. Checklist trước khi merge vào `main`

- [ ] Mở file `.html` trực tiếp trên trình duyệt, không lỗi Console (F12)
- [ ] Kiểm tra Dark Mode / Light Mode vẫn đọc rõ chữ
- [ ] Kiểm tra responsive: Desktop / Tablet / Mobile
- [ ] Không hard-code dữ liệu trùng lặp — dùng chung mảng `FOODS`, `RESTAURANTS` trong `js/app.js`
- [ ] Toàn bộ text hiển thị là tiếng Việt có dấu
