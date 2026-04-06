import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { updatePassword } from "../../configs/LoadData";
import { useNavigation } from "@react-navigation/native";
import ChangePasswordScreen from "../Screen/ChangePasswordScreen";

const ChangePassword = () => {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Toast.show({ type: "error", text1: "Lỗi", text2: "Vui lòng nhập đầy đủ thông tin" });
      return;
    }
    if (newPassword !== confirmPassword) {
      Toast.show({ type: "error", text1: "Lỗi", text2: "Mật khẩu mới không khớp" });
      return;
    }
    if (newPassword.length < 6) {
      Toast.show({ type: "error", text1: "Lỗi", text2: "Mật khẩu mới phải có ít nhất 6 ký tự" });
      return;
    }

    setLoading(true);
    try {
      await updatePassword(currentPassword, newPassword);

      Toast.show({ type: "success", text1: "Thành công", text2: "Đã đổi mật khẩu thành công" });
      navigation.goBack();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Đổi mật khẩu thất bại. Vui lòng kiểm tra lại mật khẩu hiện tại.";
      Toast.show({ type: "error", text1: "Lỗi", text2: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChangePasswordScreen
      currentPassword={currentPassword}
      setCurrentPassword={setCurrentPassword}
      newPassword={newPassword}
      setNewPassword={setNewPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      loading={loading}
      showCurrent={showCurrent}
      setShowCurrent={setShowCurrent}
      showNew={showNew}
      setShowNew={setShowNew}
      showConfirm={showConfirm}
      setShowConfirm={setShowConfirm}
      handleUpdatePassword={handleUpdatePassword}
    />
  );
};

export default ChangePassword;
