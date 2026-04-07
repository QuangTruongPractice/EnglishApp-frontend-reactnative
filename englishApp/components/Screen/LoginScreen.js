import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Text } from "react-native-paper";
import styles from "../../styles/LoginStyles";
import ScreenContainer from "../common/ScreenContainer";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";

const LoginScreen = ({ formData, msg, loading, onInputChange, onLogin, onGoogleSignIn, nav }) => {
  return (
    <ScreenContainer scroll keyboardAvoid background="#f9a9a9ff">
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dabb0yavq/image/upload/v1755275281/logo_png_oknyol.png",
          }}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text variant="headlineMedium" style={styles.title}>
          Đăng nhập
        </Text>

        {msg && <Text style={styles.error}>{msg}</Text>}

        <CustomInput
          label="Tên đăng nhập"
          icon="account"
          value={formData.username}
          onChangeText={(val) => onInputChange("username", val)}
          disabled={loading}
        />

        <CustomInput
          label="Mật khẩu"
          icon="lock"
          secureTextEntry
          value={formData.password}
          onChangeText={(val) => onInputChange("password", val)}
          disabled={loading}
        />

        <CustomButton 
          onPress={onLogin} 
          loading={loading}
          style={styles.button}
        >
          Đăng nhập
        </CustomButton>

        <TouchableOpacity onPress={() => nav.navigate("ForgotPassword")}>
          <Text style={styles.link}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text>Bạn chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => nav.navigate("Register")}>
            <Text style={styles.link}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default LoginScreen;
