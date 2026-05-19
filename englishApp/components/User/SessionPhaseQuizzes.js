import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../../styles/SessionStyles";

const SessionPhaseQuizzes = ({ quiz, isAnswered, onSelectOption, initialAnswerStatus, onTabChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  
  // For MATCH type
  const [leftSelected, setLeftSelected] = useState(null);
  const [rightSelected, setRightSelected] = useState(null);
  const [matches, setMatches] = useState([]); // Array of {leftId, rightId}
  
  // For FILL type
  const [fillValue, setFillValue] = useState(null);

  const normalizeAnswer = (value) => {
    if (value === null || value === undefined) return "";
    return String(value)
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ");
  };

  const applyAnswerCasing = (text, pattern) => {
    if (!text) return text;
    if (!pattern) return text;
    if (pattern === pattern.toUpperCase()) return text.toUpperCase();
    if (pattern === pattern.toLowerCase()) return text.toLowerCase();
    if (pattern[0] === pattern[0].toUpperCase() && pattern.slice(1) === pattern.slice(1).toLowerCase()) {
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
    return text;
  };

  const getDisplayAnswer = (answer) => {
    const correctAns = quiz.answers.find(a => a.isCorrect);
    return applyAnswerCasing(answer, correctAns?.answer);
  };

  useEffect(() => {
    setLeftSelected(null);
    setRightSelected(null);
    setMatches([]);
    setFillValue(null);
    setSelectedOption(null);
    
    if (initialAnswerStatus === null || initialAnswerStatus === undefined) {
      if (onSelectOption) onSelectOption(null);
    }
  }, [quiz]);

  if (!quiz) return null;

  const handleMcPress = (optionId) => {
    if (isAnswered) return;
    const option = quiz.answers.find(a => a.id === optionId);
    setSelectedOption(optionId);
    if (onSelectOption) onSelectOption(option.isCorrect);
  };

  const handleFillPress = (word) => {
    if (isAnswered) return;
    setFillValue(word);
    const correctAns = quiz.answers.find(a => a.isCorrect);
    const isCorrect = normalizeAnswer(word) === normalizeAnswer(correctAns?.answer);
    if (onSelectOption) onSelectOption(isCorrect);
  };

  const handleMatchLeft = (id) => {
    if (isAnswered || matches.some(m => m.leftId === id)) return;
    setLeftSelected(id);
    if (rightSelected) {
      checkMatch(id, rightSelected);
    }
  };

  const handleMatchRight = (id) => {
    if (isAnswered || matches.some(m => m.rightId === id)) return;
    setRightSelected(id);
    if (leftSelected) {
      checkMatch(leftSelected, id);
    }
  };

  const checkMatch = (leftId, rightId) => {
    const isCorrect = leftId === rightId; // In this backend structure, IDs usually match for pairs
    if (isCorrect) {
      const newMatches = [...matches, { leftId, rightId }];
      setMatches(newMatches);
      setLeftSelected(null);
      setRightSelected(null);
      
      if (newMatches.length === quiz.left_items.length) {
        if (onSelectOption) onSelectOption(true);
      }
    } else {
      // Shaky animation or reset
      setLeftSelected(null);
      setRightSelected(null);
    }
  };

  const renderQuestionWithHighlight = (text) => {
    if (!text) return null;
    const parts = text.split(/("[^"]+"|'[^']+')/g);
    return (
      <Text style={styles.quizQuestion}>
        {parts.map((part, i) => {
          if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
            const word = part.slice(1, -1);
            return (
              <Text key={i}>
                {part[0]}<Text style={styles.quizQuestionHighlight}>{word}</Text>{part[part.length-1]}
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
        <Text style={styles.quizBadgeText}>TRẮC NGHIỆM</Text>
      </View>
      {renderQuestionWithHighlight(quiz.question)}
      {quiz.answers.map((answer, index) => {
        const letters = ["A", "B", "C", "D"];
        const isSelected = selectedOption === answer.id;
        const isCorrect = isAnswered && answer.isCorrect;
        const isWrong = isAnswered && isSelected && !answer.isCorrect;
        const showSelected = isSelected && !isAnswered;

        return (
          <TouchableOpacity
            key={answer.id}
            style={[
              styles.quizOption,
              showSelected && styles.optionSelected,
              isCorrect && styles.optionCorrect,
              isWrong && styles.optionWrong,
            ]}
            onPress={() => handleMcPress(answer.id)}
            activeOpacity={0.7}
            disabled={isAnswered}
          >
            <View style={[
              styles.optionIndex,
              isCorrect && { backgroundColor: "#ecfdf5" },
              isWrong && { backgroundColor: "#fef2f2" },
            ]}>
              {isCorrect ? (
                <Icon name="check" size={18} color="#10b981" />
              ) : isWrong ? (
                <Icon name="close" size={18} color="#ef4444" />
              ) : (
                <Text style={styles.optionIndexText}>{letters[index]}</Text>
              )}
            </View>
            <Text style={styles.optionText}>{answer.answer}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderFill = () => {
    const correctAns = quiz.answers.find(a => a.isCorrect);
    const isCorrect = isAnswered && fillValue === correctAns.answer;
    const isWrong = isAnswered && !isCorrect;

    return (
      <View style={styles.quizContainer}>
        <View style={styles.quizBadge}>
          <Icon name="pencil" size={16} color="#f57f17" />
          <Text style={styles.quizBadgeText}>ĐIỀN VÀO CHỖ TRỐNG</Text>
        </View>
        <Text style={styles.quizQuestion}>Chọn từ đúng để hoàn thành câu:</Text>
        <View style={styles.fillContainer}>
          <Text style={styles.fillText}>
            {"\""}{quiz.text.split("...")[0]} 
            <Text style={[styles.fillBlank, isCorrect && { color: "#10b981" }, isWrong && { color: "#ef4444" }]}>
              {fillValue || "_______"}
            </Text>
            {quiz.text.split("...")[1]}{"\""}
          </Text>
        </View>

        {isAnswered && (
          <View style={styles.correctAnswerBlock}>
            <Text style={styles.correctAnswerLabel}>Đáp án đúng:</Text>
            <Text style={styles.correctAnswerText}>
              {quiz.text.split("...")[0]}
              <Text style={styles.correctAnswerBold}>{quiz.answers.find(a => a.isCorrect)?.answer}</Text>
              {quiz.text.split("...")[1]}
            </Text>
          </View>
        )}

        <View style={styles.wordBank}>
          {quiz.answers.map((answer) => {
            const displayAnswer = getDisplayAnswer(answer.answer);
            const isUsed = fillValue === displayAnswer;
            return (
              <TouchableOpacity
                key={answer.id}
                style={[styles.wordChip, isUsed && styles.wordChipUsed]}
                onPress={() => handleFillPress(displayAnswer)}
                disabled={isAnswered}
              >
                <Text style={styles.wordChipText}>{displayAnswer}</Text>
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
        <Text style={styles.quizBadgeText}>GHÉP ĐÔI (TỪ VỰNG - Ý NGHĨA)</Text>
      </View>
      <Text style={[styles.quizQuestion, { marginBottom: 16 }]}>
        {quiz.question || "Ghép mỗi từ với nghĩa đúng"}
      </Text>

      {/* Headers */}
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 10, paddingHorizontal: 4 }}>
        <Text style={[styles.matchHeader, { flex: 1, marginBottom: 0 }]}>TỪ VỰNG</Text>
        <Text style={[styles.matchHeader, { flex: 1, marginBottom: 0 }]}>Ý NGHĨA</Text>
      </View>

      {/* Render bằng từng hàng ngang để 2 ô tự động co giãn bằng chiều cao của ô chứa chữ dài nhất */}
      <View style={{ flexDirection: 'column' }}>
        {quiz.left_items.map((leftItem, index) => {
          const rightItem = quiz.right_items[index];

          const isLeftMatched = matches.some(m => m.leftId === leftItem.id);
          const isLeftSelected = leftSelected === leftItem.id;

          const isRightMatched = rightItem ? matches.some(m => m.rightId === rightItem.id) : false;
          const isRightSelected = rightItem ? rightSelected === rightItem.id : false;

          return (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'stretch', gap: 12, marginBottom: 12 }}>
              {/* 50% Width */}
              <TouchableOpacity
                style={[
                  styles.matchCard,
                  { flex: 1, paddingVertical: 16, paddingHorizontal: 8 },
                  isLeftSelected && styles.matchSelected,
                  isLeftMatched && styles.matchMatched,
                ]}
                onPress={() => handleMatchLeft(leftItem.id)}
                disabled={isLeftMatched || isAnswered}
              >
                <Text style={styles.matchText}>{leftItem.word}</Text>
              </TouchableOpacity>

              {/* 50% Width */}
              {rightItem ? (
                <TouchableOpacity
                  style={[
                    styles.matchCard,
                    { flex: 1, paddingVertical: 16, paddingHorizontal: 16, alignItems: 'flex-start' },
                    isRightSelected && styles.matchSelected,
                    isRightMatched && styles.matchMatched,
                  ]}
                  onPress={() => handleMatchRight(rightItem.id)}
                  disabled={isRightMatched || isAnswered}
                >
                  <Text 
                    style={[styles.matchText, { textAlign: 'left', fontSize: 12, fontWeight: '500', lineHeight: 20 }]} 
                    numberOfLines={undefined}
                  >
                    {rightItem.text}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={{ flex: 1 }} />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.quizTabBar}>
        <TouchableOpacity 
          style={[styles.quizTab, quiz.type === "MC" && styles.quizTabActive]}
          onPress={() => onTabChange && onTabChange("MC")}
          activeOpacity={0.7}
        >
          <Text style={[styles.quizTabText, quiz.type === "MC" && styles.quizTabTextActive]}>TRẮC NGHIỆM</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.quizTab, quiz.type === "FILL" && styles.quizTabActive]}
          onPress={() => onTabChange && onTabChange("FILL")}
          activeOpacity={0.7}
        >
          <Text style={[styles.quizTabText, quiz.type === "FILL" && styles.quizTabTextActive]}>ĐIỀN TỪ</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.quizTab, quiz.type === "MATCH" && styles.quizTabActive]}
          onPress={() => onTabChange && onTabChange("MATCH")}
          activeOpacity={0.7}
        >
          <Text style={[styles.quizTabText, quiz.type === "MATCH" && styles.quizTabTextActive]}>GHÉP ĐÔI</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {quiz.type === "MC" && renderMC()}
        {quiz.type === "FILL" && renderFill()}
        {quiz.type === "MATCH" && renderMatch()}
        </ScrollView>
      </View>
    </View>
  );
};

export default SessionPhaseQuizzes;
