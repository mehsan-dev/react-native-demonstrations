import React from "react";
import { View, StyleSheet } from "react-native";
import CalculateForm from "../../components/CalculateForm/CalculateForm";

const Calculate = () => {
  return (
    <View style={styles.container}>
      <CalculateForm />
    </View>
  );
};

export default Calculate;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
