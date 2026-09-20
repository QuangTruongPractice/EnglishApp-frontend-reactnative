import { useState, useContext } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { fetchLeaderBoard } from "../../configs/LoadData";
import LeaderBoardScreen from "../Screen/LeaderBoardScreen";
import styles from "../../styles/LeaderBoardStyles";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getCache, CACHE_KEYS } from "../../utils/cache";
import { MyUserContext } from "../../configs/Context";

const LeaderBoard = () => {
  const userContext = useContext(MyUserContext);
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
        if (response.result && response.result.leaderBoard) {
           fetchedLeaderBoard = response.result.leaderBoard;
           const cur = response.result.currentUser || null;
           if (cur) {
             if (profile?.avatar && (!cur.avatar && !cur.avatarUrl)) cur.avatar = profile.avatar;
             if (userContext?.avatar && (!cur.avatar && !cur.avatarUrl)) cur.avatar = userContext.avatar;
             if (userContext?.equippedFrame && !cur.equippedFrame) cur.equippedFrame = userContext.equippedFrame;
           }
           setCurrentUser(cur);
        } else {
           // Fallback in case backend returns old structure
           fetchedLeaderBoard = Array.isArray(response.result) ? response.result : [];
           if (profile && profile.userId) {
             const userInList = fetchedLeaderBoard.find(u => u.userId === profile.userId);
             if (userInList) {
               setCurrentUser(userInList);
             }
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
      userContext={userContext}
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
