import React from "react";
import { View } from "react-native";
import { Text, IconButton } from "react-native-paper";
import styles from "../../styles/ChangePasswordStyles";
import ScreenContainer from "../common/ScreenContainer";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";

const ChangePasswordScreen = ({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  loading,
  showCurrent,
  setShowCurrent,
  showNew,
  setShowNew,
  showConfirm,
  setShowConfirm,
  handleUpdatePassword,
}) => {
  return (
    <ScreenContainer scroll keyboardAvoid style={styles.safeArea}>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          Đổi mật khẩu
        </Text>
        <Text style={styles.subtitle}>
          Vui lòng nhập mật khẩu hiện tại và mật khẩu mới để cập nhật bảo mật cho tài khoản của bạn.
        </Text>

        <View style={styles.form}>
          <CustomInput
            label="Mật khẩu hiện tại"
            icon="lock-outline"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry={!showCurrent}
            disabled={loading}
            right={
              <IconButton
                icon={showCurrent ? "eye-off" : "eye"}
                onPress={() => setShowCurrent(!showCurrent)}
                size={20}
                style={styles.eyeIcon}
              />
            }
          />

          <CustomInput
            label="Mật khẩu mới"
            icon="key-outline"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNew}
            disabled={loading}
            right={
              <IconButton
                icon={showNew ? "eye-off" : "eye"}
                onPress={() => setShowNew(!showNew)}
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
            secureTextEntry={!showConfirm}
            disabled={loading}
            right={
              <IconButton
                icon={showConfirm ? "eye-off" : "eye"}
                onPress={() => setShowConfirm(!showConfirm)}
                size={20}
                style={styles.eyeIcon}
              />
            }
          />

          <CustomButton
            onPress={handleUpdatePassword}
            loading={loading}
            style={styles.button}
          >
            Cập nhật mật khẩu
          </CustomButton>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default ChangePasswordScreen;
