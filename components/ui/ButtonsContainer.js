import React from "react";
import { StyleSheet, View } from "react-native";
import PrimaryButton from "./PrimaryButton";

const ButtonsContainer = ({ children1, children2, onPress1, onPress2 }) => {
  return (
    <View style={styles.buttonsContainer}>
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={onPress1}>{children1}</PrimaryButton>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={onPress2}>{children2}</PrimaryButton>
      </View>
    </View>
  );
};

export default ButtonsContainer;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
