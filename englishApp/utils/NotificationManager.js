// import * as Notifications from "expo-notifications";
// import { Platform } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Configure how notifications should be handled when the app is running
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// const STORAGE_KEY = "daily_reminder_settings";

// /**
//  * Request permissions for local notifications
//  */
// export const registerForPushNotificationsAsync = async () => {
//   let { status } = await Notifications.getPermissionsAsync();
//   if (status !== "granted") {
//     const { status: newStatus } = await Notifications.requestPermissionsAsync();
//     status = newStatus;
//   }
//   return status === "granted";
// };

// /**
//  * Schedule a daily local notification at a specific time
//  * @param {number} hour - 0-23
//  * @param {number} minute - 0-59
//  */
// export const scheduleDailyReminder = async (hour, minute) => {
//   try {
//     // 1. Ensure permissions
//     const hasPermission = await registerForPushNotificationsAsync();
//     if (!hasPermission) return false;

//     // 2. Clear existing reminders
//     await cancelAllReminders();

//     // 3. Schedule new one
//     const id = await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "⏰ Giờ học tiếng Anh đến rồi!",
//         body: "Hãy dành 15 phút hôm nay để mở rộng vốn từ của bạn nhé. Đừng để chuỗi học tập (streak) bị gián đoạn!",
//         sound: true,
//       },
//       trigger: {
//         hour,
//         minute,
//         repeats: true,
//       },
//     });

//     // 4. Save settings
//     await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ enabled: true, hour, minute, id }));
//     return true;
//   } catch (error) {
//     console.warn("Lỗi khi đặt lịch nhắc nhở:", error);
//     return false;
//   }
// };

// /**
//  * Cancel all scheduled reminders
//  */
// export const cancelAllReminders = async () => {
//   try {
//     await Notifications.cancelAllScheduledNotificationsAsync();
//     const settings = await getReminderSettings();
//     await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ ...settings, enabled: false }));
//   } catch (error) {
//     // Bỏ qua
//   }
// };

// /**
//  * Get current reminder settings from storage
//  */
// export const getReminderSettings = async () => {
//   try {
//     const settings = await AsyncStorage.getItem(STORAGE_KEY);
//     return settings ? JSON.parse(settings) : { enabled: false, hour: 20, minute: 0 };
//   } catch (error) {
//     return { enabled: false, hour: 20, minute: 0 };
//   }
// };
