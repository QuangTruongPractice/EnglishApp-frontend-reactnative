import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  TextInput,
  Button,
  Card,
  Provider as PaperProvider,
  Text,
} from "react-native-paper";
import Toast from "react-native-toast-message";
import styles from "../../styles/ForgotPasswordStyles";

const ForgotPasswordScreen = ({
  email,
  otp,
  msg,
  loading,
  showOtpInput,
  setEmail,
  setOtp,
  resetPassword,
  handleSubmitOtp,
  handleBackToEmail,
  nav,
}) => {
  return (
    <PaperProvider>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Text variant="titleLarge" style={styles.title}>
                Quên mật khẩu
              </Text>
              <Text variant="bodyMedium" style={styles.subtitle}>
                {!showOtpInput
                  ? "Nhập email của bạn để nhận mã xác thực"
                  : "Nhập mã OTP đã được gửi đến email của bạn"}
              </Text>

              {!showOtpInput && (
                <TextInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  mode="outlined"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  disabled={loading}
                  style={styles.input}
                  onSubmitEditing={resetPassword}
                  returnKeyType="send"
                />
              )}

              {msg && (
                <Card style={styles.successCard}>
                  <Card.Content>
                    <Text variant="bodyMedium" style={styles.successText}>
                      {msg}
                    </Text>
                  </Card.Content>
                </Card>
              )}

              {showOtpInput && (
                <TextInput
                  label="Mã OTP"
                  value={otp}
                  onChangeText={setOtp}
                  mode="outlined"
                  keyboardType="numeric"
                  maxLength={6}
                  disabled={loading}
                  style={styles.input}
                  onSubmitEditing={handleSubmitOtp}
                  returnKeyType="send"
                />
              )}

              {!showOtpInput ? (
                <Button
                  mode="contained"
                  onPress={resetPassword}
                  loading={loading}
                  disabled={loading}
                  style={styles.button}
                  contentStyle={styles.buttonContent}
                  buttonColor="#d32f2f"
                >
                  {loading ? "Đang gửi..." : "Gửi yêu cầu"}
                </Button>
              ) : (
                <View style={styles.buttonGroup}>
                  <Button
                    mode="contained"
                    onPress={handleSubmitOtp}
                    loading={loading}
                    disabled={loading}
                    style={[styles.button, styles.verifyButton]}
                    contentStyle={styles.buttonContent}
                    buttonColor="#d32f2f"
                  >
                    {loading ? "Đang xác thực..." : "Xác thực OTP"}
                  </Button>
                  <Button
                    mode="outlined"
                    onPress={handleBackToEmail}
                    disabled={loading}
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                  >
                    Quay lại
                  </Button>
                </View>
              )}

              <Button
                mode="text"
                onPress={() => nav.navigate("Login")}
                style={styles.linkButton}
              >
                Quay về trang đăng nhập
              </Button>
            </Card.Content>
          </Card>
        </ScrollView>

      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

export default ForgotPasswordScreen;
