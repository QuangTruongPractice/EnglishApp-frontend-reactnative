import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { changePasswordRequest } from "../../configs/LoadData";
import ResetPasswordScreen from "../Screen/ResetPasswordScreen";

const ChangePassword = ({ route }) => {
  const { email, resetToken } = route.params;
  const nav = useNavigation();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = () => {
    if (!newPassword) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Vui lòng nhập mật khẩu mới",
      });
      return false;
    }
    if (newPassword.length < 6) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Mật khẩu phải có ít nhất 6 ký tự",
      });
      return false;
    }
    if (!confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Vui lòng xác nhận mật khẩu",
      });
      return false;
    }
    if (newPassword !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Mật khẩu xác nhận không khớp",
      });
      return false;
    }
    return true;
  };

  const changePassword = async () => {
    if (!validatePassword()) return;

    setLoading(true);
    try {
      const res = await changePasswordRequest(resetToken, newPassword);
      Toast.show({
        type: "success",
        text1: "Thành công",
        text2: res.message || "Đổi mật khẩu thành công",
      });
      nav.navigate("Login");
    } catch (err) {
      const errorCode = err.response?.data?.code;
      if (errorCode === 1019) {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: "Phiên đổi mật khẩu không hợp lệ",
        });
        nav.navigate("ForgotPassword");
      } else if (errorCode === 1020) {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: "Phiên đổi mật khẩu đã hết hạn (quá 10 phút)",
        });
        nav.navigate("ForgotPassword");
      } else {
        const errMsg =
          err.response?.data?.message || err.message || "Có lỗi xảy ra";
        Toast.show({ type: "error", text1: "Lỗi", text2: errMsg });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResetPasswordScreen
      email={email}
      newPassword={newPassword}
      confirmPassword={confirmPassword}
      setNewPassword={setNewPassword}
      setConfirmPassword={setConfirmPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      showConfirmPassword={showConfirmPassword}
      setShowConfirmPassword={setShowConfirmPassword}
      changePassword={changePassword}
      loading={loading}
      nav={nav}
    />
  );
};

export default ChangePassword;
