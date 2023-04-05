import React from "react";
import { View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import AuthForm from "../../../components/AuthForm/AuthForm";
import Constants from "../../../constants/Constants";

const ResetPassword = () => {
  const {
    AUTH: {
      FORM_TYPE: { RESET_PASSWORD },
    },
  } = Constants;

  return (
    <>
      <View style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          <AuthForm type={RESET_PASSWORD} />
        </Card>
      </View>
    </>
  );
};

export default ResetPassword;

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
