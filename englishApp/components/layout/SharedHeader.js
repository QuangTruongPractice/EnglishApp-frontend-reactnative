import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../../styles/HomeStyles";

const SharedHeader = ({ greetingText, nameText, userProfile, summary }) => {
  const userName = userProfile?.firstName
    ? `${userProfile.firstName} ${userProfile.lastName || ""}`.trim()
    : userProfile?.username || "Guest";
  const initials = userProfile?.firstName
    ? userProfile.firstName.charAt(0).toUpperCase()
    : userName.charAt(0).toUpperCase();

  const titleText = nameText || userName;

  return (
    <LinearGradient
      colors={["#4a0d0d", "#6b1a1a", "#7e2222"]}
      style={styles.headerBackground}
    >
      <View style={styles.headerDecorativeCircle} />

      <View style={styles.headerTop}>
        <View style={styles.greetingWrapper}>
          <Text style={styles.greetingText}>{greetingText || "Chào buổi sáng ☀️"}</Text>
          <Text style={styles.nameText}>{titleText}</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statBadge, { backgroundColor: 'rgba(255, 140, 100, 0.2)' }]}>
          <Text style={styles.statText}>🔥 {summary?.streak || 0} ngày</Text>
        </View>
        <View style={[styles.statBadge, { backgroundColor: 'rgba(255, 200, 100, 0.2)' }]}>
          <Text style={styles.statText}>⚡ {summary?.totalXP || 0} XP</Text>
        </View>
        <View style={[styles.statBadge, { backgroundColor: 'rgba(100, 200, 140, 0.2)' }]}>
          <Text style={styles.statText}>📚 {summary?.learningCount || 0} đang học</Text>
        </View>
        <View style={[styles.statBadge, { backgroundColor: 'rgba(100, 150, 255, 0.2)' }]}>
          <Text style={styles.statText}>✔️ {summary?.masteredCount || 0} hoàn thành</Text>
        </View>
        <View style={[styles.statBadge, { backgroundColor: 'rgba(150, 100, 255, 0.2)' }]}>
          <Text style={styles.statText}>🎬 {summary?.videoCount || 0} video</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SharedHeader;
