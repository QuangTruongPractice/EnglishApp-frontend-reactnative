import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Animated, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ActivityIndicator, Button } from "react-native-paper";
import styles from "../../styles/SessionStyles";

const QuizDetailScreen = ({
  quiz,
  loading,
  error,
  onReload,
  onGoBack,
  onTryAgain,
  // MC / TEXT / AUDIO types
  selectedAnswer,
  handleMcPress,
  // Fill type
  fillValue,
  handleFillPress,
  // Match type
  leftSelected,
  rightSelected,
  matches,
  handleMatchLeft,
  handleMatchRight,
  // Result
  showResult,
  isAnswerCorrect,
  // Audio
  playQuizAudio,
}) => {
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#9B2C2C" />
        <Text style={{ marginTop: 10, color: "#666" }}>Đang tải nội dung...</Text>
      </View>
    );
  }

  if (error || !quiz) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center", padding: 20 }]}>
        <Icon name="alert-circle-outline" size={64} color="#ef4444" />
        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10, textAlign: "center" }}>
          {error || "Không thấy dữ liệu câu hỏi."}
        </Text>
        <TouchableOpacity style={[styles.buttonPrimary, { marginTop: 20, paddingHorizontal: 30 }]} onPress={onReload}>
          <Text style={styles.buttonTextPrimary}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderQuestionText = (text) => {
    if (!text) return null;
    const parts = text.split(/("[^"]+"|'[^']+')/g);
    return (
      <Text style={styles.quizQuestion}>
        {parts.map((part, i) => {
          if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
            const word = part.slice(1, -1);
            return (
              <Text key={i}>
                {part[0]}<Text style={styles.quizQuestionHighlight}>{word}</Text>{part[part.length - 1]}
              </Text>
            );
          }
          return <Text key={i}>{part}</Text>;
        })}
      </Text>
    );
  };

  const renderMC = () => (
    <View style={styles.quizContainer}>
      <View style={styles.quizBadge}>
        <Icon name="bullseye-arrow" size={16} color="#f57f17" />
        <Text style={styles.quizBadgeText}>{quiz.type === 'MC' ? 'TRẮC NGHIỆM' : 'VĂN BẢN'}</Text>
      </View>
      {renderQuestionText(quiz.question)}
      <View style={{ marginTop: 10 }}>
        {quiz.answers.map((answer, index) => {
          const letters = ["A", "B", "C", "D", "E", "F"];
          const isSelected = selectedAnswer === answer.id;
          const isCorrect = showResult && answer.isCorrect;
          const isWrong = showResult && isSelected && !answer.isCorrect;

          return (
            <TouchableOpacity
              key={answer.id}
              style={[
                styles.quizOption,
                isSelected && styles.optionSelected,
                isCorrect && styles.optionCorrect,
                isWrong && styles.optionWrong,
              ]}
              onPress={() => handleMcPress(answer.id)}
              activeOpacity={0.7}
              disabled={showResult}
            >
              <View style={[styles.optionIndex, (isCorrect || isWrong) && { backgroundColor: "transparent" }]}>
                {isCorrect ? (
                  <Icon name="check-circle" size={24} color="#10b981" />
                ) : isWrong ? (
                  <Icon name="close-circle" size={24} color="#ef4444" />
                ) : (
                  <Text style={styles.optionIndexText}>{letters[index]}</Text>
                )}
              </View>
              <Text style={styles.optionText}>{answer.answer}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const renderAudio = () => (
    <View style={styles.quizContainer}>
      <View style={styles.quizBadge}>
        <Icon name="volume-high" size={16} color="#f57f17" />
        <Text style={styles.quizBadgeText}>ÂM THANH</Text>
      </View>
      <Text style={[styles.quizQuestion, { marginBottom: 10 }]}>{quiz.question || "Nghe và chọn đáp án đúng"}</Text>

      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <TouchableOpacity style={styles.audioButtonSolid} onPress={playQuizAudio}>
          <Icon name="volume-high" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={{ marginTop: 10, color: '#666', fontSize: 13, fontWeight: '600' }}>Nhấn để nghe</Text>
      </View>

      <View style={{ marginTop: 10 }}>
        {quiz.answers.map((answer, index) => {
          const letters = ["A", "B", "C", "D", "E", "F"];
          const isSelected = selectedAnswer === answer.id;
          const isCorrect = showResult && answer.isCorrect;
          const isWrong = showResult && isSelected && !answer.isCorrect;

          return (
            <TouchableOpacity
              key={answer.id}
              style={[
                styles.quizOption,
                isSelected && styles.optionSelected,
                isCorrect && styles.optionCorrect,
                isWrong && styles.optionWrong,
              ]}
              onPress={() => handleMcPress(answer.id)}
              activeOpacity={0.7}
              disabled={showResult}
            >
              <View style={[styles.optionIndex, (isCorrect || isWrong) && { backgroundColor: "transparent" }]}>
                {isCorrect ? (
                  <Icon name="check-circle" size={24} color="#10b981" />
                ) : isWrong ? (
                  <Icon name="close-circle" size={24} color="#ef4444" />
                ) : (
                  <Text style={styles.optionIndexText}>{letters[index]}</Text>
                )}
              </View>
              <Text style={styles.optionText}>{answer.answer}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const renderFill = () => {
    const correctAns = quiz.answers.find(a => a.isCorrect);
    const isCorrect = showResult && fillValue === correctAns?.answer;
    const isWrong = showResult && !isCorrect && fillValue !== null;

    const [part1, part2] = (quiz.text || "").split("...");

    return (
      <View style={styles.quizContainer}>
        <View style={styles.quizBadge}>
          <Icon name="pencil" size={16} color="#f57f17" />
          <Text style={styles.quizBadgeText}>ĐIỀN TỪ</Text>
        </View>
        <Text style={styles.quizQuestion}>{quiz.question || "Chọn từ đúng để hoàn thành câu:"}</Text>

        <View style={styles.fillContainer}>
          <Text style={styles.fillText}>
            {part1}
            <Text style={[styles.fillBlank, isCorrect && { color: "#10b981", borderBottomColor: '#10b981' }, isWrong && { color: "#ef4444", borderBottomColor: '#ef4444' }]}>
              {" "}{fillValue || "_______"}{" "}
            </Text>
            {part2}
          </Text>
        </View>

        <View style={styles.wordBank}>
          {quiz.answers.map((answer) => {
            const isUsed = fillValue === answer.answer;
            return (
              <TouchableOpacity
                key={answer.id}
                style={[styles.wordChip, isUsed && styles.wordChipUsed]}
                onPress={() => handleFillPress(answer.answer)}
                disabled={showResult}
              >
                <Text style={styles.wordChipText}>{answer.answer}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderMatch = () => (
    <View style={styles.quizContainer}>
      <View style={styles.quizBadge}>
        <Icon name="link-variant" size={16} color="#f57f17" />
        <Text style={styles.quizBadgeText}>GHÉP ĐÔI</Text>
      </View>
      <Text style={styles.quizQuestion}>{quiz.question || "Ghép các từ với nghĩa tương ứng:"}</Text>

      <View style={styles.matchRow}>
        <View style={styles.matchColumn}>
          <Text style={styles.matchHeader}>TỪ VỰNG</Text>
          {quiz.left_items.map((item) => {
            const isMatched = matches.some(m => m.leftId === item.id);
            const isSelected = leftSelected === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.matchCard,
                  isSelected && styles.matchSelected,
                  isMatched && styles.matchMatched,
                ]}
                onPress={() => handleMatchLeft(item.id)}
                disabled={isMatched || showResult}
              >
                <Text style={styles.matchText}>{item.word}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.matchColumn}>
          <Text style={styles.matchHeader}>Ý NGHĨA</Text>
          {quiz.right_items.map((item) => {
            const isMatched = matches.some(m => m.rightId === item.id);
            const isSelected = rightSelected === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.matchCard,
                  isSelected && styles.matchSelected,
                  isMatched && styles.matchMatched,
                ]}
                onPress={() => handleMatchRight(item.id)}
                disabled={isMatched || showResult}
              >
                <Text style={styles.matchText} numberOfLines={4}>{item.text}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (quiz.type) {
      case "MC":
      case "TEXT":
        return renderMC();
      case "AUDIO":
        return renderAudio();
      case "FILL":
        return renderFill();
      case "MATCH":
        return renderMatch();
      default:
        return renderMC();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#4a0d0d", "#6b1a1a", "#7e2222"]} style={styles.headerBackground}>
        <View style={styles.headerDecorativeCircle} />
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
            <Icon name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: showResult ? "100%" : "50%" }]} />
          </View>
          <Text style={styles.progressText}>Quiz</Text>
        </View>
        <View style={styles.phaseBadge}>
          <Icon name="head-question" size={16} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.phaseBadgeText}>Kiểm tra kiến thức</Text>
        </View>
      </LinearGradient>

      <View style={styles.card}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
          {renderContent()}
        </ScrollView>
      </View>

      <View style={styles.footerContainer}>
        {showResult ? (
          <View>
            <View style={[
              { padding: 16, borderRadius: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
              isAnswerCorrect ? { backgroundColor: '#ecfdf5' } : { backgroundColor: '#fef2f2' }
            ]}>
              <Icon
                name={isAnswerCorrect ? "check-circle" : "close-circle"}
                size={34}
                color={isAnswerCorrect ? "#10b981" : "#ef4444"}
              />
              <View style={{ marginLeft: 12 }}>
                <Text style={{ fontSize: 18, fontWeight: '900', color: isAnswerCorrect ? '#065f46' : '#991b1b' }}>
                  {isAnswerCorrect ? "Tuyệt vời!" : "Chưa chính xác"}
                </Text>
                <Text style={{ fontSize: 14, color: isAnswerCorrect ? '#059669' : '#dc2626' }}>
                  {isAnswerCorrect ? "Bạn đã trả lời đúng câu hỏi này." : "Hãy thử lại để ghi nhớ tốt hơn."}
                </Text>
              </View>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity style={styles.buttonSecondary} onPress={onTryAgain}>
                <Icon name="refresh" size={20} color="#666" style={{ marginRight: 8 }} />
                <Text style={styles.buttonTextSecondary}>Làm lại</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonPrimary} onPress={onGoBack}>
                <Text style={styles.buttonTextPrimary}>Hoàn thành</Text>
                <Icon name="check-all" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.footer}>
            <TouchableOpacity style={[styles.buttonSecondary, { opacity: 0.5 }]} disabled>
              <Text style={styles.buttonTextSecondary}>Đang làm bài...</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default QuizDetailScreen;