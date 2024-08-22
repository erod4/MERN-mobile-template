import { View, Text, SafeAreaView, StyleSheet, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import FormButton from "../../Shared-Components/FormButton/FormButton";
import FormInput from "../../Shared-Components/FormInput/FormInput";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../Context/ThemeContext/ThemeContext";
import { authContext } from "../../Context/AuthContext/AuthContext";

const Profile = () => {
  const { theme } = useTheme();
  const { profile, updateUserAction } = useContext(authContext);
  const [formData, setFormData] = useState({
    email: profile?.user?.email,
    name: profile?.user?.name,
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(
    formData.email == profile?.user?.email &&
      formData.name == profile?.user?.name
  );
  useEffect(() => {
    setIsSubmitDisabled(
      formData.email == profile?.user?.email &&
        formData.name == profile?.user?.name
    );
  }, [formData]);

  const styles = StyleSheet.create({
    screen: {
      width: "100%",
      height: "100%",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 50,
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
      marginTop: 100,
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
    footerButtonText: { fontWeight: "700" },
    footerText: {},
  });

  const onChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  const onSubmit = () => {
    updateUserAction(formData);
  };
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleContainerText}>Update Your Profile 📝</Text>
        <Text style={styles.welcomeMsgContainerText}>
          Please update your information below.
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
          id={"name"}
          handleChange={onChange}
        />

        <FormButton
          name={"Update"}
          disabled={isSubmitDisabled}
          onPress={onSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
