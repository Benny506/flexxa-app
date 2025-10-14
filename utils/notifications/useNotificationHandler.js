import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { getValue, setValue } from '../secureStore/secureStore';




export const getNotificationToken = async () => {
    try {

        let { status } = await Notifications.getPermissionsAsync();
        
        if (status !== 'granted') {
          await Notifications.requestPermissionsAsync();
          status = request.status;
        }

        if (status !== 'granted') {
            console.log("Notification permissions not granted");
            return { notification_token: null };
        }
      
        
        const token = await Notifications.getExpoPushTokenAsync({
            projectId: "c4e39984-28d8-4cf9-b706-fd7e8fafa26a"
        });

        console.log(token.data)
        
        return { notification_token: token.data }

    } catch (error) {
        console.log("Error retrieving expo notification", error)
        return { notification_token: null }
    }
};




export default function useNotificationHandler(){

  useEffect(() => {
    // Handle notifications when app is on foreground
    const foregroundSubscription = Notifications.addNotificationReceivedListener(async notification => {
  
      const notif = notification

      await handleNotificationOnce(notif, (notification) => {
        notificationReceiver(notification.request.content.data);
      });
    });





    // Handle app opened from background via notification
    const subscription = Notifications.addNotificationResponseReceivedListener(async response => {
      const notif = response?.notification;
    
      await handleNotificationOnce(notif, (notification) => {
        notificationReceiver(notification.request.content.data);
      });
    });
    




    // Handle app opened from killed (cold start)
    const checkInitialNotification = async () => {
      const lastResponse = await Notifications.getLastNotificationResponseAsync();
      const notif = lastResponse?.notification;
    
      await handleNotificationOnce(notif, (notification) => {
        notificationReceiver(notification.request.content.data);
      });
    };

    checkInitialNotification();

    return () => {
      subscription.remove()
      foregroundSubscription.remove();
    };
  }, []);


  const handleNotificationOnce = async (notification, onHandle) => {
    try {

      const LAST_NOTIFICATION_KEY = 'lastHandledNotificationId';

      if (!notification) return;
    
      const notifId = notification.request?.identifier;
      if (!notifId) return;
    
      const alreadyHandledId = await getValue({ key: LAST_NOTIFICATION_KEY });
  
      if(alreadyHandledId.error) return;
    
      if (notifId !== alreadyHandledId.value) {
        await setValue({ key: LAST_NOTIFICATION_KEY, value: notifId });
        
        onHandle(notification);
  
      } else {
        console.log('Skipping previously handled notification:', notifId);
      }
      
    } catch (error) {
      console.log("Notification handler error!", error)
    }
  };



  const notificationReceiver = (data) => {
    try {

      const { notification_type, notification_data } = data;

      if (!notification_type) return;

      if(notification_type == 'scheduleReminder'){
        // const { scheduleData } = notification_data

        // scheduleReminder({ scheduleData })
      }

    } catch (error) {
      console.log(error)      
    }

    return;
  };    
}