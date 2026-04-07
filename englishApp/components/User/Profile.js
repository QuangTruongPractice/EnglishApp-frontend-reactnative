import { useContext, useState, useEffect } from "react";
import { MyDispatchContext, MyUserContext } from "../../configs/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import ProfileScreen from "../Screen/ProfileScreen";
import { updateProfile, fetchLearningProfile, fetchSummary, loadProfile, updateLearningProfile } from "../../configs/LoadData";
import Toast from "react-native-toast-message";
// import { 
//   getReminderSettings, 
//   scheduleDailyReminder, 
//   cancelAllReminders 
// } from "../../utils/NotificationManager";
// import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { clearAllCache } from "../../utils/cache";

const Profile = () => {
  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);
  const nav = useNavigation();

  const [learningProfile, setLearningProfile] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  
  // Notification State (Commented out)
  // const [reminderEnabled, setReminderEnabled] = useState(false);
  // const [reminderTime, setReminderTime] = useState(new Date());
  // const [showTimePicker, setShowTimePicker] = useState(false);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [identityStatus, learningStatus, summaryStatus] = await Promise.allSettled([
        loadProfile(),
        fetchLearningProfile(),
        fetchSummary()
      ]);

      if (identityStatus.status === 'fulfilled') {
        dispatch({ type: "login", payload: identityStatus.value });
      }
      if (learningStatus.status === 'fulfilled') {
        setLearningProfile(learningStatus.value?.result || learningStatus.value);
      }
      if (summaryStatus.status === 'fulfilled') {
        setSummaryData(summaryStatus.value);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      Toast.show({ type: 'error', text1: 'Lỗi', text2: 'Không thể tải thông tin hồ sơ.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    // loadReminderSettings();
  }, []);

  // const loadReminderSettings = async () => {
  //   const settings = await getReminderSettings();
  //   setReminderEnabled(settings.enabled);
  //   const time = new Date();
  //   time.setHours(settings.hour);
  //   time.setMinutes(settings.minute);
  //   setReminderTime(time);
  // };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await clearAllCache();
      dispatch({ type: "logout" });
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Lỗi', text2: 'Không thể đăng xuất.' });
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      handleEdit("avatar", result.assets[0]);
    }
  };

  const handleEdit = async (field, editedData) => {
    setUpdateLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstName", field === "firstName" ? editedData : (user?.firstName || ""));
      formData.append("lastName", field === "lastName" ? editedData : (user?.lastName || ""));
      formData.append("dob", field === "dob" ? editedData : (user?.dob || ""));

      if (field === "avatar") {
        formData.append("avatar", {
          uri: editedData.uri,
          name: editedData.fileName || "avatar.jpg",
          type: editedData.type && editedData.type.startsWith("image/") ? editedData.type : "image/jpeg",
        });
      }

      const response = await updateProfile(formData);
      dispatch({ type: "login", payload: response });
      Toast.show({ type: 'success', text1: 'Thành công', text2: 'Đã cập nhật thông tin.' });
    } catch (err) {
      console.error("Update profile error:", err);
      Toast.show({ type: 'error', text1: 'Lỗi', text2: 'Không thể cập nhật thông tin.' });
    } finally {
      setUpdateLoading(false);
    }
  };

  const getCooldownInfo = (updatedAt) => {
    if (!updatedAt) return { canUpdate: true, countdownStr: "" };
    const lastUpdate = new Date(updatedAt);
    const now = new Date();
    const diffMs = now.getTime() - lastUpdate.getTime();
    const cooldownMs = 7 * 24 * 60 * 60 * 1000;
    
    if (diffMs >= cooldownMs) {
      return { canUpdate: true, countdownStr: "" };
    }
    
    const remainingMs = cooldownMs - diffMs;
    const days = Math.floor(remainingMs / (24 * 60 * 60 * 1000));
    const hours = Math.floor((remainingMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const countdownStr = `Bạn có thể thay đổi mục tiêu sau: ${days} ngày ${hours} giờ`;
    return { canUpdate: false, countdownStr };
  };

  const handleLearningUpdate = async (dailyTarget, goal) => {
    const { canUpdate, countdownStr } = getCooldownInfo(learningProfile?.profileUpdatedAt);
    
    if (!canUpdate) {
        Toast.show({ type: 'info', text1: 'Thông báo', text2: countdownStr });
        return;
    }
    
    setUpdateLoading(true);
    try {
        await updateLearningProfile({
            dailyTarget: dailyTarget || learningProfile?.dailyTarget,
            goal: goal || learningProfile?.goal
        });
        
        Toast.show({ type: 'success', text1: 'Thành công', text2: 'Đã cập nhật mục tiêu học tập.' });
        fetchAllData();
    } catch (err) {
        console.error("Update learning profile error:", err);
        Toast.show({ type: 'error', text1: 'Lỗi', text2: 'Không thể cập nhật mục tiêu.' });
    } finally {
        setUpdateLoading(false);
    }
  };

  // const handleToggleReminder = async (val) => {
  //   setReminderEnabled(val);
  //   if (!val) {
  //     await cancelAllReminders();
  //     Toast.show({ type: "info", text1: "Thông báo", text2: "Đã tắt nhắc nhở hàng ngày" });
  //   } else {
  //     setShowTimePicker(true);
  //   }
  // };

  // const onTimeChange = async (event, selectedDate) => {
  //   setShowTimePicker(false);
  //   if (selectedDate) {
  //     setReminderTime(selectedDate);
  //     const success = await scheduleDailyReminder(selectedDate.getHours(), selectedDate.getMinutes());
  //     if (success) {
  //       setReminderEnabled(true);
  //       Toast.show({ 
  //         type: "success", 
  //         text1: "Thành công", 
  //         text2: `Đã đặt nhắc nhở vào lúc ${selectedDate.getHours().toString().padStart(2, '0')}:${selectedDate.getMinutes().toString().padStart(2, '0')} hàng ngày` 
  //       });
  //     } else {
  //       setReminderEnabled(false);
  //       Toast.show({ type: "error", text1: "Lỗi", text2: "Không thể cấp quyền thông báo!" });
  //     }
  //   } else if (event.type === 'dismissed') {
  //     const settings = await getReminderSettings();
  //     setReminderEnabled(settings.enabled);
  //   }
  // };

  const cooldownInfo = getCooldownInfo(learningProfile?.profileUpdatedAt);

  return (
    <>
      <ProfileScreen
        user={user}
        learningProfile={learningProfile}
        summaryData={summaryData}
        loading={loading}
        updateLoading={updateLoading}
        logout={logout}
        pickImage={pickImage}
        handleEdit={handleEdit}
        handleLearningUpdate={handleLearningUpdate}
        cooldownInfo={cooldownInfo}
        onRefresh={fetchAllData}
        // reminderEnabled={reminderEnabled}
        // reminderTime={reminderTime}
        // onToggleReminder={handleToggleReminder}
        // onShowTimePicker={() => setShowTimePicker(true)}
      />
      {/* {showTimePicker && (
        <DateTimePicker
          value={reminderTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
        />
      )} */}
    </>
  );
};

export default Profile;
