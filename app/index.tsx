import * as Notifications from 'expo-notifications';
import { Link } from "expo-router";
import { Button, View } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function Index() {
  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Start Check-In",
        body: '2 min daily scan',
        data: { url: "/checkin" },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
      },
    });
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/checkin" style={{ padding: 20 }}>
        Start Check-In
      </Link>
      <Button title="Simulate Notification" onPress={schedulePushNotification} />
    </View>
  );
}
