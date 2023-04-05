import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Input, Button, Text, Overlay } from "react-native-elements";
import { useFormik } from "formik";
import { AUTH_FORM_TYPES } from "../../constants/Constants";
import { useNavigation } from "@react-navigation/native";
import { AuthFormValidation, ResetPasswordValidaton } from "./Validation";
import authService from "../../services/authService";
export default AuthForm = ({ type }) => {
  const { SIGN_UP, LOGIN, RESET_PASSWORD } = AUTH_FORM_TYPES;

  const navigation = useNavigation();
  const [apiError, setApiError] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetModal, setResetModal] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const { handleChange, handleSubmit, handleBlur, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      const { email, password } = values;
      if (type === LOGIN) {
        const { hasError, error } = await authService.login({
          email,
          password,
        });

        if (!hasError) {
          navigation.navigate("Tabs");
        } else {
          setApiError(error.message);
          console.log("err login", error);
        }
      } else if (type == SIGN_UP) {
        const { hasError, error } = await authService.register({
          email,
          password,
        });

        if (!hasError) {
          navigation.navigate("Login");
        } else {
          setApiError(error.message);
          console.log("err login", error);
        }
      } else {
        const { hasError, error } = await authService.forgotPassword({
          email,
        });

        if (hasError) {
          alert(error.message);
        } else {
          setResetModal(true);
        }
      }
    },
    validationSchema:
      type === RESET_PASSWORD ? ResetPasswordValidaton : AuthFormValidation,
  });

  const resetPassword = async () => {
    setIsResetting(true);
    const { error, hasError, data } = await authService.resetPassword({
      code: resetCode,
      newPassword,
    });
    setIsResetting(false);
    if (hasError) {
      alert(error.message);
    } else {
      alert(data);
      setResetModal(false);
      navigation.navigate("Login");
    }
  };

  return (
    <>
      <Text style={styles.formTitle} h4>
        {type} to Continue
      </Text>
      <Input
        label="Your E-mail address"
        placeholder="abc@example.com"
        leftIcon={{ type: "mateiral-icons", name: "email" }}
        errorStyle={styles.error}
        errorMessage={errors.email}
        value={values.email}
        onBlur={handleBlur("email")}
        onChangeText={handleChange("email")}
      />

      {type !== RESET_PASSWORD && (
        <Input
          label="Password"
          placeholder="*********"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          errorStyle={styles.error}
          errorMessage={errors.password}
          value={values.password}
          onBlur={handleBlur("password")}
          onChangeText={handleChange("password")}
          secureTextEntry={true}
        />
      )}
      <Text>{apiError}</Text>
      <Button
        title={type}
        loading={false}
        loadingProps={{ size: "small", color: "white" }}
        buttonStyle={styles.actionBtn}
        titleStyle={styles.actionBtnTitle}
        containerStyle={styles.actionBtnContainer}
        onPress={() => {
          handleSubmit();
        }}
      />

      <View style={{ alignItems: "center" }}>
        {type === LOGIN ? (
          <>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text>Dont have an account? SignUp</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ResetPassword")}
              >
                <Text>Forgot password? Click here!</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text>Already have an account? Login</Text>
          </TouchableOpacity>
        )}
      </View>
      <Overlay
        isVisible={resetModal}
        onBackdropPress={() => setResetModal(false)}
      >
        <View>
          <Input
            label="Enter the code sent to your email!"
            placeholder="4 characters code"
            maxLength={4}
            value={resetCode}
            onChangeText={setResetCode}
          />
          <Input
            label="New Password"
            placeholder="*********"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={true}
          />
          <Button
            title={type}
            loading={isResetting}
            loadingProps={{ size: "small", color: "white" }}
            buttonStyle={styles.actionBtn}
            titleStyle={styles.actionBtnTitle}
            containerStyle={styles.actionBtnContainer}
            onPress={resetPassword}
          />
        </View>
      </Overlay>
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

  formTitle: { textAlign: "center", paddingBottom: 40 },

  error: { color: "red" },

  actionBtn: {
    backgroundColor: "rgba(111, 202, 186, 1)",
    borderRadius: 5,
  },

  actionBtnTitle: { fontWeight: "bold", fontSize: 18 },

  actionBtnContainer: {
    height: 50,
    width: "100%",
    marginTop: 30,
    marginVertical: 10,
  },
});
