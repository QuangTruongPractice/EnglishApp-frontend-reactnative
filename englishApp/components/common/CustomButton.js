import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet, ActivityIndicator } from "react-native";

const CustomButton = ({ 
  children, 
  onPress, 
  loading = false, 
  disabled = false, 
  mode = "contained", 
  style, 
  buttonColor = "#d32f2f",
  textColor = "#fff",
  labelStyle,
  ...props 
}) => {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      style={[styles.button, style]}
      disabled={loading || disabled}
      buttonColor={mode === "contained" ? buttonColor : "transparent"}
      textColor={mode === "contained" ? textColor : buttonColor}
      labelStyle={[styles.label, labelStyle]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={mode === "contained" ? textColor : buttonColor} size="small" />
      ) : (
        children
      )}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    borderRadius: 12,
    paddingVertical: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});

export default CustomButton;
