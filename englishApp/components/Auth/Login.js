import { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { login, googleLogin, loadProfile, fetchLearningProfile } from "../../configs/LoadData";
import { MyDispatchContext } from "../../configs/Context";
import LoginScreen from "../Screen/LoginScreen";
// Cấu hình Google Sign-In
// import {
//   GoogleSignin,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";
import keys from "../../key";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigation();
  const dispatch = useContext(MyDispatchContext);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    const { username, password } = formData;
    if (!username || !password) {
      setMsg("Vui lòng nhập tên đăng nhập và mật khẩu!");
      return false;
    }
    setMsg(null);
    return true;
  };

  const handleLogin = async () => {
    if (validate()) {
      try {
        setLoading(true);
        const { username, password } = formData;
        const res = await login(username.trim(), password.trim());
        if (res.code === 1000) {
          const token = res.result.token;
          await AsyncStorage.setItem("token", token);
          
          // Lấy thông tin profile người dùng (Identity)
          const userRes = await loadProfile();
          
          // Kiểm tra Learning Profile để xác định onboarding
          try {
            const learningProfile = await fetchLearningProfile();
            console.log("📚 Learning Profile:", learningProfile);
            
            if (learningProfile && learningProfile.result?.onboardingCompleted) {
              // Đã hoàn thành Onboarding -> Vào trang chủ
              dispatch({ type: "login", payload: userRes });
            } else {
              // Chưa có hoặc chưa hoàn thành Onboarding -> Chuyển qua Onboarding
              nav.navigate("Onboarding", { userData: userRes });
            }
          } catch (lpError) {
            // Nếu lỗi (404 = chưa có profile) -> Chuyển qua Onboarding
            console.log("📚 Learning Profile not found, redirecting to Onboarding");
            nav.navigate("Onboarding", { userData: userRes });
          }

          if (onLogin && typeof onLogin === 'function') {
            onLogin();
          }
        } else {
          setMsg(res.message || "Đăng nhập thất bại!");
        }
      } catch (error) {
        console.log("Login error detail:", error);
        setMsg("Đăng nhập thất bại. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    }
  };

  /*
  const handleGoogleLogin = async () => {
    setLoading(true);
    setMsg("");
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (response.data) {
        const { idToken } = response.data;

        const authResponse = await googleLogin(idToken, response.data.user.email);
        const token = authResponse.result.token;

        await AsyncStorage.setItem("token", token);
        // console.info("Token:", token);

        const userRes = await loadProfile(token);
        // console.info("User profile:", userRes);

        dispatch({ type: "login", payload: userRes });
      }
    } catch (error) {
      // console.error("Google Sign-In Error:", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setMsg("Đăng nhập đã bị hủy");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setMsg("Đăng nhập đang được thực hiện");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setMsg("Google Play Services không khả dụng");
      } else {
        setMsg("Đăng nhập Google thất bại. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };
  */

  const handleGoogleLogin = () => {
    alert("Chức năng Google Sign-in tạm thời không khả dụng trên Expo Go. Vui lòng sử dụng tài khoản hệ thống.");
  };

  /*
  GoogleSignin.configure({
    webClientId: keys.webClientId,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    offlineAccess: true,
    forceCodeForRefreshToken: true,
    iosClientId: keys.iosClientId,
  });
  */

  return (
    <LoginScreen
      formData={formData}
      msg={msg}
      loading={loading}
      onInputChange={handleInputChange}
      onLogin={handleLogin}
      onGoogleSignIn={handleGoogleLogin}
      nav={nav}
    />
  );
};

export default Login;
