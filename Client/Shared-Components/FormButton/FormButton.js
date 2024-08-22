import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../Context/ThemeContext/ThemeContext";

const FormButton = ({ onPress, name }) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    buttonContainer: {
      width: "100%",
      height: 50,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.primary100,
    },
    buttonText: {
      fontWeight: theme.font_weight.title,
      color: theme.colors.text_primary_inverted,
    },
  });
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;
