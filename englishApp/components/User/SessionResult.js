import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../../styles/SessionStyles";

const SessionResult = ({ totalXP, levelUpData, onFinish }) => {
  const isLevelUp = levelUpData?.isLevelUp || false;
  const newLevel = levelUpData?.newLevel || null;

  return (
    <View style={styles.resultContainer}>
      <View style={styles.trophyContainer}>
        <Icon name="trophy" size={80} color="#FFD700" />
      </View>

      <Text style={styles.congratsTitle}>
        {isLevelUp ? "CHÚC MỪNG THĂNG CẤP! 🎉" : "CHÚC MỪNG!"}
      </Text>
      <Text style={styles.congratsText}>
        {isLevelUp
          ? `Bạn đã lên cấp độ ${newLevel}!\nHãy tiếp tục phấn đấu nhé!`
          : "Bạn đã hoàn thành mục tiêu học tập hôm nay.\nHãy tiếp tục duy trì phong độ nhé!"}
      </Text>

      <View style={styles.xpBadge}>
        <Icon name="flash" size={32} color="#FFD700" />
        <Text style={styles.xpText}>+{totalXP} XP</Text>
      </View>

      {isLevelUp && (
        <View style={[styles.xpBadge, { backgroundColor: "rgba(99, 102, 241, 0.2)", borderColor: "rgba(99, 102, 241, 0.3)" }]}>
          <Icon name="arrow-up-bold-circle" size={28} color="#818cf8" />
          <Text style={[styles.xpText, { color: "#818cf8", fontSize: 18 }]}>Level: {newLevel}</Text>
        </View>
      )}

      <TouchableOpacity style={[styles.buttonPrimary, { width: "100%", flex: 0, marginTop: 20 }]} onPress={onFinish}>
        <Text style={styles.buttonTextPrimary}>TIẾP TỤC</Text>
        <Icon name="arrow-right" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default SessionResult;
