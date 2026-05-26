import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { resetPasswordRequest, verifyOtpConfirm } from "../../configs/LoadData";
import ForgotPasswordScreen from "../Screen/ForgotPasswordScreen";
import Toast from "react-native-toast-message";

const ForgotPassword = () => {
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const nav = useNavigation();

  const resetPassword = async () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Vui lòng nhập email",
      });
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const res = await resetPasswordRequest(email.trim());
      setMsg(res.message);
      setShowOtpInput(true);

      Toast.show({
        type: "success",
        text1: "Thành công",
        text2: res.message,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOtp = async () => {
    if (!otp) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Vui lòng nhập mã OTP",
      });
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const res = await verifyOtpConfirm(email.trim(), otp.trim());
      setMsg(res.message);
      
      const resetToken = res.result;

      Toast.show({
        type: "success",
        text1: "Thành công",
        text2: res.message,
      });

      setTimeout(() => {
        nav.navigate("ChangePassword", { email, resetToken });
      }, 2000);
    } catch (error) {
      const errorCode = error.response?.data?.code;
      
      if (errorCode === 1017) {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: "Mã OTP không đúng, vui lòng thử lại",
        });
      } else if (errorCode === 1018) {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: "Mã OTP đã hết hạn",
        });
        handleBackToEmail();
      } else {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: error.response?.data?.message || error.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setShowOtpInput(false);
    setMsg("");
    setOtp("");
  };

  return (
    <ForgotPasswordScreen
      email={email}
      otp={otp}
      msg={msg}
      loading={loading}
      showOtpInput={showOtpInput}
      setEmail={setEmail}
      setOtp={setOtp}
      resetPassword={resetPassword}
      handleSubmitOtp={handleSubmitOtp}
      handleBackToEmail={handleBackToEmail}
      nav={nav}
    />
  );
};

export default ForgotPassword;
