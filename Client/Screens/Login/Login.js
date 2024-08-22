import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import FormInput from "../../Shared-Components/FormInput/FormInput";
import FormButton from "../../Shared-Components/FormButton/FormButton";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../Context/ThemeContext/ThemeContext";
import { authContext } from "../../Context/AuthContext/AuthContext";
const Login = () => {
  const navigator = useNavigation();
  const { theme } = useTheme();
  const { loginUserAction, loading } = useContext(authContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const onChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  const onSubmit = () => {
    loginUserAction(formData);
  };
  const onSignUpPress = () => {
    navigator.navigate("register");
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
      fontWeight: theme.font_weight.title,
      fontSize: theme.font_size.large,
      textAlign: "left",
      width: "100%",
      color: theme.colors.text_primary,
    },
    welcomeMsgContainerText: {
      fontWeight: theme.font_weight.message,
      fontSize: theme.font_size.medium,
      textAlign: "left",
      width: "100%",
      color: theme.colors.text_secondary,
    },
    forgotPassText: {
      color: theme.colors.text_tertiery,
      fontWeight: theme.font_weight.title,
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
        <Text style={styles.titleContainerText}>Hello, Welcome Back 👋</Text>
        <Text style={styles.welcomeMsgContainerText}>
          Happy to see you again, please login here
        </Text>
      </View>

      <View style={styles.FormContainer}>
        <FormInput
          name={"Email"}
          icon={faUser}
          value={formData.email}
          handleChange={onChange}
          id={"email"}
        />
        <FormInput
          name={"Password"}
          type={"password"}
          value={formData.password}
          handleChange={onChange}
          id={"password"}
        />
        <TouchableOpacity
          style={styles.forgotPass}
          onPress={() => {
            navigator.navigate("forgotPass", { theme });
          }}
        >
          <Text style={styles.forgotPassText}>Forgot your password?</Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <FormButton name={"Login"} onPress={onSubmit} />
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={onSignUpPress}>
          <Text style={styles.footerButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
