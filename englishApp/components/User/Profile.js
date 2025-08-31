import { useContext, useState } from "react";
import { MyDispatchContext, MyUserContext } from "../../configs/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import ProfileScreen from "../Screen/ProfileScreen";
import { updateProfile } from "../../configs/LoadData";

const Profile = () => {
  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);

  const [editingFirstName, setEditingFirstName] = useState(false);
  const [editingLastName, setEditingLastName] = useState(false);
  const [newFirstName, setNewFirstName] = useState(user?.firstName || "");
  const [newLastName, setNewLastName] = useState(user?.lastName || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [dob, setDob] = useState(user?.dob ? new Date(user.dob) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      dispatch({ type: "logout" });
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
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
      setAvatar(result.assets[0].uri);
      handleEdit("avatar", result.assets[0]);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDob(selectedDate);
      const formattedDate = selectedDate.toISOString().split("T")[0];
      handleEdit("dob", formattedDate);
    }
  };

  const handleEdit = async (field, editedData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstName", newFirstName || user.firstName || "");
      formData.append("lastName", newLastName || user.lastName || "");
      formData.append("dob", dob.toISOString().split("T")[0] || user.dob || "");

      if (field === "avatar") {
        formData.append("avatar", {
          uri: editedData.uri,
          name: editedData.fileName || "avatar.jpg",
          type:
            editedData.type && editedData.type.startsWith("image/")
              ? editedData.type
              : "image/jpeg",
        });
      } else {
        formData.set(field, editedData);
      }
      const response = await updateProfile(formData);
      dispatch({ type: "login", payload: response });
    } catch (err) {
      console.error("Lỗi cập nhật dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileScreen
      user={user}
      loading={loading}
      editingFirstName={editingFirstName}
      editingLastName={editingLastName}
      newFirstName={newFirstName}
      newLastName={newLastName}
      dob={dob}
      showDatePicker={showDatePicker}
      avatar={avatar}
      setEditingFirstName={setEditingFirstName}
      setEditingLastName={setEditingLastName}
      setNewFirstName={setNewFirstName}
      setNewLastName={setNewLastName}
      setShowDatePicker={setShowDatePicker}
      logout={logout}
      pickImage={pickImage}
      handleDateChange={handleDateChange}
      handleEdit={handleEdit}
    />
  );
};

export default Profile;
