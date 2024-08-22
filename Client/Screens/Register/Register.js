import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import FormInput from "../../Shared-Components/FormInput/FormInput";
import FormButton from "../../Shared-Components/FormButton/FormButton";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../Context/ThemeContext/ThemeContext";
import { authContext } from "../../Context/AuthContext/AuthContext";

const Register = () => {
  const { registerUserAction, loading } = useContext(authContext);
  const navigator = useNavigation();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  const onSubmit = () => {
    if (
      formData.email.length < 5 ||
      formData.name.length < 4 ||
      formData.password < 4 ||
      formData.confirmPassword < 4
    ) {
      Alert.alert(
        "Validation Error",
        "Please ensure all fields are filled out correctly. Use a valid email address and only letters for the name."
      );
    } else if (formData.password.length != formData.confirmPassword.length) {
      Alert.alert(
        "Password Mismatch",
        "Passwords do not match. Please make sure that the 'Password' and 'Confirm Password' fields are identical."
      );
    } else {
      registerUserAction(formData);
    }
  };
  const onSignUpPress = () => {
    navigator.navigate("login");
  };
  const styles = StyleSheet.create({
    screen: {
      width: "100%",
      height: "100%",
      justifyContent: "space-evenly",
      alignItems: "center",
      backgroundColor: theme.colors.cardColor,
    },
    FormContainer: { width: "90%", gap: 18 },
    footer: { flexDirection: "row" },
    forgotPass: {
      width: "100%",
      justifyContent: "center",
      alignItems: "flex-end",
    },
    titleContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: "90%",
      gap: 10,
    },
    titleContainerText: {
      color: theme.colors.text_primary,
      fontWeight: theme.font_weight.title,
      fontSize: theme.font_size.large,
      textAlign: "left",
      width: "100%",
    },
    welcomeMsgContainerText: {
      fontWeight: theme.font_weight.message,
      fontSize: 15,
      textAlign: "left",
      width: "100%",
      color: theme.colors.text_secondary,
    },
    footerButtonText: {
      fontWeight: theme.font_weight.title,
      color: theme.colors.text_tertiery,
    },
    footerText: {
      fontWeight: theme.font_weight.message,
      color: theme.colors.text_primary,
    },
  });

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleContainerText}>Hello, Welcome 👋</Text>
        <Text style={styles.welcomeMsgContainerText}>
          Happy to see you, please register here
        </Text>
      </View>

      <View style={styles.FormContainer}>
        <FormInput
          name={"Email"}
          icon={faEnvelope}
          value={formData.email}
          handleChange={onChange}
          id={"email"}
        />
        <FormInput
          name={"Full Name"}
          icon={faUser}
          value={formData.name}
          handleChange={onChange}
          id={"name"}
        />

        <FormInput
          name={"Password"}
          type={"password"}
          value={formData.password}
          handleChange={onChange}
          id={"password"}
        />
        <FormInput
          name={"Confirm Password"}
          type={"password"}
          value={formData.confirmpassword}
          handleChange={onChange}
          id={"confirmPassword"}
        />
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <FormButton name={"Sign Up"} onPress={onSubmit} />
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={onSignUpPress}>
          <Text style={styles.footerButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Register;
