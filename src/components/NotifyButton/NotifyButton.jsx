import { StyleSheet } from "react-native";

const { Button } = require("react-native-elements");
import * as Notifications from "expo-notifications";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const NotifyButton = () => {
  useFocusEffect(
    useCallback(() => {
      permissions();
    }, [])
  );

  const permissions = async () => {
    const perm = await Notifications.getPermissionsAsync();
    console.log("statusss", perm.granted);
    if (!perm.granted) {
      const finalPerm = await Notifications.requestPermissionsAsync();
      if (!finalPerm.granted) {
        alert(
          "Notification permission required. To use this feature, you need to enable notification permission in the app settings."
        );
      }
    }
  };

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here" },
      },
      trigger: null,
    });
  }

  return (
    <Button
      onPress={async () => await schedulePushNotification()}
      s
      buttonStyle={styles.actionBtn}
      title="Notify"
      titleProps={{ style: { fontSize: 80, color: "white" } }}
    />
  );
};

export default NotifyButton;

const styles = StyleSheet.create({
  actionBtn: {
    backgroundColor: "red",
    borderRadius: 100,
    margin: "auto",
    padding: 40,
  },
  actionBtnIcon: { marginRight: 10 },
});
