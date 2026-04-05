import { ScrollView, View, Text, RefreshControl, TouchableOpacity } from "react-native";
import { Card, Chip } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import styles from "../../styles/LeaderBoardStyles";
import { SafeAreaView } from "react-native-safe-area-context";

const LeaderBoardScreen = ({
  leaderBoard,
  currentUser,
  loading,
  refreshing,
  onRefresh,
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
        <Text style={styles.headerTitleMain}>🏆 Bảng Xếp Hạng Tuần</Text>
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
              <View style={styles.userRow}>
                <View style={styles.userInfo}>
                  <Text style={styles.rankText}>{getRankIcon(currentUser.rank)}</Text>
                  <View style={styles.userDetails}>
                    <Text variant="titleLarge" style={styles.userName}>
                      {currentUser.username} (Bạn)
                    </Text>
                    <Chip compact style={{ backgroundColor: '#fff', width: 60 }}>
                      {currentUser.level}
                    </Chip>
                  </View>
                </View>
                <View style={styles.userStats}>
                  <Text style={styles.completedCount}>{currentUser.weeklyXp}</Text>
                  <Text style={styles.completedLabel}>XP</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        ) : (
          <Card style={styles.unrankedCard}>
            <Card.Content style={styles.center}>
              <Text variant="titleLarge">Chưa có xếp hạng</Text>
              <Text variant="bodyMedium">
                Hoàn thành bài tập để có tên trên bảng vàng!
              </Text>
            </Card.Content>
          </Card>
        )}

        {/* Leaderboard List */}
        {leaderBoard && leaderBoard.length > 0 ? (
          leaderBoard.map((user) => {
            const isCurrentUser = currentUser && user.userId === currentUser.userId;

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
                      <Text style={styles.rankText}>{getRankIcon(user.rank)}</Text>
                      <View style={styles.userDetails}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text variant="titleLarge" style={styles.userName}>
                            {user.username}
                          </Text>
                          <Chip compact style={[styles.levelChip, { marginLeft: 8 }]}>
                            {user.level}
                          </Chip>
                        </View>
                      </View>
                    </View>
                    <View style={styles.userStats}>
                      <Text style={styles.completedCount}>{user.weeklyXp}</Text>
                      <Text style={styles.completedLabel}>XP</Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            );
          })
        ) : !loading && (
          <View style={styles.center}>
            <Text>Không có dữ liệu bảng xếp hạng.</Text>
          </View>
        )}

        {error && (
          <Card style={styles.errorCard}>
            <Card.Content>
              <Text variant="bodyMedium" style={styles.errorText}>
                {error}
              </Text>
            </Card.Content>
          </Card>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeaderBoardScreen;
