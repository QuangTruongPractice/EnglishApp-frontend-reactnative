# EnglishApp-frontend-reactnative

APP HỌC TIẾNG ANH VỚI FLASHCARD TÍCH HỢP CHẤM ĐIỂM PHÁT ÂM - Frontend

1. Mô tả dự án
Frontend cho hệ thống học tiếng Anh với Flashcard tích hợp chấm điểm phát âm.
Ứng dụng được xây dựng với **React Native** hỗ trợ:
- Hiển thị chủ đề, từ vựng, video, quiz, bảng xếp hạng, tiến độ học tập từ backend.
- Xử lý chat chấm điểm phát âm của user với **WhisperX**.
- Ngăn chặn truy cập trái phép bằng kiểm tra quyền từ JWT token.

2. Công nghệ sử dụng
- **React Native** 
- **Axios** (gọi API backend)
- **Bootstrap / TailwindCSS** (giao diện)
- **JWT** (kiểm tra đăng nhập & phân quyền)

3. Cài đặt
Clone dự án
git clone https://github.com/QuangTruongPractice/EnglishApp-frontend-reactnative.git

Cài đặt dependencies
npm install

Chạy dev mode
npm run:android hoặc npm run:ios để chạy trên máy ảo.

hoặc tải file apk từ https://expo.dev/accounts/tranquangtruong25/projects/englishApp/builds/1a3907b1-e0b8-4a7a-9d93-ca413d39a145
Trước khi sử dụng hãy kiểm tra https://englishapp-go7r.onrender.com/ đã mở chưa, và hãy chạy FastAPI để có thể chấm điểm.

4. Chức năng chính
Trang chủ: hiển thị chủ đề, bảng xếp hạng.

Quản trị: chỉ ADMIN mới truy cập được.

Bảo mật điều hướng: chặn truy cập trái phép bằng kiểm tra token + role.

Thông báo lỗi & loading: UX thân thiện.
