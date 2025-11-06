import * as Notifications from 'expo-notifications';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

function useNotificationObserver() {
  const router = useRouter();

  useEffect(() => {
    function handleRedirect(notification: Notifications.Notification) {
      const url = notification.request.content.data?.url;

      if (typeof url === 'string') {
        router.push(url as any);
      }
    }

    Notifications.getLastNotificationResponseAsync().then(response => {
      if (response?.notification) {
        handleRedirect(response.notification);
      }
    });

    const subscription = Notifications.addNotificationResponseReceivedListener(
      response => {
        handleRedirect(response.notification);
      }
    );

    return () => subscription.remove();
  }, []);
}

export default function RootLayout() {
  useNotificationObserver();
  return <Stack />;
}
