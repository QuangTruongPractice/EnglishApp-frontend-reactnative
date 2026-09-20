import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StatusBar, Animated } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../../styles/SessionStyles";
import LevelUpgrade from "../Effects/LevelUpgrade";

const SessionResult = ({ totalXP = 0, gemsEarned = 50, levelUpData, onFinish, onClose }) => {
  const [showAnimation, setShowAnimation] = useState(levelUpData?.isLevelUp || false);
  const isLevelUp = levelUpData?.isLevelUp || false;
  const oldLevel = levelUpData?.oldLevel || "A1";
  const newLevel = levelUpData?.newLevel || "A2";

  // Animations
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const cardsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!showAnimation) {
      Animated.sequence([
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 6,
            tension: 40,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        Animated.spring(cardsAnim, {
          toValue: 1,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showAnimation]);

  if (showAnimation) {
    return (
      <View style={[styles.resultContainer, { justifyContent: 'center', backgroundColor: '#06060f' }]}>
        <StatusBar barStyle="light-content" />
        <LevelUpgrade 
          fromLevel={oldLevel} 
          toLevel={newLevel} 
          onComplete={() => setShowAnimation(false)}
          fullScreen={true}
        />
        <View style={{ position: 'absolute', bottom: 60, width: '100%', alignItems: 'center', zIndex: 10000 }}>
          <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, letterSpacing: 1 }}>VUỐT XUỐNG HOẶC NHẤN ĐỂ BỎ QUA</Text>
          <TouchableOpacity 
            onPress={() => setShowAnimation(false)}
            style={{ marginTop: 5, padding: 15 }}
          >
            <Icon name="chevron-down" size={36} color="rgba(255,255,255,0.6)" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <LinearGradient 
      colors={["#4a0d0d", "#8B1E1E", "#9B2C2C"]} 
      style={styles.resultContainer}
    >
      <StatusBar barStyle="light-content" />
      
      {/* Close Button */}
      <TouchableOpacity 
        style={styles.resultCloseButton} 
        onPress={onClose}
        activeOpacity={0.7}
      >
        <Icon name="close" size={24} color="#fff" />
      </TouchableOpacity>

      <Animated.View style={[styles.resultHeader, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.trophyContainer}>
          <Icon name="trophy" size={72} color="#FFD700" />
        </View>

        <Text style={styles.congratsTitle}>
          {isLevelUp ? "THĂNG CẤP! 🎉" : "HOÀN THÀNH!"}
        </Text>
        <Text style={styles.congratsText}>
          {isLevelUp
            ? `Chúc mừng! Bạn đã đạt đến cấp độ ${newLevel}. Hãy tiếp tục chinh phục những thử thách mới nhé!`
            : "Tuyệt vời! Bạn đã hoàn thành tất cả các bài tập trong phiên học hôm nay."}
        </Text>
      </Animated.View>

      {/* REWARDS CARDS */}
      <Animated.View
        style={[
          styles.xpCard,
          {
            opacity: cardsAnim,
            transform: [
              {
                translateY: cardsAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.rewardsRow}>
          {/* XP Reward Card */}
          <View style={styles.rewardCardXP}>
            <View style={styles.rewardIconCircleXP}>
              <Icon name="flash" size={26} color="#FFD700" />
            </View>
            <Text style={styles.rewardValueXP}>+{totalXP}</Text>
            <Text style={styles.rewardLabelXP}>KINH NGHIỆM</Text>
          </View>

          {/* Gems Reward Card */}
          {gemsEarned > 0 && (
            <View style={styles.rewardCardGem}>
              <View style={styles.rewardIconCircleGem}>
                <Text style={{ fontSize: 22 }}>💎</Text>
              </View>
              <Text style={styles.rewardValueGem}>+{gemsEarned}</Text>
              <Text style={styles.rewardLabelGem}>GEMS THƯỞNG</Text>
            </View>
          )}
        </View>
        
        {isLevelUp && (
          <View style={styles.levelUpProgressBadge}>
            <Icon name="school" size={22} color="#818CF8" />
            <Text style={styles.levelUpProgressText}>Cấp độ mới: {oldLevel} → {newLevel}</Text>
            <Icon name="chevron-double-up" size={22} color="#818CF8" />
          </View>
        )}
      </Animated.View>

      <View style={styles.resultFooter}>
        <TouchableOpacity style={styles.buttonPrimaryResult} onPress={onFinish} activeOpacity={0.85}>
          <Text style={styles.buttonTextPrimaryResult}>TIẾP TỤC</Text>
          <Icon name="arrow-right" size={24} color="#9B2C2C" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default SessionResult;
