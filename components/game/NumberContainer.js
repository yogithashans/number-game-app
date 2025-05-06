import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

const NumberContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
};

export default NumberContainer;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.accent500,
    borderWidth: 4,
    borderRadius: 8,
    padding: 5,
    margin: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    fontFamily:'open-sans-bold',
    color: Colors.accent500,
    fontSize:36,
    // fontWeight:'bold'
  },
});
