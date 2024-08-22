import { TextInput, StyleSheet } from "react-native";
import React, { useRef, forwardRef, useState } from "react";
import { useTheme } from "../../Context/ThemeContext/ThemeContext";

const CodeInput = forwardRef(({ value, onChange, prevRef, nextRef }, ref) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === "Backspace" && value === "" && prevRef) {
      prevRef.current.focus();
    }
  };
  const onFocus = () => {
    setIsFocused(true);
  };
  const onExit = () => {
    setIsFocused(false);
  };
  const handleChangeText = (text) => {
    onChange(text);
    if (text !== "" && nextRef && nextRef.current) {
      nextRef.current.focus();
    }
  };

  const styles = StyleSheet.create({
    codeInput: {
      borderWidth: 1,
      borderRadius: 10,
      width: "16%",
      height: 50,
      borderColor: isFocused
        ? theme.colors.borderActive
        : theme.colors.borderInactive,
      textAlign: "center",
      fontWeight: theme.font_weight.title,
      fontSize: theme.font_size.xxLarge,
      color: theme.colors.text_primary,
    },
  });

  return (
    <TextInput
      keyboardType="numeric"
      maxLength={1}
      onChangeText={handleChangeText}
      style={styles.codeInput}
      value={value}
      ref={ref}
      onKeyPress={handleKeyPress}
      onBlur={onExit}
      onFocus={onFocus}
    />
  );
});

export default CodeInput;
