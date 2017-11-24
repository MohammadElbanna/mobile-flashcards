import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const AppButton = ({ style: passedStyles = [], ...props }) => {
  const { secondary } = props;
  return (
    <TouchableOpacity
      style={[
        styles.all,
        secondary ? styles.secondary : styles.primary,
        ...(Array.isArray(passedStyles) ? passedStyles : [passedStyles])
      ]}
      onPress={props.onPress}
    >
      <Text style={[secondary ? styles.textSecondary : styles.textPrimary]}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textPrimary: {
    textAlign: "center",
    color: "white"
  },
  textSecondary: {
    color: "black",
    textAlign: "center"
  },
  all: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 5,
    width: "70%"
  },
  primary: {
    backgroundColor: "black"
  },
  secondary: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black"
  }
});
export default AppButton;
