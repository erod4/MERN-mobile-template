import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home/Home";
import Settings from "../Screens/Settings/Settings";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGear, faHome } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../Context/ThemeContext/ThemeContext";

const BottomTabs = () => {
  const Tab = createBottomTabNavigator();
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.activeTintColor,
        tabBarInactiveTintColor: theme.colors.inactiveTintColor,
        tabBarStyle: {
          backgroundColor: theme.colors.cardColor,
          borderTopColor: theme.colors.cardColor,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon
              icon={faHome}
              color={
                focused
                  ? theme.colors.activeTintColor
                  : theme.colors.inactiveTintColor
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon
              icon={faGear}
              color={
                focused
                  ? theme.colors.activeTintColor
                  : theme.colors.inactiveTintColor
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
