import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
  }),
});

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  // dealing with notifications
  useEffect(() => {
    // received notification
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification received:', notification);
    });

    // response notification
    const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response received:', response);
    });

    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);


  // get push token
  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    const pushToken = await Notifications.getExpoPushTokenAsync();
    console.log('Push token:', pushToken);

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }
  };

  const scheduleNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Hello',
          body: 'World',
          data: { userName: 'John Doe' },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 3,
          channelId: 'default',
        },
      });
      console.log('Notification scheduled for 5 seconds from now');
    } catch (error) {
      alert('Error scheduling notification: ' + error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Schedule Notification" onPress={scheduleNotification} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
