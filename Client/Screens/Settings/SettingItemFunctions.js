import { useNavigation } from "@react-navigation/native";
import { ActionSheetIOS, Alert } from "react-native";
import { Linking } from "react-native";

export const onDelete = (deleteUserAction) => {
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ["Cancel", "Confirm"],
      destructiveButtonIndex: 1, // Highlight "Confirm" as a destructive action
      cancelButtonIndex: 0, // The index of the "Cancel" option
      title: "Delete your account",
      message:
        "You will lose all your data by deleting your account. This action cannot be undone.",
    },
    (buttonIndex) => {
      if (buttonIndex === 1) {
        // Confirm option selected
        deleteUserAction();
      } else if (buttonIndex === 0) {
        // Cancel option selected
      }
    }
  );
};
export const onLogout = (logoutUserAction) => {
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ["Cancel", "Confirm"],
      destructiveButtonIndex: 1, // Highlight "Confirm" as a destructive action
      cancelButtonIndex: 0, // The index of the "Cancel" option
      title: "Logout",
      message: "Are you sure you want to log out?",
    },
    (buttonIndex) => {
      if (buttonIndex === 1) {
        logoutUserAction();
      } else if (buttonIndex === 0) {
        // Cancel option selected
      }
    }
  );
};
export const reportBug = () => {
  const email = "example@example.com"; // Replace with the recipient's email address
  const subject = "Report A Bug";

  // Create the mailto URL without the body
  const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        console.log("Email is not supported on this device");
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error("An error occurred", err));
};
export const feedBack = () => {
  const email = "example@example.com"; // Replace with the recipient's email address
  const subject = "Feedback for APP NAME";

  // Create the mailto URL without the body
  const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        console.log("Email is not supported on this device");
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error("An error occurred", err));
};
export const profile = (nav) => {
  nav.navigate("profile");
};
export const nav_to_privacy_security = (nav) => {
  nav.navigate("privacy_security");
};
