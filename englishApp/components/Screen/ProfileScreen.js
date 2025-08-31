import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Button, Card, Icon } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../../styles/ProfileStyles";
import Loading from "../layout/Loading";

const ProfileScreen = ({
  user,
  loading,
  editingFirstName,
  editingLastName,
  newFirstName,
  newLastName,
  dob,
  showDatePicker,
  avatar,
  setEditingFirstName,
  setEditingLastName,
  setNewFirstName,
  setNewLastName,
  setShowDatePicker,
  logout,
  pickImage,
  handleDateChange,
  handleEdit,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Chưa cập nhật";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getRoleDisplay = (role) => {
    switch (role) {
      case "ADMIN":
        return "Quản trị viên";
      case "USER":
        return "Người dùng";
      default:
        return "Chưa xác định";
    }
  };

  if (!user) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <Loading />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#d32f2f" />
          <Text style={styles.loadingText}>Đang cập nhật thông tin...</Text>
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Card style={styles.card}>
          <View style={styles.avatarSection}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={{
                  uri:
                    user.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                }}
                style={styles.avatar}
              />
              <View style={styles.cameraButton}>
                <Icon source="camera" size={16} color="white" />
              </View>
            </TouchableOpacity>

            <Text style={styles.displayName}>
              {user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : user.username || "Người dùng"}
            </Text>

            <Text style={styles.email}>{user.email || "Chưa có email"}</Text>
            <Text style={styles.role}>{getRoleDisplay(user.role)}</Text>

            <View
              style={[
                styles.statusBadge,
                user.isActive ? styles.activeBadge : styles.inactiveBadge,
              ]}
            >
              <Icon
                source={user.isActive ? "check-circle" : "close-circle"}
                size={14}
                color={user.isActive ? "#4CAF50" : "#f44336"}
              />
              <Text
                style={[
                  styles.statusText,
                  { color: user.isActive ? "#4CAF50" : "#f44336" },
                ]}
              >
                {user.isActive ? "Đang hoạt động" : "Tài khoản bị khóa"}
              </Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Họ</Text>
            <View style={styles.fieldRow}>
              {editingFirstName ? (
                <TextInput
                  value={newFirstName}
                  onChangeText={setNewFirstName}
                  placeholder="Nhập họ"
                  style={styles.input}
                />
              ) : (
                <Text style={[styles.info, styles.flex1]}>
                  {user.firstName || "Chưa cập nhật"}
                </Text>
              )}
              <TouchableOpacity
                onPress={() => {
                  if (editingFirstName) {
                    handleEdit("firstName", newFirstName);
                    setEditingFirstName(false);
                  } else {
                    setEditingFirstName(true);
                    setNewFirstName(user.firstName || "");
                  }
                }}
                style={styles.editButton}
              >
                <Icon
                  source={editingFirstName ? "check" : "pencil"}
                  size={22}
                  color="#d32f2f"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Tên</Text>
            <View style={styles.fieldRow}>
              {editingLastName ? (
                <TextInput
                  value={newLastName}
                  onChangeText={setNewLastName}
                  placeholder="Nhập tên"
                  style={styles.input}
                />
              ) : (
                <Text style={[styles.info, styles.flex1]}>
                  {user.lastName || "Chưa cập nhật"}
                </Text>
              )}
              <TouchableOpacity
                onPress={() => {
                  if (editingLastName) {
                    handleEdit("lastName", newLastName);
                    setEditingLastName(false);
                  } else {
                    setEditingLastName(true);
                    setNewLastName(user.lastName || "");
                  }
                }}
                style={styles.editButton}
              >
                <Icon
                  source={editingLastName ? "check" : "pencil"}
                  size={22}
                  color="#d32f2f"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Ngày sinh</Text>
            <View style={styles.fieldRow}>
              <Text style={[styles.info, styles.flex1]}>
                {formatDate(user.dob)}
              </Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.editButton}
              >
                <Icon source="calendar" size={22} color="#d32f2f" />
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={dob}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
                minimumDate={new Date(1900, 0, 1)}
              />
            )}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Ngày tạo tài khoản</Text>
            <Text style={[styles.info, styles.readOnly]}>
              {formatDate(user.createdDate || user.createdAt)}
            </Text>
          </View>

          <Button
            mode="contained"
            buttonColor="#d32f2f"
            textColor="white"
            style={styles.logoutButton}
            onPress={logout}
            icon="logout"
          >
            Đăng xuất
          </Button>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
