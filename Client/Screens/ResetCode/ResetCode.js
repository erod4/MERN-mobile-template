import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState, useContext } from "react";
import FormInput from "../../Shared-Components/FormInput/FormInput";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import FormButton from "../../Shared-Components/FormButton/FormButton";
import { useNavigation } from "@react-navigation/native";
import CodeInput from "./CodeInput";
import { useTheme } from "../../Context/ThemeContext/ThemeContext";
import { authContext } from "../../Context/AuthContext/AuthContext";

const ResetCode = ({ route }) => {
  const { theme } = useTheme();
  const { email } = route.params;

  const [seconds, setSeconds] = useState(120);
  const { sendResetCode, verifyResetCode } = useContext(authContext);
  useEffect(() => {
    if (seconds == 0) return;
    const interval = setInterval(() => {
      setSeconds((prevSec) => prevSec - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);
  useEffect(() => {
    sendResetCode(email);
  }, []);
  const navigator = useNavigation();
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef(code.map(() => React.createRef()));
  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  const handleSubmit = () => {
    if (code.join("").length === 4) {
      verifyResetCode(code.join(""));
    } else {
      Alert.alert(
        "Incomplete Code",
        "Please enter all 4 digits of the verification code."
      );
    }
  };
  const handleResend = () => {
    navigator.reset({
      index: 0,
      routes: [
        {
          name: "enterResetCode",
          params: { email: email },
        },
      ],
    });
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
    formContainer: { width: "90%", gap: 20 },
    titleContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: "90%",
      marginTop: 100,

      gap: 10,
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
    resendContainer: {
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
    },
    resendCodeText: { color: theme.colors.text_primary },
    resendCodeButonText: {
      fontWeight: theme.font_weight.title,
      color: theme.colors.text_tertiery,
    },
  });
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleContainerText}>
          Enter Verification Code ☝️
        </Text>
        <Text style={styles.msgContainerText}>
          We've sent a code to {email}
        </Text>
      </View>
      <View style={styles.formContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {code.map((digit, idx) => (
            <CodeInput
              key={idx}
              value={digit}
              onChange={(text) => handleCodeChange(text, idx)}
              prevRef={inputRefs.current[idx - 1]}
              nextRef={inputRefs.current[idx + 1]}
              ref={inputRefs.current[idx]}
            />
          ))}
        </View>
        {seconds == 0 ? (
          <View style={styles.resendContainer}>
            <Text style={styles.resendCodeText}>Didn't get a code?</Text>
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendCodeButonText}>Click to resend</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.resendContainer}>
            <Text style={styles.msgContainerText}>
              Resend verification code in {Math.floor(seconds / 60)}:
              {seconds % 60 < 10 ? "0" : ""}
              {seconds % 60}
            </Text>
          </View>
        )}
        <FormButton name={"Verify"} onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default ResetCode;
