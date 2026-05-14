import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const STORAGE_KEY = "daily_reminder_settings";
const CHANNEL_ID = "daily-reminders";

export const registerForPushNotificationsAsync = async () => {
  let { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    status = newStatus;
  }
  return status === "granted";
};

export const scheduleDailyReminder = async (hour, minute) => {
  try {
    // 1. Tạo channel (Android only)
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
        name: "Daily Reminders",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
      });
    }

    // 2. Kiểm tra permission
    const hasPermission = await registerForPushNotificationsAsync();
    if (!hasPermission) {
      console.warn("Notification permission not granted");
      return false;
    }

    // 3. Hủy thông báo cũ
    await Notifications.cancelAllScheduledNotificationsAsync();

    // 4. Tự detect version để dùng đúng trigger format
    const triggerInputTypes = Notifications.SchedulableTriggerInputTypes;

    const trigger = triggerInputTypes
      ? // SDK 50+ (expo-notifications >= 0.28)
        {
          type: triggerInputTypes.DAILY,
          hour,
          minute,
          ...(Platform.OS === "android" && { channelId: CHANNEL_ID }),
        }
      : // SDK cũ hơn
        {
          hour,
          minute,
          repeats: true,
        };

    // 5. Schedule
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "⏰ Giờ học tiếng Anh đến rồi!",
        body: "Hãy dành 15 phút hôm nay để mở rộng vốn từ của bạn nhé. Đừng để chuỗi học tập bị gián đoạn!",
      },
      trigger,
    });

    // 6. Lưu settings
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ enabled: true, hour, minute, id })
    );
    return true;
  } catch (error) {
    console.error("Chi tiết lỗi:", JSON.stringify(error), error?.message);
    return false;
  }
};

export const cancelAllReminders = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    const settings = await getReminderSettings();
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...settings, enabled: false })
    );
  } catch (error) {
    console.error("Error cancelling reminders:", error);
  }
};

export const getReminderSettings = async () => {
  try {
    const settings = await AsyncStorage.getItem(STORAGE_KEY);
    return settings
      ? JSON.parse(settings)
      : { enabled: false, hour: 20, minute: 0 };
  } catch {
    return { enabled: false, hour: 20, minute: 0 };
  }
};