import React from "react";
import { TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";

const CustomInput = ({ 
  label, 
  value, 
  onChangeText, 
  icon, 
  secureTextEntry = false, 
  style,
  error,
  ...props 
}) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      mode="outlined"
      autoCapitalize="none"
      autoCorrect={false}
      error={!!error}
      left={icon ? <TextInput.Icon icon={icon} /> : null}
      style={[styles.input, style]}
      theme={{
        colors: {
          primary: "#d32f2f",
          outline: "#e0e0e0",
        },
      }}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 5,
    backgroundColor: "#fff",
  },
});

export default CustomInput;
