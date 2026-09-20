import React, { useEffect, useRef } from "react";
import { ScrollView, View, Text, Image, RefreshControl, TouchableOpacity, Dimensions, Animated, Easing } from "react-native";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/LeaderBoardStyles";
import { THEME_COLORS } from "../../constants/theme";
import { CustomSvgFrame } from "../Gamification/CustomSvgFrames";

const { width } = Dimensions.get('window');

const LeaderBoardScreen = ({
  leaderBoard = [],
  currentUser,
  userContext,
  loading,
  refreshing,
  onRefresh,
  error,
  onGoBack,
}) => {
  // Sort leaderboard by rank just in case
  const sortedBoard = [...leaderBoard].sort((a, b) => a.rank - b.rank);
  
  const top3 = sortedBoard.slice(0, 3);
  const others = sortedBoard.slice(3);

  const firstPlace = top3[0];
  const secondPlace = top3[1];
  const thirdPlace = top3[2];

  const getInitials = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  const getUserAvatar = (u) => {
    if (!u) return null;
    // Use avatar directly from backend leaderboard response
    if (u.avatar) return u.avatar;
    if (u.avatarUrl) return u.avatarUrl;
    // Fallback to userContext for current user
    const isCur = (currentUser && u.userId === currentUser.userId) || (userContext && u.userId === userContext.userId);
    if (isCur && (userContext?.avatar || userContext?.avatarUrl)) {
      return userContext.avatar || userContext.avatarUrl;
    }
    return null;
  };

  const getUserFrameKey = (u) => {
    if (!u) return null;
    // Use frameAvatar / equippedFrameKey from backend leaderboard response
    if (u.equippedFrameKey) return u.equippedFrameKey;
    if (u.frameAvatar) return u.frameAvatar;
    if (u.equippedFrame?.frameKey) return u.equippedFrame.frameKey;
    if (u.frameKey) return u.frameKey;
    // Fallback to userContext for current user
    const isCur = (currentUser && u.userId === currentUser.userId) || (userContext && u.userId === userContext.userId);
    if (isCur && userContext?.equippedFrame?.frameKey) {
      return userContext.equippedFrame.frameKey;
    }
    return null;
  };

  // ANIMATION REFS
  const podiumAnim1 = useRef(new Animated.Value(0)).current;
  const podiumAnim2 = useRef(new Animated.Value(0)).current;
  const podiumAnim3 = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const listAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Stagger animation for podium
    if (!loading) {
      Animated.stagger(200, [
        Animated.spring(podiumAnim2, { toValue: 1, friction: 6, tension: 50, useNativeDriver: true }),
        Animated.spring(podiumAnim1, { toValue: 1, friction: 5, tension: 40, useNativeDriver: true }),
        Animated.spring(podiumAnim3, { toValue: 1, friction: 7, tension: 60, useNativeDriver: true }),
      ]).start();

      Animated.timing(listAnim, {
        toValue: 1,
        duration: 500,
        delay: 600,
        useNativeDriver: true
      }).start();
    }

    // Floating animation for sticking banner and crowns
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();
  }, [loading]);

  const floatY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8] // float 8px up
  });

  const getPodiumAnimStyle = (animValue) => {
    const translateY = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0] // slide up from 100px below
    });
    const opacity = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });
    return { transform: [{ translateY }], opacity };
  };

  const renderPodiumAvatar = (user, position) => {
    if (!user) return <View style={[styles.podiumAvatar, styles[`podiumAvatar${position}`], { opacity: 0.3 }]} />;
    
    const frameKey = getUserFrameKey(user);
    const avatarUrl = getUserAvatar(user);
    const isTop1 = position === 1;
    const frameSize = isTop1 ? 92 : 76;
    const avatarSize = isTop1 ? 66 : 54;
    const avatarRadius = avatarSize / 2;

    return (
      <View style={styles.podiumAvatarWrapper}>
        {position === 1 && (
          <Animated.View style={[styles.podiumCrown, { transform: [{ translateY: floatY }] }]}>
            <FontAwesome5 name="crown" size={28} color="#FFD700" solid />
          </Animated.View>
        )}
        <View style={{ width: frameSize, height: frameSize, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <View
            style={[
              styles.podiumAvatar,
              styles[`podiumAvatar${position}`],
              {
                width: avatarSize,
                height: avatarSize,
                borderRadius: avatarRadius,
                borderWidth: frameKey ? 0 : (isTop1 ? 3 : 2),
                overflow: 'hidden',
                position: 'absolute',
              }
            ]}
          >
            {avatarUrl ? (
              <Image
                source={{ uri: avatarUrl }}
                style={{ width: avatarSize, height: avatarSize, borderRadius: avatarRadius }}
                resizeMode="cover"
              />
            ) : (
              <Text style={[styles.podiumAvatarText, isTop1 && styles.podiumAvatarText1]}>
                {getInitials(user.username)}
              </Text>
            )}
          </View>
          {frameKey && (
            <CustomSvgFrame frameKey={frameKey} size={frameSize} />
          )}
        </View>
        <View style={styles.podiumXpBlock}>
          <Text style={styles.podiumXpText}>{user.weeklyXp} XP</Text>
        </View>
      </View>
    );
  };

  const renderPodiumItem = (user, position, animValue) => {
    return (
      <Animated.View style={[styles.podiumItem, getPodiumAnimStyle(animValue)]}>
        {renderPodiumAvatar(user, position)}
        <View style={[styles.podiumCylinder, styles[`podiumCylinder${position}`]]}>
          <Text style={styles.podiumRankText}>{user ? user.rank : position}</Text>
        </View>
        {user && (
          <Text style={styles.podiumNameText} numberOfLines={1}>
            {user.username}
          </Text>
        )}
      </Animated.View>
    );
  };

  const renderListItem = (user, index) => {
    if (!user) return null;
    const isCurrentUser = (currentUser && user.userId === currentUser.userId) || (userContext && user.userId === userContext.userId);
    const frameKey = getUserFrameKey(user);
    const avatarUrl = getUserAvatar(user);
    const frameSize = 56;
    const avatarSize = 40;
    const avatarRadius = 20;

    return (
      <Animated.View 
        key={user.userId || index} 
        style={[
          styles.userCard, 
          isCurrentUser && { borderWidth: 2, borderColor: THEME_COLORS.primary },
          { opacity: listAnim, transform: [{ translateY: listAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }
        ]}
      >
        <View style={styles.userInfo}>
          <View style={styles.rankBadge}>
            <Text style={styles.rankBadgeText}>{user.rank}</Text>
          </View>
          <View style={{ width: frameSize, height: frameSize, justifyContent: 'center', alignItems: 'center', position: 'relative', marginRight: 10 }}>
            <View
              style={[
                styles.avatarSmall,
                {
                  width: avatarSize,
                  height: avatarSize,
                  borderRadius: avatarRadius,
                  marginRight: 0,
                  overflow: 'hidden',
                  position: 'absolute',
                }
              ]}
            >
              {avatarUrl ? (
                <Image
                  source={{ uri: avatarUrl }}
                  style={{ width: avatarSize, height: avatarSize, borderRadius: avatarRadius }}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.avatarSmallText}>{getInitials(user.username)}</Text>
              )}
            </View>
            {frameKey && (
              <CustomSvgFrame frameKey={frameKey} size={frameSize} />
            )}
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName} numberOfLines={1}>{user.username}</Text>
            <View style={styles.levelPill}>
              <Text style={styles.levelPillText}>{user.level || 'Học viên'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.userStats}>
          <Text style={styles.completedCount}>{user.weeklyXp}</Text>
          <Text style={styles.completedLabel}>XP</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <LinearGradient
        colors={['#1E1B4B', '#312E81', '#1E1B4B']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <View style={styles.headerInner}>
          <TouchableOpacity style={styles.backButton} onPress={onGoBack} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitleMain}>BẢNG XẾP HẠNG</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="white" />
          }
        >
          {error ? (
            <View style={styles.errorCard}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : (
            <>
              {/* PODIUM TOP 3 */}
              {(top3.length > 0) && (
                <View style={styles.podiumWrapper}>
                  {renderPodiumItem(secondPlace, 2, podiumAnim2)}
                  {renderPodiumItem(firstPlace, 1, podiumAnim1)}
                  {renderPodiumItem(thirdPlace, 3, podiumAnim3)}
                </View>
              )}

              {/* REWARD CALLOUT BANNER: 500 GEMS FOR TOP 1 */}
              <View style={{
                marginHorizontal: 16,
                marginTop: 10,
                marginBottom: 6,
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                borderWidth: 1,
                borderColor: '#F59E0B',
                borderRadius: 14,
                paddingHorizontal: 14,
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Text style={{ fontSize: 22, marginRight: 8 }}>👑</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: '#FCD34D', fontSize: 13, fontWeight: '800' }}>
                      Phần Thưởng Quán Quân Tuần
                    </Text>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 11 }}>
                      Đứng đầu bảng xếp hạng tuần nhận ngay
                    </Text>
                  </View>
                </View>
                <View style={{
                  backgroundColor: '#F59E0B',
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <Text style={{ fontSize: 13, marginRight: 4 }}>💎</Text>
                  <Text style={{ color: '#0F172A', fontWeight: '900', fontSize: 13 }}>+500</Text>
                </View>
              </View>

              {/* MOTIVATIONAL BANNER */}
              <Animated.View style={[styles.motivationalBanner, { opacity: listAnim }]}>
                <MaterialCommunityIcons name="fire" size={28} color="#EA580C" />
                <View style={styles.motivationalTextWrapper}>
                  {currentUser && currentUser.rank <= 3 ? (
                    <>
                      <Text style={styles.motivationalTitle}>Đẳng cấp nhà vô địch!</Text>
                      <Text style={styles.motivationalDesc}>Bạn đang dẫn đầu, hãy tiếp tục duy trì lửa học tập nhé!</Text>
                    </>
                  ) : (
                    <>
                      <Text style={styles.motivationalTitle}>Tuần này đang rất nóng!</Text>
                      <Text style={styles.motivationalDesc}>Chỉ vài bài tập nữa là bạn có thể thăng hạng. Bứt phá nào!</Text>
                    </>
                  )}
                </View>
              </Animated.View>

              {/* LIST OF OTHERS */}
              <View style={[styles.listContainer, { minHeight: top3.length > 0 ? Dimensions.get('window').height * 0.5 : Dimensions.get('window').height }]}>
                {others.map((u, i) => renderListItem(u, i))}
                
                {leaderBoard.length === 0 && !loading && (
                   <View style={styles.center}>
                     <Text style={{ color: '#6B7280' }}>Chưa có ai trong bảng xếp hạng tuần này.</Text>
                   </View>
                )}
                
                <View style={{ height: 100 }} />
              </View>
            </>
          )}
        </ScrollView>

        {/* STICKY CURRENT USER INFO */}
        {currentUser ? (
          <Animated.View style={[styles.stickyCurrentUser, { transform: [{ translateY: floatY }] }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View style={styles.stickyRankBadge}>
                <Text style={styles.stickyRankBadgeText}>{currentUser.rank || '-'}</Text>
              </View>
              <View style={{ width: 44, height: 44, justifyContent: 'center', alignItems: 'center', position: 'relative', marginRight: 10 }}>
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    position: 'absolute',
                  }}
                >
                  {getUserAvatar(currentUser) ? (
                    <Image
                      source={{ uri: getUserAvatar(currentUser) }}
                      style={{ width: 32, height: 32, borderRadius: 16 }}
                      resizeMode="cover"
                    />
                  ) : (
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }}>
                      {getInitials(currentUser.username)}
                    </Text>
                  )}
                </View>
                {getUserFrameKey(currentUser) && (
                  <CustomSvgFrame frameKey={getUserFrameKey(currentUser)} size={44} />
                )}
              </View>
              <View style={styles.stickyUserDetails}>
                <Text style={styles.stickyUserName} numberOfLines={1}>Bạn ({currentUser.username})</Text>
                <View style={styles.stickyLevelPill}>
                  <Text style={styles.stickyLevelPillText}>{currentUser.level || 'Học viên'}</Text>
                </View>
              </View>
            </View>
            <View style={styles.stickyStats}>
              <Text style={styles.stickyXp}>{currentUser.weeklyXp}</Text>
              <Text style={styles.stickyXpLabel}>XP TUẦN</Text>
            </View>
          </Animated.View>
        ) : (!loading ? (
          <Animated.View style={[styles.stickyCurrentUser, { transform: [{ translateY: floatY }] }]}>
             <View style={styles.stickyUserDetails}>
                <Text style={styles.stickyUserName}>Chưa có xếp hạng</Text>
                <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Làm bài ngay để nhận dải cúp vinh quang!</Text>
             </View>
          </Animated.View>
        ) : null)}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default LeaderBoardScreen;
