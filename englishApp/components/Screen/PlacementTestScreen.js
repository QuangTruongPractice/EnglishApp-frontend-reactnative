import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { styles } from "../../styles/PlacementTestStyles";

const PlacementTestScreen = ({
  currentQuestion,
  currentIndex,
  totalQuestions,
  timeLeft,
  selectedAnswerId,
  showFeedback,
  submitLoading,
  handleAnswerPress,
}) => {
  if (!currentQuestion) return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#fff" }]}>
      <LinearGradient colors={["#9B2C2C", "#e53935", "#F45B69"]} style={styles.headerBackground}>
        <View style={styles.headerDecorativeCircle} />
        <View style={styles.headerTop}>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${(currentIndex / totalQuestions) * 100}%`,
                  backgroundColor: "#fff",
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentIndex + 1}/{totalQuestions}
          </Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={styles.phaseBadge}>
            <Icon name="medal-outline" size={16} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.phaseBadgeText}>BÀI KIỂM TRA ĐẦU VÀO</Text>
          </View>

          <View
            style={[
              styles.phaseBadge,
              { backgroundColor: timeLeft < 10 ? "#ef4444" : "rgba(255,255,255,0.2)" },
            ]}
          >
            <Icon name="clock-outline" size={16} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.phaseBadgeText}>{timeLeft}s</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={[styles.card, { marginTop: -20, elevation: 12, shadowOpacity: 0.15 }]}>
        <ScrollView contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
          <View style={styles.quizBadge}>
            <Icon name="bullseye-arrow" size={16} color="#f57f17" />
            <Text style={styles.quizBadgeText}>TRẮC NGHIỆM</Text>
          </View>

          <Text style={[styles.quizQuestion, { fontSize: 24, lineHeight: 32 }]}>
            {currentQuestion.question}
          </Text>

          {currentQuestion.text && (
            <View style={[styles.fillContainer, { marginBottom: 20 }]}>
              <Text style={styles.fillText}>{currentQuestion.text}</Text>
            </View>
          )}

          <View style={{ marginTop: 10 }}>
            {currentQuestion.answers.map((answer, index) => {
              const letters = ["A", "B", "C", "D"];
              const isSelected = selectedAnswerId === answer.id;
              const isCorrect = showFeedback && answer.isCorrect;
              const isWrong = showFeedback && isSelected && !answer.isCorrect;

              return (
                <TouchableOpacity
                  key={answer.id}
                  style={[
                    styles.quizOption,
                    isSelected && styles.optionSelected,
                    isCorrect && styles.optionCorrect,
                    isWrong && styles.optionWrong,
                    showFeedback && !isSelected && !answer.isCorrect && { opacity: 0.5 },
                  ]}
                  onPress={() => handleAnswerPress(answer)}
                  activeOpacity={0.7}
                  disabled={showFeedback}
                >
                  <View
                    style={[
                      styles.optionIndex,
                      isCorrect && { backgroundColor: "#10b981" },
                      isWrong && { backgroundColor: "#ef4444" },
                      isSelected && !showFeedback && { backgroundColor: "#9B2C2C" },
                    ]}
                  >
                    {isCorrect ? (
                      <Icon name="check" size={18} color="#fff" />
                    ) : isWrong ? (
                      <Icon name="close" size={18} color="#fff" />
                    ) : (
                      <Text
                        style={[
                          styles.optionIndexText,
                          isSelected && !showFeedback && { color: "#fff" },
                        ]}
                      >
                        {letters[index]}
                      </Text>
                    )}
                  </View>
                  <Text
                    style={[
                      styles.optionText,
                      isCorrect && { color: "#065f46", fontWeight: "700" },
                      isWrong && { color: "#991b1b", fontWeight: "700" },
                    ]}
                  >
                    {answer.answer}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <View style={{ padding: 20, alignItems: "center" }}>
        {submitLoading && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ActivityIndicator color="#9B2C2C" style={{ marginRight: 10 }} />
            <Text style={{ color: "#666", fontWeight: "600" }}>Đang nộp bài...</Text>
          </View>
        )}
        {!submitLoading && (
          <Text style={{ color: "#94a3b8", fontSize: 13 }}>
            Cố gắng hoàn thành trong thời gian quy định
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PlacementTestScreen;
