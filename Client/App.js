import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home/Home";
import BottomTabs from "./BottomTabs/BottomTabs";
import Login from "./Screens/Login/Login";
import Register from "./Screens/Register/Register";
import ForgotPassword from "./Screens/ForgotPassword/ForgotPassword";
import ReturnButton from "./Shared-Components/ReturnButton/ReturnButton";
import ResetCode from "./Screens/ResetCode/ResetCode";
import { ThemeContextProvider } from "./Context/ThemeContext/ThemeContext";
import Profile from "./Screens/Profile/Profile";
import Privacy_Security from "./Screens/Privacy_Security/Privacy_Security";
import AuthContextProvider from "./Context/AuthContext/AuthContext";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
        hidden={false} // Ensure the status bar is visible
        backgroundColor="transparent" // For Android to blend with the app background
        translucent={true} // For Android to overlay the content
      />
      <NavigationContainer>
        <ThemeContextProvider>
          <AuthContextProvider>
            <Stack.Navigator initialRouteName="login">
              <Stack.Screen
                name="main"
                component={BottomTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="login"
                component={Login}
                options={{
                  animation: "slide_from_left",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="register"
                component={Register}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="forgotPass"
                component={ForgotPassword}
                options={{
                  headerShown: true,
                  headerTitle: "",
                  headerShadowVisible: false,
                  headerTransparent: true,
                  headerStyle: { backgroundColor: "transparent" },
                  headerLeft: () => <ReturnButton />,
                }}
              />
              <Stack.Screen
                name="enterResetCode"
                component={ResetCode}
                options={{
                  animation: "slide_from_right",
                  headerShown: true,
                  headerTitle: "",
                  headerShadowVisible: false,
                  headerTransparent: true,
                  headerLeft: () => <ReturnButton returnTo={"login"} />,
                }}
              />
              <Stack.Screen
                name="profile"
                component={Profile}
                options={{
                  headerShown: true,
                  headerTitle: "",
                  headerShadowVisible: false,
                  headerTransparent: true,

                  headerLeft: () => <ReturnButton />,
                }}
              />
              <Stack.Screen
                name="privacy_security"
                component={Privacy_Security}
                options={{
                  headerShown: true,
                  headerTitle: "",
                  headerShadowVisible: false,
                  headerTransparent: true,

                  headerLeft: () => <ReturnButton />,
                }}
              />
            </Stack.Navigator>
          </AuthContextProvider>
        </ThemeContextProvider>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
