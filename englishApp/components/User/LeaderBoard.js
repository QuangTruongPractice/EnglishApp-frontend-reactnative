import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { fetchLeaderBoard } from "../../configs/LoadData";
import LeaderBoardScreen from "../Screen/LeaderBoardScreen";
import styles from "../../styles/LeaderBoardStyles";
import { useNavigation } from "@react-navigation/native";

const LeaderBoard = () => {
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const nav = useNavigation();

  const loadLeaderBoard = async () => {
    try {
      setLoading(true);
      const response = await fetchLeaderBoard();
      const data = response.result;
      setLeaderBoard(data.leaderBoard);
      setCurrentUser(data.currentUser);
    } catch (e) {
      console.error(e);
      setError("Không tải được bảng xếp hạng. Vui lòng thử lại.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadLeaderBoard();
  }, []);

  const handleGoBack = () => {
    nav.goBack();
  };

  const onRefresh = () => {
    setRefreshing(true);
    setError(null);
    loadLeaderBoard();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  return (
    <LeaderBoardScreen
      leaderBoard={leaderBoard}
      currentUser={currentUser}
      refreshing={refreshing}
      onRefresh={onRefresh}
      formatDate={formatDate}
      getRankIcon={getRankIcon}
      error={error}
      onGoBack={handleGoBack}
    />
  );
};

export default LeaderBoard;