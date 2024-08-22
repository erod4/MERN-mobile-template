import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../Context/ThemeContext/ThemeContext";

const ReturnButton = ({ returnTo }) => {
  const navigator = useNavigation();
  const { theme } = useTheme();

  const goBack = () => {
    if (returnTo) {
      navigator.navigate(returnTo);
    } else {
      navigator.goBack();
    }
  };
  return (
    <TouchableOpacity onPress={goBack} style={{ padding: 3 }}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        size={18}
        color={theme.colors.text_primary}
      />
    </TouchableOpacity>
  );
};

export default ReturnButton;
