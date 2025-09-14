import { ScrollView, View, Text, RefreshControl, TouchableOpacity } from "react-native";
import { Card, Chip } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import styles from "../../styles/LeaderBoardStyles";
import { SafeAreaView } from "react-native-safe-area-context";

const LeaderBoardScreen = ({
  leaderBoard,
  currentUser,
  refreshing,
  onRefresh,
  formatDate,
  getRankIcon,
  error,
  onGoBack,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={onGoBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitleMain}>🏆 Bảng Xếp Hạng</Text>
        <View style={styles.headerSpacer} />
      </View>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Current User */}
        {currentUser ? (
          <Card style={styles.currentUserCard}>
            <Card.Content>
              <Text variant="titleLarge">{currentUser.fullName}</Text>
              <Text variant="bodyMedium">
                Hoàn thành: {currentUser.completedCount} lần
              </Text>
              <Text variant="bodyMedium">
                Lần đầu: {formatDate(currentUser.firstCompletedAt)}
              </Text>
            </Card.Content>
          </Card>
        ) : (
          <Card style={styles.unrankedCard}>
            <Card.Content style={styles.center}>
              <Text variant="titleLarge">Chưa có xếp hạng</Text>
              <Text variant="bodyMedium">
                Hoàn thành bài học để có xếp hạng!
              </Text>
            </Card.Content>
          </Card>
        )}

        {/* Leaderboard */}
        {leaderBoard.map((user, index) => {
          const rank = index + 1;
          const isCurrentUser =
            currentUser && user.userId === currentUser.userId;

          return (
            <Card
              key={user.userId}
              style={[
                styles.userCard,
                isCurrentUser && styles.currentUserHighlight,
              ]}
            >
              <Card.Content>
                <View style={styles.userRow}>
                  <View style={styles.userInfo}>
                    <Text style={styles.rankText}>{getRankIcon(rank)}</Text>
                    <View style={styles.userDetails}>
                      <Text variant="titleLarge" style={styles.userName}>
                        {user.fullName}
                        {isCurrentUser && (
                          <Chip compact style={styles.youChip}>
                            Bạn
                          </Chip>
                        )}
                      </Text>
                      <Text variant="bodyMedium">
                        {formatDate(user.firstCompletedAt)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.userStats}>
                    <Text style={styles.completedCount}>
                      {user.completedCount}
                    </Text>
                    <Text style={styles.completedLabel}>lần</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          );
        })}

        {error && (
          <Card style={styles.errorCard}>
            <Card.Content>
              <Text variant="bodyMedium" style={styles.errorText}>
                {error}
              </Text>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeaderBoardScreen;
