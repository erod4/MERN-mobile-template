import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import FormInput from "../../Shared-Components/FormInput/FormInput";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import FormButton from "../../Shared-Components/FormButton/FormButton";
import { useNavigation } from "@react-navigation/native";
import ReturnButton from "../../Shared-Components/ReturnButton/ReturnButton";
import { useTheme } from "../../Context/ThemeContext/ThemeContext";

const ForgotPassword = ({ route }) => {
  const navigator = useNavigation();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({ email: "test@test.com" });
  const handleSubmit = () => {
    navigator.navigate("enterResetCode", { email: formData.email });
  };
  const styles = StyleSheet.create({
    screen: {
      width: "100%",
      height: "100%",
      //   justifyContent: "center",
      alignItems: "center",
      gap: 50,
      backgroundColor: theme.colors.cardColor,
    },
    formContainer: { width: "90%", gap: 15 },
    titleContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: "90%",
      gap: 10,
      marginTop: 100,
    },
    titleContainerText: {
      fontWeight: theme.font_weight.title,
      fontSize: theme.font_size.large,
      textAlign: "left",
      width: "100%",
      color: theme.colors.text_primary,
    },
    msgContainerText: {
      fontWeight: theme.font_weight.message,
      fontSize: theme.font_size.medium,
      textAlign: "left",
      width: "100%",
      color: theme.colors.text_secondary,
    },
    backButton: {
      width: "100%",
      alignItems: "flex-start",
      justifyContent: "center",
      position: "absolute",
      top: 100,
      left: 10,
    },
  });
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleContainerText}>Need a Reset? ✉️</Text>
        <Text style={styles.msgContainerText}>
          Enter your email address, and we'll send you a code to reset your
          password.
        </Text>
      </View>
      <View style={styles.formContainer}>
        <FormInput
          type={"email"}
          value={formData.email}
          name={"Email"}
          icon={faUser}
        />
        <FormButton onPress={handleSubmit} name={"Send"} />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
