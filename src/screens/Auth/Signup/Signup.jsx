import React from "react";
import { View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import AuthForm from "../../../components/AuthForm/AuthForm";
import { AUTH_FORM_TYPES } from "../../../constants/Constants";

export default Signup = () => {
  const { SIGN_UP } = AUTH_FORM_TYPES;

  return (
    <>
      <View style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          <AuthForm type={SIGN_UP} />
        </Card>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  cardContainer: {
    width: "90%",
    paddingVertical: 30,
    justifyContent: "center",
  },
});
