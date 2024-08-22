import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect } from "react";
import SingleSetting from "./SingleSetting";
import {
  faBug,
  faLock,
  faMessage,
  faRightFromBracket,
  faSliders,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  feedBack,
  nav_to_privacy_security,
  onDelete,
  onLogout,
  profile,
  reportBug,
} from "./SettingItemFunctions";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../Context/ThemeContext/ThemeContext";
import { authContext } from "../../Context/AuthContext/AuthContext";

const Settings = () => {
  const { theme } = useTheme();
  const nav = useNavigation();
  const { logoutUserAction, deleteUserAction, getUserAction } =
    useContext(authContext);
  useEffect(() => {
    getUserAction();
  }, []);
  const styles = StyleSheet.create({
    screen: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.backgroundColor,
    },
    settingsScrollView: {
      width: "100%",
    },
    settingsContentScrollView: {
      alignItems: "center",
      gap: 50,
    },
    titleContainer: {
      width: "90%",
      paddingVertical: 20,
    },
    accountSettingsContainer: {
      width: "90%",
      paddingHorizontal: 10,
      borderRadius: 10,
      backgroundColor: theme.colors.cardColor,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3.84,
    },
    appSettingsContainer: {
      width: "90%",
      paddingHorizontal: 10,
      borderRadius: 10,
      backgroundColor: theme.colors.cardColor,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3.84,
    },
    titleContainerText: {
      fontSize: 24,
      fontWeight: theme.font_weight.title,
      color: theme.colors.text_primary,
    },
    accountSettingsContainerText: {
      fontSize: 21,
      fontWeight: theme.font_weight.message,
    },
    appSettingsContainerText: {
      fontSize: 21,
      fontWeight: theme.font_weight.message,
    },
    deleteButton: {
      width: "90%",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      backgroundColor: "#faccce",
      height: 50,
      marginBottom: 20,
    },
    deleteButtonText: {
      color: "#7c4555",
      fontWeight: theme.font_weight.title,
      fontSize: 18,
    },
  });
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleContainerText}>Settings</Text>
      </View>
      <ScrollView
        style={styles.settingsScrollView}
        contentContainerStyle={styles.settingsContentScrollView}
      >
        <View style={styles.accountSettingsContainer}>
          <View>
            <SingleSetting
              name={"Profile"}
              icon={faUser}
              link={() => profile(nav)}
            />
            <SingleSetting
              name={"Privacy & Security"}
              icon={faLock}
              link={() => nav_to_privacy_security(nav)}
            />
            <SingleSetting
              name={"Preferences"}
              icon={faSliders}
              isLast={true}
            />
          </View>
        </View>
        <View style={styles.appSettingsContainer}>
          {/* <Text style={styles.appSettingsContainerText}>App Settings</Text> */}
          <View>
            <SingleSetting
              name={"Report a bug"}
              icon={faBug}
              link={reportBug}
            />
            <SingleSetting name={"Feedback"} icon={faMessage} link={feedBack} />
            <SingleSetting
              name={"Logout"}
              icon={faRightFromBracket}
              isLast={true}
              link={() => {
                onLogout(logoutUserAction);
              }}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(deleteUserAction)}
      >
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Settings;
