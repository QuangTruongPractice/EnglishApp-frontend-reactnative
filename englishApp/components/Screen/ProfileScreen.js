import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../../styles/ProfileStyles";
import { useNavigation } from "@react-navigation/native";

const InfoItemRow = ({ item, handleEdit }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editVal, setEditVal] = React.useState(item.apiValue || "");

  const onSave = () => {
    setIsEditing(false);
    handleEdit(item.type, editVal);
  };

  return (
    <View style={styles.infoItem}>
      <View style={styles.infoIconContainer}>
        <Ionicons name={item.icon} size={20} color="#F45B69" />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{item.label}</Text>
        {isEditing ? (
          <View style={{ borderBottomWidth: 1.5, borderBottomColor: "#F45B69", marginRight: 10 }}>
            <TextInput 
              style={{ fontSize: 15, fontWeight: "700", color: "#333", paddingVertical: 2 }}
              value={editVal}
              onChangeText={setEditVal}
              autoFocus
              placeholder={item.type === 'dob' ? "YYYY-MM-DD" : ""}
            />
          </View>
        ) : (
          <Text style={styles.infoValue}>{item.value}</Text>
        )}
      </View>
      {item.editable !== false && (
        isEditing ? (
          <TouchableOpacity onPress={onSave}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => { setEditVal(item.apiValue || ""); setIsEditing(true); }}>
            <Ionicons name="pencil" size={18} color="#BBB" style={{ padding: 4 }} />
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

const ProfileScreen = ({
  user,
  learningProfile,
  summaryData,
  loading,
  logout,
  pickImage,
  handleEdit,
  handleLearningUpdate,
  cooldownInfo,
}) => {
  const navigation = useNavigation();

  if (loading || !user) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" />
        <Text style={{ marginTop: 20, fontWeight: "700", color: "#999" }}>Đang tải thông tin...</Text>
      </View>
    );
  }

  const getInitials = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return user.username ? user.username.substring(0, 2).toUpperCase() : "UT";
  };

  const getLevelInfo = (level) => {
    const levels = {
      'A1': { next: 'A2', xp: 500, label: 'Beginner' },
      'A2': { next: 'B1', xp: 1000, label: 'Pre-Intermediate' },
      'B1': { next: 'B2', xp: 2000, label: 'Intermediate' },
      'B2': { next: 'C1', xp: 4000, label: 'Upper-Intermediate' },
      'C1': { next: 'C2', xp: 10000, label: 'Advanced' },
      'C2': { next: 'MAX', xp: 99999, label: 'Master' },
    };
    return levels[level] || levels['A1'];
  };

  const currentLevelInfo = getLevelInfo(learningProfile?.level || "A1");
  const currentXp = learningProfile?.totalXp || 0;
  const targetXp = currentLevelInfo.xp;
  const progressPercent = Math.min((currentXp / targetXp) * 100, 100);
  const xpNeeded = Math.max(targetXp - currentXp, 0);

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa cập nhật";
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return `${age} tuổi`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LinearGradient
          colors={["#7B241C", "#9B2C2C", "#C0392B"]}
          style={styles.headerBackground}
        >
          <View style={styles.headerPattern} />
          
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.welcomeText}>Hồ sơ cá nhân</Text>

          <View style={styles.headerTop}>
            <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
              <View style={styles.avatar}>
                {user.avatar ? (
                  <Image source={{ uri: user.avatar }} style={{ width: 80, height: 80, borderRadius: 40 }} />
                ) : (
                  <Text style={styles.avatarText}>{getInitials()}</Text>
                )}
              </View>
              <View style={styles.statusDot} />
            </TouchableOpacity>

            <View style={styles.headerInfo}>
              <Text style={styles.userName}>{`${user.firstName} ${user.lastName}`}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          </View>

          <View style={styles.headerBadges}>
            <View style={styles.badge}>
              <Ionicons name="school" size={16} color="#fff" />
              <Text style={styles.badgeText}>{learningProfile?.level} · {currentLevelInfo.label}</Text>
            </View>
            <View style={styles.badge}>
              <Ionicons name="checkmark-circle" size={16} color="#fff" />
              <Text style={styles.badgeText}>Đang hoạt động</Text>
            </View>
            <View style={styles.badge}>
              <Ionicons name="calendar" size={16} color="#fff" />
              <Text style={styles.badgeText}>Từ {formatDate(user.createdAt)}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statValue}>{learningProfile?.currentStreak || summaryData?.streak || 0}</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>⚡</Text>
            <Text style={styles.statValue}>{learningProfile?.totalXp || 0}</Text>
            <Text style={styles.statLabel}>XP</Text>
          </View>
          <View style={[styles.statItem, { borderRightWidth: 0 }]}>
            <Text style={styles.statIcon}>📚</Text>
            <Text style={[styles.statValue, { color: '#2F80ED' }]}>{learningProfile?.level || "A1"}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
        </View>

        {/* XP Progress Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tiến độ XP</Text>
          </View>
          <View style={styles.progressCard}>
            <View style={styles.progressTop}>
              <View style={styles.levelBadgeContainer}>
                <View style={styles.levelBadge}>
                  <Text style={styles.levelBadgeText}>Cấp độ hiện tại</Text>
                </View>
                <Text style={styles.levelTitle}>{learningProfile?.level} <Text style={{ color: '#999', fontSize: 14 }}>{currentLevelInfo.label}</Text></Text>
              </View>
              <View style={styles.nextLevelInfo}>
                <Text style={styles.nextLevelName}>Lên {currentLevelInfo.next} cần</Text>
                <Text style={styles.neededXp}>+{xpNeeded} XP</Text>
              </View>
            </View>

            <View style={styles.progressBarContainer}>
              <LinearGradient
                colors={["#F45B69", "#9B2C2C"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressBarFill, { width: `${progressPercent}%` }]}
              />
            </View>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabelText}>{currentXp} XP</Text>
              <Text style={styles.targetLabelText}>{targetXp} XP → {currentLevelInfo.next}</Text>
            </View>
          </View>
        </View>

        {/* Streak Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Chuỗi ngày học</Text>
          </View>
          <LinearGradient
            colors={["#1B5E20", "#2E7D32"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.streakCard}
          >
            <View style={styles.streakCardContent}>
              <Text style={styles.streakTitle}>Streak hiện tại</Text>
              <View style={styles.streakMainInfo}>
                <Text style={styles.streakDays}>{learningProfile?.currentStreak || summaryData?.streak || 0}</Text>
                <Text style={styles.streakUnit}>ngày liên tiếp</Text>
              </View>
              <Text style={styles.streakUpdate}>Cập nhật lần cuối: {formatDate(new Date())}</Text>
            </View>
            <View style={styles.streakRecordContainer}>
              <MaterialCommunityIcons name="fire" size={40} color="#FFD700" />
              <Text style={styles.recordTitle}>Kỷ lục</Text>
              <Text style={styles.recordValue}>{learningProfile?.longestStreak || summaryData?.streak || 0} ngày</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Daily Goal Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mục tiêu hàng ngày</Text>
          </View>
          {cooldownInfo?.countdownStr ? (
            <Text style={styles.cooldownText}>{cooldownInfo.countdownStr}</Text>
          ) : null}
          <View style={[styles.goalCard, !cooldownInfo?.canUpdate && styles.goalDisabled]}>
            <View style={styles.goalHeader}>
              <Text style={styles.goalTitle}>Phút học mỗi ngày</Text>
            </View>
            <View style={styles.minutesGrid}>
              {[5, 15, 30].map((mins) => (
                <TouchableOpacity 
                  key={mins} 
                  style={[styles.minuteOption, learningProfile?.dailyTarget === mins && styles.minuteOptionActive]}
                  disabled={!cooldownInfo?.canUpdate}
                  onPress={() => handleLearningUpdate(mins, null)}
                >
                  <Text style={[styles.minuteValue, learningProfile?.dailyTarget === mins && styles.minuteValueActive]}>{mins}</Text>
                  <Text style={[styles.minuteLabel, learningProfile?.dailyTarget === mins && styles.minuteLabelActive]}>PHÚT</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Learning Goals Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mục tiêu học tập</Text>
          </View>
          <View style={[!cooldownInfo?.canUpdate && styles.goalDisabled]}>
            {[
              { id: 'DAILY_COMMUNICATION', name: 'Giao tiếp hàng ngày', sub: 'Daily Communication', icon: 'chatbubbles-outline', color: '#FEEBEB', iconColor: '#E53935' },
              { id: 'BUSINESS_ENGLISH', name: 'Tiếng Anh công việc', sub: 'Business English', icon: 'briefcase-outline', color: '#E3F2FD', iconColor: '#1E88E5' },
              { id: 'EXAM_PREPARATION', name: 'Ôn thi (IELTS, TOEIC...)', sub: 'Exam Preparation', icon: 'school-outline', color: '#FFF3E0', iconColor: '#FB8C00' },
              { id: 'VOCABULARY_EXPANSION', name: 'Mở rộng vốn từ', sub: 'Vocabulary Expansion', icon: 'book-outline', color: '#F3E5F5', iconColor: '#8E24AA' },
              { id: 'TRAVEL', name: 'Du lịch & Khám phá', sub: 'Travel & Explore', icon: 'airplane-outline', color: '#E8F5E9', iconColor: '#43A047' },
            ].map((goal) => (
              <TouchableOpacity 
                key={goal.id} 
                style={[styles.goalItem, learningProfile?.goal === goal.id && styles.goalItemActive]}
                disabled={!cooldownInfo?.canUpdate}
                onPress={() => handleLearningUpdate(null, goal.id)}
              >
                <View style={[styles.goalIconContainer, learningProfile?.goal === goal.id && styles.goalIconContainerActive]}>
                  <Ionicons name={goal.icon} size={22} color={goal.iconColor} />
                </View>
                <View style={styles.goalInfo}>
                  <Text style={styles.goalName}>{goal.name}</Text>
                  <Text style={styles.goalSubname}>{goal.sub}</Text>
                </View>
                <View style={[styles.goalCheck, learningProfile?.goal === goal.id && styles.goalCheckActive]}>
                  {learningProfile?.goal === goal.id && <Ionicons name="checkmark" size={14} color="#fff" />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Personal info section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
          </View>
          <View style={styles.infoList}>
            {[
              { label: 'Họ', value: user.lastName, apiValue: user.lastName, icon: 'person', type: 'lastName' },
              { label: 'Tên', value: user.firstName, apiValue: user.firstName, icon: 'person', type: 'firstName' },
              { label: 'Email', value: user.email, icon: 'mail', type: 'email', editable: false },
              { label: 'Ngày sinh', value: `${formatDate(user.dob)} · ${calculateAge(user.dob)}`, apiValue: user.dob, icon: 'calendar', type: 'dob' },
              { label: 'Ngày tham gia', value: formatDate(user.createdAt), icon: 'time', editable: false },
            ].map((item, idx) => (
              <InfoItemRow key={idx} item={item} handleEdit={handleEdit} />
            ))}
          </View>
        </View>

        {/* Settings section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Cài đặt</Text>
          </View>
          <View style={styles.settingsList}>
            <TouchableOpacity style={styles.settingsItem} onPress={() => navigation.navigate("UpdatePassword")}>
              <View style={styles.settingIconContainer}>
                <Ionicons name="lock-closed" size={20} color="#BBB" />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Bảo mật</Text>
                <Text style={styles.settingSubtitle}>Thay đổi mật khẩu</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#EEE" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsItem}>
              <View style={styles.settingIconContainer}>
                <Ionicons name="notifications" size={20} color="#BBB" />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Thông báo</Text>
                <Text style={styles.settingSubtitle}>Nhắc nhở học hàng ngày</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#EEE" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingsItem}>
              <View style={styles.settingIconContainer}>
                <Ionicons name="star" size={20} color="#BBB" />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Đánh giá ứng dụng</Text>
                <Text style={styles.settingSubtitle}>Ủng hộ WordFlow</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#EEE" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.settingsItem, { borderBottomWidth: 0 }]}>
              <View style={styles.settingIconContainer}>
                <Ionicons name="information-circle" size={20} color="#BBB" />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Về ứng dụng</Text>
                <Text style={styles.settingSubtitle}>Phiên bản 1.0.0</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#EEE" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={24} color="#C53030" />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
