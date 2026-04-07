import { useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { fetchLeaderBoard } from "../../configs/LoadData";
import LeaderBoardScreen from "../Screen/LeaderBoardScreen";
import styles from "../../styles/LeaderBoardStyles";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getCache, CACHE_KEYS } from "../../utils/cache";

const LeaderBoard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const nav = useNavigation();

  // Use raw fetchLeaderBoard, we will process inside useQuery if needed
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
       const response = await fetchLeaderBoard();
       const profile = await getCache(CACHE_KEYS.USER_PROFILE);
       
       let fetchedLeaderBoard = [];
       if (response && response.code === 1000) {
         fetchedLeaderBoard = response.result || [];
         if (profile && profile.userId) {
           const userInList = fetchedLeaderBoard.find(u => u.userId === profile.userId);
           if (userInList) {
             setCurrentUser(userInList);
           }
         }
       }
       return fetchedLeaderBoard;
    }
  });

  const leaderBoard = data || [];
  const loading = isLoading;
  const refreshing = isRefetching;



  const handleGoBack = () => {
    nav.goBack();
  };

  const onRefresh = () => {
    refetch();
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
      loading={loading}
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
