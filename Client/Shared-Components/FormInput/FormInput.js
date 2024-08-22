import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { fa0 } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useTheme } from "../../Context/ThemeContext/ThemeContext";

const FormInput = ({ name, type, value, icon, handleChange, id }) => {
  const { theme } = useTheme();

  const [isFocus, changeIsFocus] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const onFocus = () => {
    changeIsFocus(true);
  };
  const onBlur = () => {
    changeIsFocus(false);
  };
  const hanldePassVisibility = () => {
    setIsVisible(!isVisible);
  };
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      borderWidth: 1,
      flexDirection: "row",
      borderRadius: 10,
      padding: 5,
      height: 50,
      borderColor: isFocus
        ? theme.colors.borderActive
        : theme.colors.borderInactive,
    },
    inputContainer: { flexDirection: "column", flex: 1 },
    input: { flex: 1, color: theme.colors.text_primary },
    icon: {
      paddingHorizontal: 5,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontWeight: theme.font_weight.message,
      color: theme.colors.text_secondary,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>{name}</Text>
        <TextInput
          value={value}
          onBlur={onBlur}
          onFocus={onFocus}
          secureTextEntry={type === "password" && !isVisible}
          style={styles.input}
          onChange={(text) => {
            handleChange(id, text);
          }}
        />
      </View>
      {type == "password" ? (
        <TouchableOpacity onPress={hanldePassVisibility} style={styles.icon}>
          <FontAwesomeIcon
            icon={isVisible ? faEye : faEyeSlash}
            color={
              isFocus ? theme.colors.borderActive : theme.colors.borderInactive
            }
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.icon}>
          <FontAwesomeIcon
            icon={icon ? icon : fa0}
            color={
              isFocus ? theme.colors.borderActive : theme.colors.borderInactive
            }
          />
        </View>
      )}
    </View>
  );
};

export default FormInput;
