import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { height, width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { useTheme } from "../../Context/ThemeContext/ThemeContext";
import { authContext } from "../../Context/AuthContext/AuthContext";

const Home = () => {
  const { getUserAction } = useContext(authContext);
  useEffect(() => {
    getUserAction();
  }, []);
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    screen: {
      height: "100%",
      width: "100%",
      backgroundColor: theme.colors.backgroundColor,
    },
  });
  return <SafeAreaView style={styles.screen}></SafeAreaView>;
};

export default Home;
