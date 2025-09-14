import {
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
// import {
//   GoogleSigninButton,
// } from '@react-native-google-signin/google-signin';
import styles from "../../styles/LoginStyles";
import Loading from "../layout/Loading";

const LoginScreen = ({ formData, msg, loading, onInputChange, onLogin, onGoogleSignIn, nav }) => {
  const fields = [
    {
      label: "Tên đăng nhập",
      icon: "account",
      secureTextEntry: false,
      field: "username",
    },
    {
      label: "Mật khẩu",
      icon: "lock",
      secureTextEntry: true,
      field: "password",
    },
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
            <Image
              source={{
                uri: "https://res.cloudinary.com/dabb0yavq/image/upload/v1755275281/logo_png_oknyol.png",
              }}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text variant="titleLarge" style={styles.title}>
              Đăng nhập
            </Text>

            {msg && <Text style={styles.error}>{msg}</Text>}

            {renderInputFields()}

            <Button
              mode="contained"
              onPress={onLogin}
              style={styles.button}
              disabled={loading}
            >
              {loading ? <Loading /> : "Đăng nhập"}
            </Button>

            <TouchableOpacity onPress={() => nav.navigate("ForgotPassword")}>
              <Text style={styles.link}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            {/* <View style={styles.googleSignInContainer}>
              <GoogleSigninButton
                style={styles.googleButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={onGoogleSignIn}
                disabled={loading}
              />
            </View> */}

            <View style={styles.registerContainer}>
              <Text>Bạn chưa có tài khoản? </Text>
              <TouchableOpacity onPress={() => nav.navigate("Register")}>
                <Text style={styles.link}>Đăng ký</Text>
              </TouchableOpacity>
            </View>

            
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
