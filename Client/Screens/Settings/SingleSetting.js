import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { fa0, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../Context/ThemeContext/ThemeContext";

const SingleSetting = ({ icon, name, link, isLast }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        height: 55,
        alignItems: "center",
        borderBottomWidth: isLast ? 0 : 0.5,
        borderBottomColor: theme.colors.cardBorderSeperator,
      }}
      onPress={link}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 15,
        }}
      >
        <FontAwesomeIcon
          icon={icon ? icon : fa0}
          color={theme.colors.card_text_primary}
        />
        <Text
          style={{
            fontSize: theme.font_size.medium,
            fontWeight: theme.font_weight.message,
            color: theme.colors.card_text_primary,
          }}
        >
          {name}
        </Text>
      </View>
      <FontAwesomeIcon
        icon={faChevronRight}
        color={theme.colors.card_text_primary}
      />
    </TouchableOpacity>
  );
};

export default SingleSetting;
