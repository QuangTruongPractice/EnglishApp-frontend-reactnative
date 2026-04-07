import React from "react";
import { 
  KeyboardAvoidingView, 
  ScrollView, 
  Platform, 
  StyleSheet, 
  StatusBar,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScreenContainer = ({ 
  children, 
  safeArea = true, 
  keyboardAvoid = true, 
  scroll = false, 
  style, 
  contentStyle,
  background = "#FDF9F9",
  statusBarProps = { barStyle: "dark-content", backgroundColor: "transparent", translucent: true }
}) => {
  const Container = safeArea ? SafeAreaView : View;
  const Wrapper = keyboardAvoid ? KeyboardAvoidingView : View;
  const Content = scroll ? ScrollView : View;

  return (
    <Container style={[styles.container, { backgroundColor: background }, style]}>
      <StatusBar {...statusBarProps} />
      <Wrapper 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.wrapper}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <Content 
          contentContainerStyle={[scroll && styles.scrollContent, contentStyle]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </Content>
      </Wrapper>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default ScreenContainer;
