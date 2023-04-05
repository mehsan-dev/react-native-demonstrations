import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Auth/Login/Login";
import Notify from "./src/screens/Notify/Notify";
import Signup from "./src/screens/Auth/Signup/Signup";
import TextScreen from "./src/screens/Text/Text";
import Photo from "./src/screens/Photo/Photo";
import Calculate from "./src/screens/Calculate/Calculate";
import ResetPassword from "./src/screens/Auth/ResetPassword/ResetPassword";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ title: "Sign Up" }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ title: "Password Reset" }}
        />
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tabs = () => (
  <Tab.Navigator screenOptions={{ tabBarLabelPosition: "beside-icon" }}>
    <Tab.Screen name="Notify" component={Notify} />
    <Tab.Screen name="Photo" component={Photo} />
    <Tab.Screen name="Text" component={TextScreen} />
    <Tab.Screen name="Calculate" component={Calculate} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
