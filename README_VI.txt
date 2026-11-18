AIR SUPPORT 1.0 - GÓI PWA THỬ NGHIỆM
======================================

CẤU TRÚC
- index.html: giao diện ứng dụng
- styles.css: thiết kế responsive cho Android
- app.js: chức năng giao diện, danh mục sân bay, dịch vụ, lưu hành trình
- manifest.webmanifest: khai báo PWA
- sw.js: lưu bộ khung giao diện để mở offline
- icons/: biểu tượng 192x192 và 512x512

CHẠY THỬ
Mở index.html bằng trình duyệt để xem giao diện. Tuy nhiên PWA và Service Worker
chỉ hoạt động đầy đủ trên HTTPS hoặc localhost.

ĐƯA LÊN GITHUB PAGES BẰNG ĐIỆN THOẠI
1. Tạo repository GitHub tên air-support (Public).
2. Upload toàn bộ nội dung thư mục này lên thư mục gốc repository.
3. Settings > Pages.
4. Source: Deploy from a branch.
5. Branch: main; Folder: /(root); Save.
6. Đợi GitHub Pages xuất bản và mở URL HTTPS được cấp.
7. Mở URL bằng Chrome Android > menu ba chấm > Cài đặt ứng dụng.

LƯU Ý BẢO MẬT
- Không đưa mật khẩu, service_role key, secret key vào mã frontend.
- Không đưa dữ liệu cá nhân thật của hành khách vào repository.
- Phiên bản này chưa kết nối API chuyến bay trực tiếp.
- Danh mục sân bay là dữ liệu tham khảo ban đầu; cần rà soát trước phát hành.
- Nội dung dịch vụ là hướng dẫn tổng quát, cần xác nhận với hãng bay/sân bay.
- Không dùng bản thử nghiệm này làm hệ thống vận hành thương mại khi chưa có
  backend, kiểm thử bảo mật, nguồn dữ liệu được cấp phép và quy trình hỗ trợ.

LƯU Ý KỸ THUẬT
- Dữ liệu chuyến bay chưa được giả lập hoặc hiển thị như dữ liệu thật.
- Hành trình đã lưu dùng localStorage trên thiết bị hiện tại.
- Offline chỉ hỗ trợ app shell; tra cứu và dữ liệu trực tuyến cần Internet.
- Khi cập nhật app.js/styles.css/index.html, tăng CACHE_NAME trong sw.js
  (ví dụ air-support-shell-v2) để trình duyệt tải cache mới.
