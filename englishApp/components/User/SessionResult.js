import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../../styles/SessionStyles";

const SessionResult = ({ totalXP, levelUpData, onFinish, onClose }) => {
  const isLevelUp = levelUpData?.isLevelUp || false;
  const newLevel = levelUpData?.newLevel || null;

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

      <View style={styles.resultHeader}>
        <View style={styles.trophyContainer}>
          <Icon name="trophy" size={80} color="#FFD700" />
        </View>

        <Text style={styles.congratsTitle}>
          {isLevelUp ? "THĂNG CẤP! 🎉" : "HOÀN THÀNH!"}
        </Text>
        <Text style={styles.congratsText}>
          {isLevelUp
            ? `Chúc mừng! Bạn đã đạt đến cấp độ ${newLevel}. Hãy tiếp tục chinh phục những thử thách mới nhé!`
            : "Tuyệt vời! Bạn đã hoàn thành tất cả các bài tập trong phiên học hôm nay."}
        </Text>
      </View>

      <View style={styles.xpCard}>
        <View style={styles.xpBadge}>
          <Icon name="flash" size={40} color="#FFD700" />
          <Text style={styles.xpText}>+{totalXP} XP</Text>
        </View>
        
        {isLevelUp && (
          <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 }}>
            <Icon name="chevron-double-up" size={24} color="#818cf8" />
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: '700', marginLeft: 8 }}>Cấp độ mới: {newLevel}</Text>
          </View>
        )}
      </View>

      <View style={styles.resultFooter}>
        <TouchableOpacity style={styles.buttonPrimaryResult} onPress={onFinish}>
          <Text style={styles.buttonTextPrimaryResult}>TIẾP TỤC</Text>
          <Icon name="arrow-right" size={24} color="#9B2C2C" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default SessionResult;
