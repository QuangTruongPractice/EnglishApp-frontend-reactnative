import React from "react";
import { View } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/ResetPasswordStyles";
import ScreenContainer from "../common/ScreenContainer";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";

const ResetPasswordScreen = ({
  email,
  newPassword,
  confirmPassword,
  setNewPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  changePassword,
  loading,
  nav,
}) => {
  return (
    <ScreenContainer scroll keyboardAvoid style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="key-outline" size={36} color="#9B2C2C" />
          </View>
        </View>

        <Text variant="headlineMedium" style={styles.title}>
          Đặt mật khẩu mới
        </Text>
        <Text style={styles.subtitle}>
          Nhập mật khẩu mới cho tài khoản của bạn. Mật khẩu cần có ít nhất 6 ký tự.
        </Text>

        <View style={styles.emailBadge}>
          <Ionicons name="mail-outline" size={18} color="#555" />
          <Text style={styles.emailText}>{email}</Text>
        </View>

        <View style={styles.form}>
          <CustomInput
            label="Mật khẩu mới"
            icon="key-outline"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showPassword}
            disabled={loading}
            right={
              <IconButton
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
                size={20}
                style={styles.eyeIcon}
              />
            }
          />

          <CustomInput
            label="Xác nhận mật khẩu mới"
            icon="check-circle-outline"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            disabled={loading}
            right={
              <IconButton
                icon={showConfirmPassword ? "eye-off" : "eye"}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                size={20}
                style={styles.eyeIcon}
              />
            }
          />

          <CustomButton
            onPress={changePassword}
            loading={loading}
            style={styles.button}
          >
            Đặt mật khẩu mới
          </CustomButton>

          <CustomButton
            mode="text"
            onPress={() => nav.navigate("Login")}
            style={styles.backButton}
            buttonColor="#9B2C2C"
          >
            Quay về trang đăng nhập
          </CustomButton>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default ResetPasswordScreen;
