import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { height, width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { useTheme } from "../../Context/ThemeContext/ThemeContext";

const Home = () => {
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
