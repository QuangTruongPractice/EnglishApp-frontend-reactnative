import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Animated } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../../styles/SessionStyles";

const SessionPhaseQuizzes = ({ quiz, onAnswer, initialAnswerStatus }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  // For MATCH type
  const [leftSelected, setLeftSelected] = useState(null);
  const [rightSelected, setRightSelected] = useState(null);
  const [matches, setMatches] = useState([]); // Array of {leftId, rightId}
  
  // For FILL type
  const [fillValue, setFillValue] = useState(null);

  useEffect(() => {
    setLeftSelected(null);
    setRightSelected(null);
    setMatches([]);
    setFillValue(null);
    
    if (initialAnswerStatus !== null && initialAnswerStatus !== undefined) {
      setSelectedOption(null);
      setIsAnswered(true);
      // We don't have the user's specific past inputs, but setting isAnswered=true 
      // is enough to show the correct answer and lock the quiz.
    } else {
      setSelectedOption(null);
      setIsAnswered(false);
    }
  }, [quiz, initialAnswerStatus]);

  if (!quiz) return null;

  const handleMcPress = (optionId) => {
    if (isAnswered) return;
    const option = quiz.answers.find(a => a.id === optionId);
    setSelectedOption(optionId);
    setIsAnswered(true);
    onAnswer(option.isCorrect);
  };

  const handleFillPress = (word) => {
    if (isAnswered) return;
    setFillValue(word);
    setIsAnswered(true);
    const correctAns = quiz.answers.find(a => a.isCorrect);
    onAnswer(word === correctAns.answer);
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
        setIsAnswered(true);
        onAnswer(true);
      }
    } else {
      // Shaky animation or reset
      setLeftSelected(null);
      setRightSelected(null);
    }
  };

  const renderMC = () => (
    <View style={styles.quizContainer}>
      <Text style={styles.quizQuestion}>{quiz.question}</Text>
      {quiz.answers.map((answer, index) => {
        const letters = ["A", "B", "C", "D"];
        const isSelected = selectedOption === answer.id;
        const isCorrect = isAnswered && answer.isCorrect;
        const isWrong = isAnswered && isSelected && !answer.isCorrect;

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
            disabled={isAnswered}
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
  );

  const renderFill = () => {
    const correctAns = quiz.answers.find(a => a.isCorrect);
    const isCorrect = isAnswered && fillValue === correctAns.answer;
    const isWrong = isAnswered && !isCorrect;

    return (
      <View style={styles.quizContainer}>
        <Text style={styles.quizQuestion}>Chọn từ đúng để hoàn thành định nghĩa:</Text>
        <View style={styles.fillContainer}>
          <Text style={styles.fillText}>
            "{quiz.text.split("...")[0]} 
            <Text style={[styles.fillBlank, isCorrect && { color: "#10b981" }, isWrong && { color: "#ef4444" }]}>
              {fillValue || "_______"}
            </Text>
            {quiz.text.split("...")[1]}"
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
                disabled={isAnswered}
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
      <Text style={styles.quizQuestion}>{quiz.question}</Text>
      <View style={styles.matchRow}>
        <View style={styles.matchColumn}>
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
                disabled={isMatched || isAnswered}
              >
                <Text style={styles.matchText}>{item.text}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.matchColumn}>
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
                disabled={isMatched || isAnswered}
              >
                <Text style={styles.matchText}>{item.text}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.card}>
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        {quiz.type === "MC" && renderMC()}
        {quiz.type === "FILL" && renderFill()}
        {quiz.type === "MATCH" && renderMatch()}
      </ScrollView>
    </View>
  );
};

export default SessionPhaseQuizzes;
