import {
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-toast-message";
import styles from "../../styles/RegisterStyles";
import Loading from "../layout/Loading";

const RegisterScreen = ({
  formData,
  msg,
  loading,
  showDatePicker,
  onInputChange,
  onDateChange,
  onToggleDatePicker,
  onPickAvatar,
  onRegister,
  formatDate,
  nav,
}) => {
  const fields = [
    { label: "Tên đăng nhập", icon: "account", secureTextEntry: false, field: "username" },
    { label: "Mật khẩu", icon: "lock", secureTextEntry: true, field: "password" },
    { label: "Xác nhận mật khẩu", icon: "lock-check", secureTextEntry: true, field: "confirmPassword" },
    { label: "Email", icon: "email", secureTextEntry: false, field: "email" },
    { label: "Họ", icon: "account-outline", secureTextEntry: false, field: "firstName" },
    { label: "Tên", icon: "account-outline", secureTextEntry: false, field: "lastName" },
  ];

  const renderInputFields = () =>
    fields.map((field) => (
      <TextInput
        key={field.field}
        label={field.label}
        value={formData[field.field]}
        onChangeText={(value) => onInputChange(field.field, value)}
        secureTextEntry={field.secureTextEntry}
        style={styles.input}
        mode="outlined"
        autoCapitalize="none"
        autoCorrect={false}
        left={<TextInput.Icon icon={field.icon} />}
        theme={{
          colors: {
            primary: "#d32f2f",
            outline: "#d32f2f",
          },
        }}
      />
    ));

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior="height" style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => nav.goBack()}
              >
                <Icon name="arrow-left" size={24} color="#d32f2f" />
              </TouchableOpacity>

              <View style={styles.logoContainer}>
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/dabb0yavq/image/upload/v1755275281/logo_png_oknyol.png",
                  }}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <Text variant="titleLarge" style={styles.title}>
                Đăng ký tài khoản
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {msg && (
                <View style={styles.errorContainer}>
                  <Icon name="alert-circle" size={20} color="#b71c1c" />
                  <Text style={styles.error}>{msg}</Text>
                </View>
              )}

              {renderInputFields()}

              {/* Ngày sinh */}
              <TouchableOpacity
                style={styles.dateButton}
                onPress={onToggleDatePicker}
              >
                <Icon
                  name="calendar"
                  size={20}
                  color="#d32f2f"
                  style={styles.dateIcon}
                />
                <View style={styles.dateContent}>
                  <Text style={styles.dateLabel}>Ngày sinh</Text>
                  <Text style={styles.dateValue}>
                    {formatDate(formData.dob)}
                  </Text>
                </View>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={formData.dob}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                  maximumDate={new Date()}
                />
              )}

              <TouchableOpacity
                style={[styles.avatarButton, { opacity: loading ? 0.6 : 1 }]}
                onPress={onPickAvatar}
                disabled={loading}
              >
                <Text
                  style={[
                    styles.avatarButtonText,
                    { color: loading ? "#888" : "#d32f2f" },
                  ]}
                >
                  Chọn ảnh đại diện...
                </Text>
              </TouchableOpacity>

              {formData.avatar && (
                <View style={styles.avatarPreviewContainer}>
                  <Image
                    source={{ uri: formData.avatar.uri }}
                    style={styles.avatarImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.avatarSuccessText}>
                    Đã chọn ảnh đại diện
                  </Text>
                </View>
              )}

              <Button
                mode="contained"
                onPress={onRegister}
                style={styles.button}
                disabled={loading}
                contentStyle={styles.buttonContent}
              >
                {loading ? <Loading /> : "Đăng ký"}
              </Button>
            </View>

            <View style={styles.footer}>
              <Text style={styles.loginText}>Đã có tài khoản? </Text>
              <TouchableOpacity onPress={() => nav.navigate("Login")}>
                <Text style={styles.loginLink}>Đăng nhập ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Toast />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
