import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { register } from "../../configs/LoadData";
import RegisterScreen from "../Screen/RegisterScreen";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
    dob: new Date(),
    avatar: null,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigation();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (msg) setMsg(null);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData((prev) => ({
        ...prev,
        dob: selectedDate,
      }));
    }
  };

  const picker = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Quyền truy cập thư viện ảnh bị từ chối!",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaType: "photo",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData((prev) => ({
        ...prev,
        avatar: result.assets[0],
      }));
      Toast.show({
        type: "success",
        text1: "Thành công",
        text2: "Đã chọn ảnh đại diện!",
      });
      if (msg) setMsg(null);
    }
  };

  const validate = () => {
    const { username, password, confirmPassword, email, firstName, lastName, avatar } = formData;

    if (!username.trim()) return setMsg("Vui lòng nhập tên đăng nhập!");
    if (!password.trim()) return setMsg("Vui lòng nhập mật khẩu!");
    if (password.length < 6) return setMsg("Mật khẩu phải có ít nhất 6 ký tự!");
    if (!confirmPassword.trim()) return setMsg("Vui lòng xác nhận mật khẩu!");
    if (password !== confirmPassword) return setMsg("Mật khẩu xác nhận không khớp!");
    if (!email.trim()) return setMsg("Vui lòng nhập email!");
    if (!/\S+@\S+\.\S+/.test(email)) return setMsg("Email không hợp lệ!");
    if (!firstName.trim()) return setMsg("Vui lòng nhập họ!");
    if (!lastName.trim()) return setMsg("Vui lòng nhập tên!");
    if (!avatar) return setMsg("Vui lòng chọn ảnh đại diện!");

    setMsg(null);
    return true;
  };

  const handleRegister = async () => {
    if (validate()) {
      try {
        setLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append("username", formData.username.trim());
        formDataToSend.append("password", formData.password.trim());
        formDataToSend.append("email", formData.email.trim());
        formDataToSend.append("firstName", formData.firstName.trim());
        formDataToSend.append("lastName", formData.lastName.trim());
        formDataToSend.append("dob", formData.dob.toISOString().split("T")[0]);
        if (formData.avatar) {
          formDataToSend.append("avatar", {
            uri: formData.avatar.uri,
            name: formData.avatar.fileName || "avatar.jpg",
            type:
              formData.avatar.type && formData.avatar.type.startsWith("image/")
                ? formData.avatar.type
                : "image/jpeg",
          });
        }

        const response = await register(formDataToSend);

        if (response && response.code === 1000) {
          Toast.show({
            type: "success",
            text1: "Thành công!",
            text2: "Đăng ký tài khoản thành công 🎉",
          });

          setTimeout(() => {
            nav.navigate("Login");
          }, 1500);
        } else {
          setMsg(response.message || "Đăng ký thất bại!");
        }
      } catch (error) {
        if (error.response?.data?.message) {
          setMsg(error.response.data.message);
        } else {
          setMsg("Đăng ký thất bại. Vui lòng thử lại!");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <RegisterScreen
      formData={formData}
      msg={msg}
      loading={loading}
      showDatePicker={showDatePicker}
      onInputChange={handleInputChange}
      onDateChange={handleDateChange}
      onToggleDatePicker={() => setShowDatePicker(true)}
      onPickAvatar={picker}
      onRegister={handleRegister}
      formatDate={formatDate}
      nav={nav}
    />
  );
};

export default Register;
