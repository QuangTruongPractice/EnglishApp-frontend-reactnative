import React from "react";
import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import {
  TextInput,
  Button,
  Card,
  HelperText,
  Provider as PaperProvider,
  Text,
} from "react-native-paper";
import styles from "../../styles/ChangePasswordStyles";

const ChangePasswordScreen = ({
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
  const hasPasswordMismatch =
    confirmPassword && newPassword !== confirmPassword;

  return (
    <PaperProvider>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Text variant="titleLarge" style={styles.title}>Đổi mật khẩu</Text>
              <Text variant="bodyMedium" style={styles.subtitle}>
                Nhập mật khẩu mới cho tài khoản: {email}
              </Text>

              <TextInput
                label="Mật khẩu mới"
                value={newPassword}
                onChangeText={setNewPassword}
                mode="outlined"
                secureTextEntry={!showPassword}
                disabled={loading}
                style={styles.input}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />
              <HelperText
                type="info"
                visible={newPassword.length > 0 && newPassword.length < 6}
              >
                Mật khẩu phải có ít nhất 6 ký tự
              </HelperText>

              <TextInput
                label="Xác nhận mật khẩu"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                mode="outlined"
                secureTextEntry={!showConfirmPassword}
                disabled={loading}
                style={styles.input}
                error={hasPasswordMismatch}
                right={
                  <TextInput.Icon
                    icon={showConfirmPassword ? "eye-off" : "eye"}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                }
                onSubmitEditing={changePassword}
                returnKeyType="send"
              />
              <HelperText type="error" visible={hasPasswordMismatch}>
                Mật khẩu xác nhận không khớp
              </HelperText>

              <Button
                mode="contained"
                onPress={changePassword}
                loading={loading}
                disabled={
                  loading ||
                  hasPasswordMismatch ||
                  !newPassword ||
                  !confirmPassword
                }
                style={styles.button}
                contentStyle={styles.buttonContent}
                buttonColor="#d32f2f"
              >
                {loading ? "Đang cập nhật..." : "Đổi mật khẩu"}
              </Button>

              <Button
                mode="outlined"
                onPress={() => nav.goBack()}
                disabled={loading}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                Quay lại
              </Button>

              <Button
                mode="text"
                onPress={() => nav.navigate("Login")}
                style={styles.linkButton}
                disabled={loading}
              >
                Về trang đăng nhập
              </Button>
            </Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

export default ChangePasswordScreen;
