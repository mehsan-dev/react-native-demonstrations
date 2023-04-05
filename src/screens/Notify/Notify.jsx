import React from "react";
import { View, StyleSheet } from "react-native";
import NotifyButton from "../../components/NotifyButton/NotifyButton";

const Notify = () => (
  <View style={styles.container}>
    <NotifyButton />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Notify;
