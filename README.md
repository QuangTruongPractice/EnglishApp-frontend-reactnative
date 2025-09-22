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
git clone https://github.com/QuangTruongPractice/socialNetwork-Frontend.git

Cài đặt dependencies
npm install

Chạy dev mode
npm start

4. Chức năng chính
Trang chủ: hiển thị chủ đề, bảng xếp hạng.

Quản trị: chỉ ADMIN mới truy cập được.

Bảo mật điều hướng: chặn truy cập trái phép bằng kiểm tra token + role.

Thông báo lỗi & loading: UX thân thiện.
